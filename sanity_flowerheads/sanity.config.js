// changed to v3
import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk'
import schemas from './schemas/schema'

export default defineConfig({
  title: "flowerheads",
  projectId: '4db8s61y',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemas
  },
});