import AWS from 'aws-sdk';
import sharp from 'sharp';

const s3 = new AWS.S3();

export const handler = async (event, context) => {
  const bucketName = process.env.BUCKET_NAME;

  try {
    const batchSize = 100;
    let continuationToken = null;

    do {
      const response = await s3.listObjectsV2({
        Bucket: bucketName,
        ContinuationToken: continuationToken,
        MaxKeys: batchSize
      }).promise();

      const objects = response.Contents;
      for (const object of objects) {
        if (object.Key.match(/\.(jpe?g|png)$/i)) {
          let thumbnailKey;
          try {
            const [organisationName, fileName] = object.Key.split('/');
            const s3Object = await s3.getObject({ Bucket: bucketName, Key: decodeURIComponent(object.Key.replace(/\+/g, " ")) }).promise();

            thumbnailKey = `${decodeURIComponent(organisationName.replace(/\+/g, " "))}/thumbnails/${decodeURIComponent(fileName.replace(/\+/g, " "))}`;

            if (!fileName.includes('thumbnails')) {
                const thumbnail = await sharp(s3Object.Body).resize(200, 200).toBuffer();
                const thumbnailParams = {
                    Bucket: bucketName,
                    Key: thumbnailKey,
                    Body: thumbnail,
                    ContentType: 'image/jpeg',
                  };
                  await s3.putObject(thumbnailParams).promise();
                  console.log(`Thumbnail created: ${thumbnailKey}`);
            }
          } catch (err) {
            console.error(`Thumbnail error: ${thumbnailKey} ${err}`);
          }
        }
      }
      continuationToken = response.NextContinuationToken;
    } while (continuationToken);
  } catch (err) {
    console.log(err);
  }
};
