import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Use dummy cache to avoid DynamoDB dependencies
  incrementalCache: "dummy",
  tagCache: "dummy",
  queue: "dummy",
});
