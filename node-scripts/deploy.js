'use strict';

const path = require('path');
const fs = require('fs').promises;
const S3 = require('aws-sdk/clients/s3');
const glob = require('glob');

const DIST_DIR = 'dist';
const S3_API_VERSION = '2006-03-01';
const BUCKET_NAME = 'generativemusic.alexbainter.com';

const globPromise = (pattern, opts) =>
  new Promise((resolve, reject) => {
    glob(pattern, opts, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

const s3 = new S3({
  apiVersion: S3_API_VERSION,
  params: { Bucket: BUCKET_NAME },
});

const listRootObjs = () =>
  s3
    .listObjectsV2({
      Delimiter: '/',
    })
    .promise();

const deleteObjs = objs =>
  s3
    .deleteObjects({
      Delete: {
        Objects: objs,
      },
    })
    .promise();

const getContentType = (filename = '') => {
  const upperCaseFilename = filename.toUpperCase();
  if (upperCaseFilename.endsWith('.CSS')) {
    return 'text/css';
  } else if (upperCaseFilename.endsWith('.HTML')) {
    return 'text/html';
  } else if (upperCaseFilename.endsWith('.JS')) {
    return 'application/javascript';
  }
  return '';
};

const uploadDistItems = () =>
  globPromise(`${DIST_DIR}/!(*.map)`)
    .then(filenames => {
      if (filenames.length === 0) {
        console.log(`No files found in "${DIST_DIR}!"`);
        return process.exit(0);
      }
      return Promise.all(
        filenames.map(filename => fs.readFile(path.resolve(filename)))
      ).then(buffers =>
        buffers.map((buffer, i) => ({
          key: path.basename(filenames[i]),
          buffer,
        }))
      );
    })
    .then(uploadItems =>
      Promise.all(
        uploadItems.map(({ key, buffer }) =>
          s3
            .upload({
              Key: key,
              Body: buffer,
              ACL: 'public-read',
              ContentType: getContentType(key),
            })
            .promise()
            .then(() => {
              console.log(`${key} upload complete.`);
            })
        )
      )
    );

listRootObjs()
  .then(({ Contents }) => {
    console.log(`Removing files from ${BUCKET_NAME}`);
    return deleteObjs(Contents.map(({ Key }) => ({ Key })));
  })
  .then(() => {
    console.log('Uploading files...');
    return uploadDistItems();
  })
  .catch(err => console.log(err));
