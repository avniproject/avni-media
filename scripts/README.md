### Lambda functions deployment steps

#### Prerequisite.

- AWS CLI should be installed on the user's machine.

There are two lambda functions inside the scripts directory.

1. S3ThumbnailCreator
2. ~~S3BulkThumbnailCreator~~ (Un-used)

#### 1. S3ThumbnailCreator

This lambda function generates the thumbnail instantly when an image is uploaded to the S3 bucket.

#### 2. ~~S3BulkThumbnailCreator~~(Un-used)

~~This lambda function creates thumbnails of existing images . When deployed this function runs on nightly to create thumbnails~~

Both the lambda functions will be deployed in a single go. Run the following command:

```
   ./deploy-lambda-functions.sh bucket-name
```
