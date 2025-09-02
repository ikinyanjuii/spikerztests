import express from "express";
import { testQueue } from "./queue";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Playwright Test API with Queue is running");
});

// Enqueue a job
app.post("/run-tests", async (req, res) => {
  const { grep, file } = req.body;
  const job = await testQueue.add("run", { grep, file });
  res.json({ jobId: job.id, status: "queued" });
});

// Check job status
import { Job } from "bullmq";
import { QueueEvents } from "bullmq";
import { testQueue as queue } from "./queue";

app.get("/status/:id", async (req, res) => {
  const job = await queue.getJob(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });

  const state = await job.getState();
  const result = job.returnvalue || null;

  res.json({ id: job.id, state, result });
});

app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
});
