<script>
export default {
  name: 'BlogPost',
  data () {
    return {
      post: {}
    }
  },
  methods: {
    async getPost () {
      try {
        const res = await this.$butter.post.retrieve(this.$route.params.slug)
        this.post = res.data
      } catch (err) {
        console.error('Failed to get post: ', err)
      } finally {
        this.$Progress.finish()
      }
    }
  },
  async created () {
    await this.getPost()
  }
}
</script>

<template>
  <div v-if="post && post.data" class="container-fluid" id="blog-post">
    <br />
    <h1>{{ post.data.title }}</h1>
    <hr/>
    <div v-html="post.data.body"></div>

    <router-link
      v-if="post.meta.previous_post"
      :to="/blog/ + post.meta.previous_post.slug"
      class="button"
    >
      {{ post.meta.previous_post.title }}
    </router-link>
    <router-link
      v-if="post.meta.next_post"
      :to="/blog/ + post.meta.next_post.slug"
      class="button"
    >
      {{ post.meta.next_post.title }}
    </router-link>
    <br />
  </div>
</template>
