import multer from 'multer';

const storage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const folderName = req.folderName ?? file.fieldname;
      cb(null, `public/uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ['image/jpeg', 'image/png']; // Specify the allowed image file types

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.')); // Reject the file
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // Set the maximum file size (2MB in this example)
  },
});

export default storage;
