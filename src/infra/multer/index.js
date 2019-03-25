const multer = require('multer')
const uniqid = require('uniqid')
const path = require('path')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

module.exports = ({ config }) => {
  let storage
  if (config.env !== 'development') {
    // production, staging configuration
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'eu-west-3'
    })
    const s3 = new aws.S3()
    storage = multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME || 'moresneakers-images',
      acl: 'bucket-owner-full-control',
      metadata: function (req, file, cb) {
        cb(null, {
          fieldName: file.fieldname
        })
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
      },
      contentType: multerS3.AUTO_CONTENT_TYPE
    })
  } else {
    // development configuration
    storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/' + (config.uploadImagePath || 'upload/images'))
      },
      filename: function (req, file, cb) {
        cb(null, uniqid('img') + path.extname(file.originalname))
      }
    })
  }

  const upload = multer({ storage: storage })
  return {
    image: upload.single('image'),
    file: upload.single('file')
  }
}
