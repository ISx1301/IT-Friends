import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ulciq70j",
  dataset: "production",
  apiVersion: "2023-01-01", 
  useCdn: false,
});
