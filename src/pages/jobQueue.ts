type Job = () => Promise<void>;

class JobQueue {
  private queue: Job[] = [];
  private running = false;

  add(job: Job) {
    this.queue.push(job);
    this.runNext();
  }

  private async runNext() {
    if (this.running || this.queue.length === 0) return;

    this.running = true;
    const job = this.queue.shift()!;
    try {
      await job();
    } catch (err) {
      console.error('Job failed:', err);
    } finally {
      this.running = false;
      this.runNext();
    }
  }
}

export const jobQueue = new JobQueue();
