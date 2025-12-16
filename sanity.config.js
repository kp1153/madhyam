"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schemaTypes/index";

export default defineConfig({
  projectId: "whorua5k",
  dataset: "production",
  apiVersion: "2023-05-03",
  basePath: "/studio",

  schema: schema,

  plugins: [structureTool()],
});
