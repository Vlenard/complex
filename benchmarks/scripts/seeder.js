import mongoose from "../../next/node_modules/mongoose/index.js";
import bcrypt from "../../next/node_modules/bcrypt/bcrypt.js";

const URI = process.env.MONGO_URI || "mongodb+srv://rbeer_admin_db_user:Start123@dev-cluster.i4mvjuq.mongodb.net/?appName=dev-cluster";
const DB_NAME = "rbeerv3";

const BEER_NAMES = [
  { name: "Pilsner Urquell Benchmark", type: "lager", alcohol: 4.4, rate: 8, note: "Classic Czech pilsner" },
  { name: "BrewDog Punk IPA Benchmark", type: "ipa", alcohol: 5.4, rate: 9, note: "Post-modern classic IPA" },
  { name: "Guinness Draught Benchmark", type: "stout", alcohol: 4.2, rate: 9, note: "Iconic Irish dry stout" },
  { name: "Sierra Nevada Pale Ale Benchmark", type: "apa", alcohol: 5.6, rate: 8, note: "Pioneering American pale ale" },
  { name: "Fuller's London Porter Benchmark", type: "porter", alcohol: 5.4, rate: 9, note: "Rich chocolate and coffee notes" },
  { name: "Budweiser Budvar Benchmark", type: "lager", alcohol: 5.0, rate: 7, note: "Crisp Bohemian lager" },
  { name: "Stone IPA Benchmark", type: "ipa", alcohol: 6.9, rate: 9, note: "Aggressively hopped West Coast IPA" },
  { name: "Founders Porter Benchmark", type: "porter", alcohol: 6.5, rate: 10, note: "Silky and dark robust porter" },
  { name: "Left Hand Milk Stout Benchmark", type: "stout", alcohol: 6.0, rate: 8, note: "Sweet creamy stout" },
  { name: "Zombie Dust Pale Ale Benchmark", type: "apa", alcohol: 6.2, rate: 9, note: "Intense Citra hop aroma" },
  { name: "Weihenstephaner Original Benchmark", type: "lager", alcohol: 5.1, rate: 8, note: "Bavarian classic premium lager" },
  { name: "Lagunitas IPA Benchmark", type: "ipa", alcohol: 6.2, rate: 8, note: "Caramel malt with heavy hops" },
  { name: "Samuel Smith Imperial Stout Benchmark", type: "stout", alcohol: 7.0, rate: 9, note: "Roasted barley and dark fruit" },
  { name: "Anchor Steam Beer Benchmark", type: "lager", alcohol: 4.9, rate: 7, note: "California common lager" },
  { name: "Deschutes Black Butte Benchmark", type: "porter", alcohol: 5.5, rate: 8, note: "Creamy mouthfeel with coffee" },
  { name: "Three Floyds Alpha King Benchmark", type: "apa", alcohol: 6.6, rate: 9, note: "Flagship American pale ale" },
  { name: "Kozel Dark Benchmark", type: "lager", alcohol: 3.8, rate: 7, note: "Smooth caramel dark lager" },
  { name: "Goose Island IPA Benchmark", type: "ipa", alcohol: 5.9, rate: 7, note: "Traditional English style IPA" },
  { name: "Young's Double Chocolate Stout Benchmark", type: "stout", alcohol: 5.2, rate: 8, note: "Decadent dessert stout" },
  { name: "Baltika No. 6 Porter Benchmark", type: "porter", alcohol: 7.0, rate: 8, note: "Baltic porter with molasses" },
];

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(URI, { dbName: DB_NAME });
  console.log("Connected!");

  const usersCol = mongoose.connection.db.collection("users");
  const beersCol = mongoose.connection.db.collection("beers");

  const email = "benchmark@test.com";
  const passwordHash = await bcrypt.hash("password123", 10);

  // Clean previous benchmark user and beers
  const existingUser = await usersCol.findOne({ email });
  if (existingUser) {
    console.log("Removing previous benchmark data for user:", existingUser._id);
    await beersCol.deleteMany({ owner: existingUser._id });
    await usersCol.deleteOne({ _id: existingUser._id });
  }

  // Create new benchmark user
  const userResult = await usersCol.insertOne({
    email,
    password: passwordHash,
    name: "Benchmark Tester",
    beers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const userId = userResult.insertedId;
  console.log("Created benchmark user with ID:", userId);

  // Pick a sample image URL from existing storage
  const sampleUrl = "/storage/image-1785489897178-427914278.jpg";

  const beerDocs = BEER_NAMES.map((b) => ({
    name: b.name,
    type: b.type,
    alcohol: b.alcohol,
    rate: b.rate,
    note: b.note,
    url: sampleUrl,
    owner: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const beersResult = await beersCol.insertMany(beerDocs);
  const beerIds = Object.values(beersResult.insertedIds);
  console.log(`Inserted ${beerIds.length} benchmark beers.`);

  await usersCol.updateOne(
    { _id: userId },
    { $set: { beers: beerIds } }
  );

  console.log("Updated user with beer references.");
  console.log("Seeding completed successfully!");

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
