import AWS from 'aws-sdk';
import sharp from 'sharp';

const s3 = new AWS.S3();

export const handler = async (event, context) => {
  const bucketName = process.env.BUCKET_NAME;

  try {
    const objects = await s3.listObjectsV2({ Bucket: bucketName }).promise();

    for (const object of objects.Contents) {
      if (object.Key.match(/\.(jpe?g|png)$/i)) { 
        const [organisationName, fileName] = object.Key.split('/');
        const s3Object = await s3.getObject({ Bucket: bucketName, Key: object.Key }).promise();
        const thumbnail = await sharp(s3Object.Body).resize(200, 200).toBuffer();

        const thumbnailKey = `${organisationName}/thumbnails/${fileName}`;

        if (!thumbnailKey.includes(object.Key)) {  
            const thumbnailParams = {
                Bucket: bucketName,
                Key: thumbnailKey,
                Body: thumbnail,
                ContentType: 'image/jpeg',
              };
              await s3.putObject(thumbnailParams).promise();
              console.log(`Thumbnail created: ${thumbnailKey}`);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
