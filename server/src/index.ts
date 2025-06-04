import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { parseResume } from './parser';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (_req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    console.log(Boolean(req.file));

    // parse the uploaded PDF file
    if (req.file) {
      await parseResume(req.file.buffer);
    } else {
      throw new Error('No file uploaded');
    }

    res.status(200).json({ message: 'File uploaded and processed successfully' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
