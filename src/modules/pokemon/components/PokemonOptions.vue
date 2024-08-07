<template>
    <ul class="mt-5 flex flex-col">
        <button :disabled="blockSelection" v-for="{ name, id } in pokemonOptions" :key="id"
            @click="$emit('selectedOption', id)" :class="['disabled:shadow-none disabled:bg-gray-200', {
                correct: id === correctAnswer && blockSelection,
                incorrect: id !== correctAnswer && blockSelection,
            }]">{{ name }}</button>
    </ul>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';
import { defineProps } from 'vue';


interface Props {
    pokemonOptions: Pokemon[],
    blockSelection: boolean,
    correctAnswer: number
}

defineProps<Props>()
defineEmits<{
    selectedOption: [id: number],

}>()
</script>

<style lang="css" scoped>
button {
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-blue-400 capitalize;
}

.correct {
    @apply bg-blue-500 text-white;
}

.incorrect {
    @apply bg-red-100 opacity-70;
}
</style>