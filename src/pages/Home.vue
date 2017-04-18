<template>
  <div id="home" class="content">
    <!-- 文章列表 -->
    <post-list v-on:postClick="postListEvent"></post-list>
    <!-- 文章列表end -->
    <!-- 编辑器 -->
    <editor :content="content"></editor>
    <!-- 编辑器end -->
  </div>
</template>

<script>
  import PostList from '../components/PostList'
  import Editor from '../components/Editor'

  export default {
    name: 'home',
    data () {
      return {
        content: ''
      }
    },
    components: {
      'post-list': PostList,
      'editor': Editor
    },
    methods: {
      postListEvent: function (date) {
        this.content = date
      }
    }
  }
</script>

<style scoped>
  .content {
    height: 100%;
  }
</style>
