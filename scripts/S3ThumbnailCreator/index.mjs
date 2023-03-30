import AWS from 'aws-sdk';
import sharp from 'sharp';

const s3 = new AWS.S3();

export const handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
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
    
    const thumbnailKey = `${decodeURIComponent(organisationName.replace(/\+/g, " "))}/thumbnails/${decodeURIComponent(fileName.replace(/\+/g, " "))}`;

    if (!thumbnailKey.includes(key)) {
      console.info('Thumbnail creation process with input param->', inputParams)
      const { Body } = await s3.getObject(inputParams).promise();
      console.log('Ready to create thumbnail...')
      const thumbnail = await sharp(Body).resize(200, 200).toBuffer();
      console.log('Thumbnail created...')

      const thumbnailParams = {
          Bucket: bucket,
          Key: thumbnailKey,
          Body: thumbnail,
          ContentType: 'image/jpeg',
        };
        console.log('Uploading the thumbnail with params --', thumbnailParams)
        await s3.putObject(thumbnailParams).promise();
        console.log(`Thumbnail created: ${thumbnailKey}`);
    }
  } catch (error) {
    console.error(error);
  }

  context.callbackWaitsForEmptyEventLoop = false;
};
