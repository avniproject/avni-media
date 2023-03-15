import AWS from 'aws-sdk';
import sharp from 'sharp';

const s3 = new AWS.S3();

export const handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;

  // Check if the object is a JPEG or PNG image
  if (!key.match(/\.(jpe?g|png)$/i)) {
    console.log('Object is not a JPEG or PNG image');
    return;
  }

  try {
    // Get the object from S3
    const inputParams = {
        Bucket: bucket,
        Key: key,
      };
    const { Body } = await s3.getObject(inputParams).promise();

    // Create thumbnail buffer
    const thumbnail = await sharp(Body).resize(200, 200).toBuffer();

    // Save thumbnail to S3 in the same directory as the original image
    const thumbnailKey = `thumb-${key}`
    if (!key.includes('thumb-')) {
        const thumbnailParams = {
            Bucket: bucket,
            Key: thumbnailKey,
            Body: thumbnail,
            ContentType: 'image/jpeg',
          };
          await s3.putObject(thumbnailParams).promise();
          console.log(`Thumbnail created: ${thumbnailKey}`);
    }
  } catch (error) {
    console.error(error);
  }

  // Stop the Lambda function from running in a loop
  context.callbackWaitsForEmptyEventLoop = false;
};
