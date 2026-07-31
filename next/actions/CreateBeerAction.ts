"use server";

import { connectDB } from "../lib/db";
import { Beer, type IBeer } from "../models/Beer";
import { User } from "../models/User";
import Auth from "../lib/Auth";
import { saveBeerImage } from "../lib/SaveBeerImage";

export type CreateBeerState = {
  error?: string;
  success?: boolean;
  id?: string;
};

export default async function CreateBeerAction(
  _: CreateBeerState,
  formData: FormData,
): Promise<CreateBeerState> {
  await connectDB();

  const user = await Auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const image = formData.get("image") as File | null;
  if (!image || image.size === 0) {
    return { error: "Image is required!" };
  }

  try {
    const url = await saveBeerImage(image);

    const newBeer = await Beer.create({
      name: formData.get("name") as string,
      type: formData.get("type") as IBeer["type"],
      alcohol: Number(formData.get("alcohol")),
      rate: Number(formData.get("rate")),
      note: formData.get("note") as string,
      url,
      owner: user.id,
    });

    await User.findByIdAndUpdate(user.id, {
      $push: { beers: newBeer._id },
    });

    return { success: true, id: newBeer.id };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Something went wrong" };
  }
}
