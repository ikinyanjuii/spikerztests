import express from 'express';
import { runAutomation } from './automation';
import { jobQueue } from './jobQueue';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Simple trigger
app.post('/run-automation', async (req, res) => {
  const { testName } = req.body;

  // Push job into queue
  jobQueue.add(async () => {
    await runAutomation(testName);
  });

  res.json({ message: 'Automation triggered', test: testName });
});

app.listen(port, () => {
  console.log(`🚀 Automation API running on http://localhost:${port}`);
});
