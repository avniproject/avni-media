#!/bin/bash

set -e

export AWS_PAGER=""

if ! command -v aws &> /dev/null 
then
  echo "AWS CLI is not installed. Please install it before running this script."
  exit 1
fi

if [ -z "$1" ]; then
  ENV="staging"
else
  ENV=$1
fi

echo "Deploying thumbnail lambdas for ${ENV}"

BUCKET_NAME="${ENV}-user-media"
CODE_DEPLOY_BUCKET_NAME="avni-lambdas"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AVNI_MEDIA_AWS_REGION="ap-south-1"
ROLE_NAME="${ENV}-thumbnail-lambda-execution-role"
ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

FUNCTION_NAME="${ENV}-generate-thumbnails-instantly"
FUNCTION_NAME_BULK="${ENV}-generate-thumbnails-bulk"
FUNCTION_ARN="arn:aws:lambda:${AVNI_MEDIA_AWS_REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME}"
HANDLER="index.handler"
MEMORY_SIZE="1024"
TIMEOUT="20"
TIMEOUT_BULK="300"
STATEMENT_ID="${ENV}-lambda-for-thumbnails"

S3_KEY="${ENV}-generate-thumbnails.zip"
S3_KEY_BULK="${ENV}-generate-thumbnails-bulk.zip"

role_status=""

echo "Packaging the function code"
npm install || { echo "npm install failed"; exit 1; }
npm run install-sharp || { echo "npm run install-sharp failed"; exit 1; }

rm -f "${FUNCTION_NAME}.zip"
rm -f "${FUNCTION_NAME_BULK}.zip"

zip -r "${FUNCTION_NAME}.zip" ./S3ThumbnailCreator/index.mjs -j 'S3ThumbnailCreator/*' || { echo "Failed to zip the function code for ${FUNCTION_NAME}"; exit 1; }
zip -r "${FUNCTION_NAME}.zip" node_modules/ || { echo "Failed to zip the node_modules for ${FUNCTION_NAME}"; exit 1; }

zip -r "${FUNCTION_NAME_BULK}.zip" ./S3BulkThumbnailCreator/index.mjs -j 'S3BulkThumbnailCreator/*' || { echo "Failed to zip the function code for ${FUNCTION_NAME_BULK}"; exit 1; }
zip -r "${FUNCTION_NAME_BULK}.zip" node_modules/ || { echo "Failed to zip the nod_modules for ${FUNCTION_NAME_BULK}"; exit 1; }

echo "Uploading the function code to S3"
aws s3 cp "${FUNCTION_NAME}.zip" "s3://${CODE_DEPLOY_BUCKET_NAME}/${S3_KEY}" || { echo "Failed to upload the function code to S3"; exit 1; }
aws s3 cp "${FUNCTION_NAME_BULK}.zip" "s3://${CODE_DEPLOY_BUCKET_NAME}/${S3_KEY_BULK}" || { echo "Failed to upload the bulk function code to S3"; exit 1; }

echo "Creating an IAM role for your Lambda function"
if aws iam get-role --role-name "${ROLE_NAME}" >/dev/null 2>&1; then
  echo "Role already exists: ${ROLE_NAME}"
else
  aws iam create-role \
    --role-name "${ROLE_NAME}" \
    --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Sid": "","Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}' || { echo "Failed to create an IAM role for the Lambda function"; exit 1; }
  sleep 15
  echo "Role creation process complete, proceeding with next step"
fi

BUCKET_ACCESS_POLICY_NAME="${ENV}-thumbnail-lambda-s3-access"
BUCKET_ACCESS_POLICY_DOCUMENT=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllObjectActions",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": ["arn:aws:s3:::${BUCKET_NAME}/*"]
        }
    ]
}
EOF

)

if aws iam get-policy --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${BUCKET_ACCESS_POLICY_NAME}" >/dev/null 2>&1; then
  echo "Policy ${BUCKET_ACCESS_POLICY_NAME} already exists."
else
  echo "Creating Policy ${BUCKET_ACCESS_POLICY_NAME}"
  aws iam create-policy --policy-name ${BUCKET_ACCESS_POLICY_NAME} --policy-document "${BUCKET_ACCESS_POLICY_DOCUMENT}"
fi

echo "Attaching a policy to the role that allows access to S3"
aws iam attach-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-arn "arn:aws:iam::${ACCOUNT_ID}:policy/${BUCKET_ACCESS_POLICY_NAME}" || { echo "Failed to attach a policy to the IAM role"; exit 1; }

aws iam attach-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole" || { echo "Failed to attach the AWSLambdaBasicExecutionRole policy to the IAM role"; exit 1; }

aws iam attach-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaRole" || { echo "Failed to attach the AWSLambdaRole policy to the IAM role"; exit 1; }

echo "Creating / updating the Lambda function..."
if aws lambda get-function --function-name "${FUNCTION_NAME}" >/dev/null 2>&1; then
  echo "Function ${FUNCTION_NAME} already exists."
elif ! aws lambda create-function \
  --function-name "${FUNCTION_NAME}" \
  --runtime nodejs18.x \
  --handler "${HANDLER}" \
  --memory-size "${MEMORY_SIZE}" \
  --timeout "${TIMEOUT}" \
  --role "${ROLE_ARN}" \
  --code "S3Bucket=${CODE_DEPLOY_BUCKET_NAME},S3Key=${S3_KEY}"; then
  echo "Error creating Lambda function  for instant thumbnail creation."
  exit 1
fi

echo "Updating the function code..."
if ! aws lambda update-function-code \
  --function-name "${FUNCTION_NAME}" \
  --s3-bucket "${CODE_DEPLOY_BUCKET_NAME}" \
  --s3-key "${S3_KEY}"; then
  echo "Error updating the function code for instant thumbnail creation."
  exit 1
fi

if aws lambda get-function --function-name "${FUNCTION_NAME_BULK}" >/dev/null 2>&1; then
  echo "Function ${FUNCTION_NAME_BULK} already exists."
elif ! aws lambda create-function \
  --function-name "${FUNCTION_NAME_BULK}" \
  --runtime nodejs18.x \
  --handler "${HANDLER}" \
  --memory-size "${MEMORY_SIZE}" \
  --timeout "${TIMEOUT_BULK}" \
  --role "${ROLE_ARN}" \
  --environment Variables="{BUCKET_NAME=${BUCKET_NAME}}" \
  --code "S3Bucket=${CODE_DEPLOY_BUCKET_NAME},S3Key=${S3_KEY_BULK}"; then
  echo "Error creating the Lambda function for bulk thumbnail creation."
  exit 1
fi

echo "Updating the function code..."
if ! aws lambda update-function-code \
  --function-name "${FUNCTION_NAME_BULK}" \
  --s3-bucket "${CODE_DEPLOY_BUCKET_NAME}" \
  --s3-key "${S3_KEY_BULK}"; then
  echo "Error updating the function code for bulk thumbnail creation."
  exit 1
fi

###### Disabling scheduled run of bulk lambda for now
#echo "Creating the rule..."
#if ! aws events put-rule \
#  --name "daily-thumbnails" \
#  --description "Triggers the ${FUNCTION_NAME_BULK} function once a day" \
#  --schedule-expression "cron(0 18 * * ? *)" \
#  --state "ENABLED"; then
#  echo "Error creating the rule."
#  exit 1
#fi
#
#echo "Adding a target to the rule..."
#if ! aws events put-targets \
#  --rule "daily-thumbnails" \
#  --targets "Id"="1","Arn"="arn:aws:lambda:${AVNI_MEDIA_AWS_REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME_BULK}"; then
#  echo "Error adding a target to the rule."
#  exit 1
#fi

EXISTING_PERMISSION=$(aws lambda get-policy --function-name $FUNCTION_NAME --output text --query 'Policy' 2>/dev/null | grep -q $STATEMENT_ID && echo "yes" || echo "no")

if [[ $EXISTING_PERMISSION == "yes" ]]; then
  echo "Permission already exists, skipping..."
elif ! aws lambda add-permission \
  --function-name "${FUNCTION_NAME}" \
  --statement-id "${STATEMENT_ID}" \
  --action "lambda:InvokeFunction" \
  --principal s3.amazonaws.com \
  --source-arn "arn:aws:s3:::${BUCKET_NAME}" \
  --source-account "${ACCOUNT_ID}" \
  --region "${AVNI_MEDIA_AWS_REGION}" >/dev/null 2>&1; then
  echo "Error: Failed to add permission to Lambda function ${FUNCTION_NAME} for bucket ${BUCKET_NAME}. Please check your AWS credentials and try again."
  exit 1
else
  echo "Permission successfully added to Lambda function ${FUNCTION_NAME}."
fi

NOTIFICATION_CONFIG=$(cat <<EOF
{
    "LambdaFunctionConfigurations": [
      {
        "LambdaFunctionArn": "arn:aws:lambda:${AVNI_MEDIA_AWS_REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME}",
        "Events": [
            "s3:ObjectCreated:*"
        ]
      }
    ]
}
EOF

)

if ! aws s3api put-bucket-notification-configuration \
--bucket $BUCKET_NAME \
--notification-configuration "$NOTIFICATION_CONFIG" >/dev/null 2>&1; then
  echo "Error: Failed to configure bucket notifications for ${BUCKET_NAME}. Please check your AWS credentials and try again."
  exit 1
else
  echo "Bucket notifications successfully configured for ${BUCKET_NAME}."
fi
