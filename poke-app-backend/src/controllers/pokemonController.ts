import { Request, Response } from "express";
import axios from "axios";

export const getPokemonList = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const page = parseInt(req.query.page as string) || 1;
  const search = (req.query.search as string)?.toLowerCase() || "";

  try {
    const response = await axios.get(
      `${process.env.POKE_API_BASE}/pokemon?limit=2000`
    );
    let results = response.data.results;

    if (search)
      results = results.filter((p: any) =>
        p.name.toLowerCase().includes(search)
      );

    const total = results.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedResults = results.slice(start, end);

    return res.json({
      count: total,
      results: paginatedResults,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return res.status(500).json({ message: "Failed to fetch Pokémon list" });
  }
};

export const getPokemonByName = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${process.env.POKE_API_BASE}/pokemon/${req.params.name}`
    );
    const pokemon = response.data;
    return res.json({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((t: any) => t.type.name),
      abilities: pokemon.abilities.map((a: any) => a.ability.name),
      sprite_front: pokemon.sprites.front_default,
      sprite_back: pokemon.sprites.back_default,
      sprite_artwork: pokemon.sprites.other["official-artwork"].front_default,
    });
  } catch {
    return res.status(404).json({ message: "Pokémon not found" });
  }
};

export const getPokemonExtended = async (req: Request, res: Response) => {
  try {
    const pokemonRes = await axios.get(
      `${process.env.POKE_API_BASE}/pokemon/${req.params.name}`
    );
    const pokemon = pokemonRes.data;

    const speciesRes = await axios.get(pokemon.species.url);
    const species = speciesRes.data;

    const evoRes = await axios.get(species.evolution_chain.url);
    const evo = evoRes.data;

    const extractEvolutionNames = (chain: any): string[] => {
      const names = [];
      let current = chain;
      while (current) {
        names.push(current.species.name);
        current = current.evolves_to?.[0];
      }
      return names;
    };

    return res.json({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((t: any) => t.type.name),
      abilities: pokemon.abilities.map((a: any) => a.ability.name),
      base_experience: pokemon.base_experience,
      stats: pokemon.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      moves: pokemon.moves.map((m: any) => m.move.name),
      color: species.color?.name,
      habitat: species.habitat?.name,
      shape: species.shape?.name,
      flavor_text: species.flavor_text_entries.find(
        (entry: any) => entry.language.name === "en"
      )?.flavor_text,
      evolution_chain: extractEvolutionNames(evo.chain),
      sprite_artwork: pokemon.sprites.other["official-artwork"].front_default,
    });
  } catch {
    return res
      .status(404)
      .json({ message: "Extended Pokémon details not found" });
  }
};
