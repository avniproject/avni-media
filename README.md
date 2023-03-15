### Steps for deployment on lambda

There are two lambda functions.

1. create-thumbnails
2. create-thumnail

#### create-thumbnails

Use this lambda function to create thumbnail of existing images.

#### create-thumbnails

Use this lambda function to create thumbnail when an image is uploaded to the S3 bucket.

The steps to deployment to the lambda function is same for both

1. Goto the desired lambda function directory `create-thumbnails` or `create-thumbnal`
2. Run `npm install`
3. Run `npm run install-sharp`
4. Zip the `node_modules` directory and `index.mjs` file.
   ```
   zip -r9 lambda_function.zip index.mjs node_modules/
   ```
5. Upload the zip file to the lambda.
   https://aws.amazon.com/premiumsupport/knowledge-center/lambda-deployment-package-nodejs/
