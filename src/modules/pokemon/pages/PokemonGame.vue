<template>
    <section v-if="isLoading || randomPokemon.id === null"
        class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokemons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="m-5">Quien es ese pokemon?</h1>
        <button v-if="blockSelection" class="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 mb-2"
            @click="getNextOptions(5)">Nuevo
            juego</button>
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
        <PokemonOptions :pokemon-options="pokemonOptions" @selected-option="onSelectedOption"
            :block-selection="blockSelection" :correct-answer="randomPokemon.id" />
    </section>
</template>

<script setup lang="ts">
import PokemonPicture from "../components/PokemonPicture.vue";
import PokemonOptions from "../components/PokemonOptions.vue";

import { usePokemonGame } from "../composables/usePokemonGame";
import { GameStatus } from "../interfaces";

const { gameStatus, isLoading, randomPokemon, pokemonOptions, blockSelection, checkAnswer, getNextOptions } = usePokemonGame()

const onSelectedOption = (value: number) => {
    checkAnswer(value)
}
</script>

<style scoped></style>