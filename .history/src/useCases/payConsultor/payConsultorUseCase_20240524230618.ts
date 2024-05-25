import { client } from "../../prisma/client";
import { BaseError, HttpStatusCode } from "../../providers/errorProvider";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

interface IRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  expertise?: string;
  photo?: Buffer | null;
}

export class UpdateUserUseCase {
  private readonly s3Client = new S3Client({
    region: "af-south-1",
    credentials: {
      accessKeyId: "AKIA3ZHY2GHZB2GNWOHZ",
      secretAccessKey: "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",
    },
  });
  async execute({ id, firstName, lastName, bio, expertise, photo }: IRequest) {
    // Find the user by ID
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });

    // Check if the user exists
    if (!user) {
      throw new BaseError(
        "NOT FOUND",
        HttpStatusCode.NOT_FOUND,
        false,
        "User not found"
      );
    }

    let photoUrl = user.photo;

    // Check if a new photo is provided and upload it
    if (photo) {
      const filename = `${id}/${firstName.replace(/ /g, "+")}.jpg`;
      await this.upload(filename, photo); // Assuming photo is base64 encoded
      photoUrl = `https://classmate-userdocuments-mz.s3.af-south-1.amazonaws.com/${filename}`;
    }

    // Update the user's details
    const updatedUser = await client.user.update({
      where: {
        id,
      },
      data: {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        bio: bio || user.bio,
        expertise: expertise || user.expertise,
        photo: photoUrl,
      },
    });
    return updatedUser;
  }
  async upload(filename: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: "classmate-userdocuments-mz",
        Key: filename,
        Body: file,
        ACL: "public-read",
        ContentType: "image/jpeg",
      })
    );
  }
}
