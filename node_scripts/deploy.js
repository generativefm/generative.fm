'use strict';

const path = require('path');
const fs = require('fs').promises;
const S3 = require('aws-sdk/clients/s3');
const glob = require('glob');
const { gzip } = require('node-gzip');
const { lookup } = require('mime-types');

const DIST_DIR = 'dist';
const S3_API_VERSION = '2006-03-01';
const BUCKET_NAME = 'generativemusic.alexbainter.com';

const NON_DIST_FILENAMES = ['favicon.ico'];

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

const listRootObjs = () => s3.listObjectsV2().promise();

const deleteObjs = objs =>
  Array.isArray(objs) && objs.length > 1
    ? s3
        .deleteObjects({
          Delete: {
            Objects: objs,
          },
        })
        .promise()
    : Promise.resolve();

const getContentType = (filename = '') => {
  const contentType = lookup(filename);
  if (contentType) {
    return contentType;
  }
  return '';
};

const uploadDistItems = () =>
  Promise.all(
    [`${DIST_DIR}/!(*.map)`, 'samples/**/*.+(ogg|mp3)'].map(pattern =>
      globPromise(pattern)
    )
  )
    .then(([distFiles, sampleFiles]) => distFiles.concat(sampleFiles))
    .then(filenames => {
      if (filenames.length === 0) {
        console.log(`No files found in "${DIST_DIR}!"`);
        return process.exit(0);
      }
      const allFilenames = filenames.concat(NON_DIST_FILENAMES);
      let completed = 0;
      return Promise.all(
        allFilenames.map(filename =>
          fs
            .readFile(path.resolve(filename))
            .then(file => gzip(file))
            .then(buffer => {
              const uploadParams = {
                Key: filename.includes(DIST_DIR)
                  ? path.basename(filename)
                  : filename,
                Body: buffer,
                ACL: 'public-read',
                ContentType: getContentType(filename),
                ContentEncoding: 'gzip',
              };
              if (!filename.endsWith('.html')) {
                uploadParams.CacheControl = 'max-age=31536000';
              }
              s3.upload(uploadParams)
                .promise()
                .then(() => {
                  completed += 1;
                  console.log(
                    `${filename} upload complete (${completed}/${
                      allFilenames.length
                    })`
                  );
                });
            })
        )
      );
    });

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
