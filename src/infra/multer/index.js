const multer = require('multer')
const uniqid = require('uniqid')
const path = require('path')

module.exports = ({ config }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/' + (config.uploadImagePath || 'upload/images'))
    },
    filename: function (req, file, cb) {
      cb(null, uniqid('img') + path.extname(file.originalname))
    }
  })
  const upload = multer({ storage: storage })
  return {
    image: upload.single('image')
  }
}
