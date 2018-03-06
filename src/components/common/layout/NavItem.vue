<template>
    <router-link v-bind:to="route" class="nav-link" tag="li" active-class="active" exact="exact">
        <a class="nav-link" href="#">{{text}}</a>
    </router-link>
</template>

<script>
export default {
  name: 'nav-item',
  props: ['route', 'text', 'exact']
}
</script>

<style>

</style>
