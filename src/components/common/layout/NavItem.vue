<template>
    <router-link v-bind:to="route" class="nav-link" tag="li" active-class="active" exact="exact">
        <a class="nav-link" href="#"><span v-if="isNew" class="badge badge-success">New!</span><span v-bind:class="newClass">{{text}}</span></a>
    </router-link>
</template>

<script>
export default {
  name: 'nav-item',
  props: ['route', 'text', 'exact', 'isNew'],
  computed: {
    newClass () {
      return this.isNew ? 'new-text' : null
    }
  }
}
</script>

<style>
.new-text {
  padding-left: 5px;
}
</style>
