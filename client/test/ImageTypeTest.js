import {getDownloadFileName} from '../model/ImageType';

test('getDownloadFileName', () => {
  let url = "https://s3.ap-south-1.amazonaws.com/prerelease-user-media/rwbnitiuat/9b224c26-3ad7-4746-9c14-3121ddd6b582.heic";
  const result = getDownloadFileName("JHJ     _Work Order   _Pipaliya", url);
  expect(result).toBe("JHJ     _Work Order   _Pipaliya.heic");
});