<template>
  <div id="home" class="content">
    <!-- 文章列表 -->
    <post-list></post-list>
    <!-- 文章列表end -->
    <!-- 编辑器 -->
    <editor></editor>
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
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      'post-list': PostList,
      'editor': Editor
    }
  }
</script>

<style scoped>
  
</style>
