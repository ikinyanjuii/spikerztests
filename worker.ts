import { Worker } from "bullmq";
import { exec } from "child_process";
import util from "util";

const asyncExec = util.promisify(exec);
const connection = { host: "redis", port: 6379 };

export const worker = new Worker(
  "playwright-tests",
  async (job) => {
    console.log(`🚀 Running job ${job.id} with data:`, job.data);

    const { grep, file } = job.data;
    let cmd = "npx playwright test --reporter=json";
    if (grep) cmd += ` --grep "${grep}"`;
    if (file) cmd += ` ${file}`;

    const { stdout, stderr } = await asyncExec(cmd);

    if (stderr) {
      throw new Error(stderr);
    }

    try {
      return JSON.parse(stdout); // return structured test results
    } catch {
      return { output: stdout };
    }
  },
  { connection }
);

worker.on("completed", (job, result) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err.message}`);
});
