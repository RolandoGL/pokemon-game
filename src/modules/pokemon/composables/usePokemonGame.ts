import { computed, onMounted, ref } from 'vue';
import { GameStatus, type PokemonListResponse, type Pokemon } from './../interfaces/index';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';
export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);
  const blockSelection = computed(() => gameStatus.value !== GameStatus.Playing);
  const randomPokemon = computed(() => {
    const i: number = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[i];
  });
  const pokemonOptions = ref<Pokemon[]>([]);
  const getPokemon = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts: string[] = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        id: +id,
        name: pokemon.name,
      };
    });
    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.splice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }

    gameStatus.value = GameStatus.Lost;
  };
  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    pokemons.value = await getPokemon();
    getNextOptions();
  });

  return {
    gameStatus,
    isLoading,
    randomPokemon,
    pokemonOptions,
    blockSelection,

    getNextOptions,
    checkAnswer,
  };
};
