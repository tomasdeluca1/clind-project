import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  file: Buffer,
  fileName: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: "clind-site",
    Key: `testimonials/${fileName}`,
    Body: file,
    ContentType: "image/jpeg",
  });

  await s3Client.send(command);

  return `https://clind-site.s3.us-east-2.amazonaws.com/testimonials/${fileName}`;
}
