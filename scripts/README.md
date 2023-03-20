### Lambda functions deployment steps

There are two lambda functions inside the scripts directory.

1. S3ThumnailCreateor
2. S3BulkThumnailCreateor

#### 1. S3ThumnailCreateor

This lambda function generates the thumbnail instantly when an image is uploaded to the S3 bucket.

#### create-thumbnails

This lambda function creates thumbnails of existing images . When deployed this function runs on nightly to create thumbnails

Both the lambda functions will be deployed in a single go. Run the following command:

```
   ./deploy-lambda-functions.sh bucket-name
```
