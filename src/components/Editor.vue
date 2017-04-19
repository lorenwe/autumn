<template>
  <div class="post-edit">
    <div class="post-title"></div>
    <!-- <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor> -->
    <markdown-editor :value="content" :configs="configs"></markdown-editor>
  </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor2'

export default {
  props: {
    content: {
      default: 'SimpleMDE'
    }
  },
  data () {
    return {
      // content: '``` \n var a=1; \n```',
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
    background-color: #c4c4c4;
  }
</style>
