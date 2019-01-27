<template>
  <div class="container-fluid" id="blog-home">
    <br />
    <!-- Create `v-for` and apply a `key` for Vue. Here we are using a combination of the slug and index. -->
    <div v-for="(post, index) in posts" :key="post.slug + '_' + index">
      <router-link :to="'/blog/' + post.slug">
        <h2>{{ post.title }}</h2>
        <h5>{{ post.published | date }}</h5>
        <p>{{ post.summary }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data () {
    return {
      posts: []
    }
  },
  filters: {
    date (d) {
      return new Date(d).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  methods: {
    async getPosts () {
      try {
        const res = await this.$butter.post.list({
          page: 1,
          page_size: 10
        })
        this.posts = res.data.data
      } catch (err) {
        console.error('Failed to get posts: ', err)
      } finally {
        this.$Progress.finish()
      }
    }
  },
  async created () {
    await this.getPosts()
  }
}
</script>

<style scoped>

</style>
