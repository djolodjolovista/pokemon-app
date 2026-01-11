import { Router } from "express";
import {
  getPokemonList,
  getPokemonByName,
  getPokemonExtended,
  getPokemonLocations,
} from "../controllers/pokemonController";
import { verifyAccessToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/locations", verifyAccessToken, getPokemonLocations);
router.get("/", verifyAccessToken, getPokemonList);
router.get("/:name", verifyAccessToken, getPokemonByName);
router.get("/:name/extended", verifyAccessToken, getPokemonExtended);

export default router;
