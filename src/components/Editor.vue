<template>
  <div class="post-edit">
    <div class="post-title">
      <input v-model="postData.title" v-on:keydown="saveInput" class="input-title" type="text">
    </div>
    <!-- <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor> -->
    <markdown-editor v-on:input="postListInput" v-bind:value="postData.excerpt" v-bind:title="postData.title" :configs="configs" ></markdown-editor>
  </div>
</template>

<script>
// import 'simplemde-theme-base/dist/simplemde-theme-base.min.css'
import MarkdownEditor from './MarkdownEditor'
import api from '../axios'
export default {
  props: {
    postData: {}
  },
  data () {
    return {
      title: '',
      content: '',
      timer: null,
      isUpdate: false,
      configs: {
        spellChecker: false, // 禁用拼写检查
        autoDownloadFontAwesome: false, // 阻止下载Font Awesome
        promptURLs: true,
        renderingConfig: {
          codeSyntaxHighlighting: true, // 开启代码高亮
          highlightingTheme: 'monokai' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
        }
      }
    }
  },
  components: {
    'markdown-editor': MarkdownEditor
  },
  mounted: function () {
    this.timer = setInterval(() => {
      if (this.isUpdate) {
        this.savePost()
      }
    }, 60000)
  },
  methods: {
    postListInput: function (data) {
      this.postData.excerpt = data.content
      if (data.save) {
        // 保存修改
        this.savePost()
      } else {
        this.isUpdate = true
      }
    },
    savePost: function () {
      var article = {
        _id: this.postData._id,
        title: this.postData.title,
        excerpt: this.postData.excerpt
      }
      var params = new URLSearchParams()
      for (var i in article) {
        params.append(i, article[i])
      }
      api.SavePost(params).then(response => {
        var result = response.data
        if (result.State) {
          this.isUpdate = false
          console.log('ok')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    saveInput: function (event) {
      if (event.ctrlKey === true && event.keyCode === 83) {
        event.preventDefault()
        this.savePost()
      }
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
  },
  beforeDestroy: function () {
    clearInterval(this.timer)
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
