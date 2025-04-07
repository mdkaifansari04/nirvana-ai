import { PORT } from './config/env';

import express, { type Request, type Response } from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
   res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
   });
});

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});
