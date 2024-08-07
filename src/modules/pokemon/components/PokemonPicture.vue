import { computed } from 'vue';
<template>
    <div>
        <img :src="pokemonImage" :class="showPokemon ? 'fade-in' : 'brightness-0'" alt="">
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
interface Props {
    pokemonId: number,
    showPokemon: boolean
}
const props = withDefaults(defineProps<Props>(), {
    showPokemon: false
})
const pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`)

</script>

<style lang="css" scoped>
img {
    height: 200px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>