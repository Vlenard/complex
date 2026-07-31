"use server";

import { connectDB } from "../lib/db";
import { Beer } from "../models/Beer";
import Auth from "../lib/Auth";
import { saveBeerImage } from "../lib/SaveBeerImage";

export type UpdateBeerState = {
  error?: string;
  success?: boolean;
};

export default async function UpdateBeerAction(
  id: string,
  _: UpdateBeerState,
  formData: FormData,
): Promise<UpdateBeerState> {
  await connectDB();

  const user = await Auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const updateData: Record<string, unknown> = {
      name: formData.get("name"),
      type: formData.get("type"),
      alcohol: formData.get("alcohol"),
      rate: formData.get("rate"),
      note: formData.get("note"),
    };

    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      updateData.url = await saveBeerImage(image);
    }

    const updatedBeer = await Beer.findOneAndUpdate(
      { _id: id, owner: user.id },
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedBeer) {
      return { error: "Beer not found or unauthorized" };
    }

    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Something went wrong" };
  }
}
