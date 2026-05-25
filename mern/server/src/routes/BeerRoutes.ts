import express from "express";
import CreateBeer from "../controllers/beer/CreateBeer.ts";
import DeleteBeer from "../controllers/beer/DeleteBeer.ts";
import GetBeers from "../controllers/beer/GetBeers.ts";
import UpdateBeer from "../controllers/beer/UpdateBeer.ts";
import GetBeer from "../controllers/beer/GetBeer.ts";
import type { Controller } from "../utils/Types.ts";
import { ImageUploadMiddleware } from "../middlewares/ImageUploadMiddleware.ts";
const BeerRoutes = express.Router();

BeerRoutes.post("/", ImageUploadMiddleware.single("image"), CreateBeer as Controller);

BeerRoutes.get("/", GetBeers as Controller);

BeerRoutes.get("/:id", GetBeer as Controller);

BeerRoutes.delete("/:id", DeleteBeer as Controller);

BeerRoutes.put("/:id", ImageUploadMiddleware.single("image"), UpdateBeer as Controller);

export default BeerRoutes;
