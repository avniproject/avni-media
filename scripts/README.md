### Lambda functions deployment steps

#### Prerequisite.

- AWS CLI should be installed on the user's machine.

There ~~are two~~ is a lambda function inside the scripts directory.

1. S3ThumbnailCreator

#### 1. S3ThumbnailCreator

This lambda function generates the thumbnail instantly when an image is uploaded to the S3 bucket.

The lambda functions will be deployed in a single go. Run the following command:

```
   ./deploy-lambda-functions.sh bucket-name
```
