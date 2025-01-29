import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { uploadToS3 } from "@/utils/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;

      const db = client.db(process.env.MONGODB_DATABASE);
      const testimonials = await db
        .collection("testimonials")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      // Transform _id to id for frontend consumption
      const transformedTestimonials = testimonials.map((testimonial) => ({
        id: testimonial._id.toString(),
        quote: testimonial.quote,
        handle: testimonial.handle,
        avatar: testimonial.avatar,
        createdAt: testimonial.createdAt,
        updatedAt: testimonial.updatedAt,
      }));

      return res.status(200).json(transformedTestimonials);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      return res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  }

  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DATABASE);

      // Handle multipart form data
      const { quote, handle } = req.body;
      const avatarFile = req.body.avatar;

      if (!quote || !handle || !avatarFile) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Upload image to S3
      const buffer = Buffer.from(avatarFile, "base64");
      const fileName = `${Date.now()}-${avatarFile.name}`;
      const avatarUrl = await uploadToS3(buffer, fileName);

      // Create testimonial in database
      const testimonial = await db.collection("testimonials").insertOne({
        quote,
        handle,
        avatar: avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({
        id: testimonial.insertedId.toString(),
        quote,
        handle,
        avatar: avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Failed to create testimonial:", error);
      return res.status(500).json({ error: "Failed to create testimonial" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DATABASE);
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Missing testimonial ID" });
      }

      const result = await db
        .collection("testimonials")
        .deleteOne({ _id: new ObjectId(id as string) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      return res.status(500).json({ error: "Failed to delete testimonial" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
