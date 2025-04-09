import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/voice');
   },
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
   },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
   const allowedMime = 'audio/wav';
   const ext = path.extname(file.originalname).toLowerCase();
   const allowedExts = ['.wav'];
   if (file.mimetype === allowedMime || allowedExts.includes(ext)) {
      cb(null, true);
   } else {
      cb(new Error('Only .wav audio files are allowed'));
   }
};

const upload = multer({
   storage,
   fileFilter,
   limits: {
      fileSize: 40 * 1024 * 1024, // 40 MB limit
   },
});

export default upload;
