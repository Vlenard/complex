"use server";

import { connectDB } from "../lib/db";
import { Beer } from "../models/Beer";
import { User } from "../models/User";
import Auth from "../lib/Auth";

export type DeleteBeerState = {
  error?: string;
  success?: boolean;
};

export default async function DeleteBeerAction(id: string): Promise<DeleteBeerState> {
  await connectDB();

  const user = await Auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const deletedBeer = await Beer.findOneAndDelete({
      _id: id,
      owner: user.id,
    });

    if (!deletedBeer) {
      return { error: "Beer not found or unauthorized" };
    }

    await User.findByIdAndUpdate(user.id, {
      $pull: { beers: deletedBeer._id },
    });

    return { success: true };
  } catch {
    return { error: "Error deleting beer" };
  }
}
