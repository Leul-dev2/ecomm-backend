import express from 'express';
import upload from '../middlewares/cloudinaryUploader.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Image upload failed' });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

export default router;
