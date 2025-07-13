import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  inmuebleImage: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .onUploadComplete(async ({ file, metadata }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 