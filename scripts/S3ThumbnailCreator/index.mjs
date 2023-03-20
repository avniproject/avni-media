import AWS from 'aws-sdk';
import sharp from 'sharp';

const s3 = new AWS.S3();

export const handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const [organisationName, fileName] = key.split('/');

  if (!key.match(/\.(jpe?g|png)$/i)) {
    console.log('Object is not a JPEG or PNG image');
    return;
  }

  try {
    const inputParams = {
        Bucket: bucket,
        Key: key,
      };
    
    const thumbnailKey = `${organisationName}/thumbnails/${fileName}`;

    if (!thumbnailKey.includes(key)) {
      console.log('Inside the thumbnail creation process....')
      const { Body } = await s3.getObject(inputParams).promise();
      const thumbnail = await sharp(Body).resize(200, 200).toBuffer();

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

  context.callbackWaitsForEmptyEventLoop = false;
};
