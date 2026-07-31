"use server";

import { connectDB } from "../lib/db";
import { Beer } from "../models/Beer";
import Auth from "../lib/Auth";
import type { BeerModel } from "../models/BeerModel";

export default async function GetBeersAction(name?: string): Promise<BeerModel[]> {
  await connectDB();

  const user = await Auth.getUser();
  if (!user) {
    return [];
  }

  const query: Record<string, unknown> = { owner: user.id };
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  const beers = await Beer.find(query).sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(beers.map((beer) => beer.toJSON())));
}
