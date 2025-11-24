import { Router } from "express";
import {
  getPokemonList,
  getPokemonByName,
  getPokemonExtended,
} from "../controllers/pokemonController";
import { verifyAccessToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyAccessToken, getPokemonList);
router.get("/:name", verifyAccessToken, getPokemonByName);
router.get("/:name/extended", verifyAccessToken, getPokemonExtended);

export default router;
