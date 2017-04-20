<template>
  <div class="post-edit">
    <div class="post-title">
      <input v-model="postData.title" class="input-title" type="text">
    </div>
    <!-- <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor> -->
    <markdown-editor v-on:input="postListInput" v-bind:value="postData.excerpt" v-bind:title="postData.title" :configs="configs"></markdown-editor>
  </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor'

export default {
  props: {
    postData: {}
  },
  data () {
    return {
      title: '',
      content: '',
      configs: {
        spellChecker: false, // 禁用拼写检查
        autoDownloadFontAwesome: false, // 阻止下载Font Awesome
        promptURLs: true,
        renderingConfig: {
          codeSyntaxHighlighting: true, // 开启代码高亮
          highlightingTheme: 'dark' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        }
      }
    }
  },
  components: {
    'markdown-editor': MarkdownEditor
  },
  methods: {
    postListInput: function (data) {
      this.postData.excerpt = data
    }
  },
  watch: {
    title: {
      handler: function (val, oldval) {
        console.log(val)
        console.log(this.postData)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .post-edit {
    overflow: auto;
    height: 100%;
  }
  .post-title {
    width: 100%;
    height: 70px;
    padding: 10px 0;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
  .input-title {
    width: 100%;
    padding: 10px;
    font-size: 30px;
    font-weight: normal;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    border:none;
    outline:medium;
  }
</style>
