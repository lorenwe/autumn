<template>
  <div class="markdown-editor">
    <textarea></textarea>
    <div class="wrapper" v-show="!loadOver"> 
      <div class="load-bar" > 
        <div class="load-bar-inner" :style="{width: loadText }"> <span>{{loadText}}</span> </div> 
      </div> 
    </div> 
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'

export default {
  name: 'markdown-editor',
  data () {
    return {
      content: '',
      timer: 0,
      loadText: '',
      loadOver: true
    }
  },
  props: {
    value: String,
    title: String,
    previewClass: String,
    customTheme: {
      type: Boolean,
      default () {
        return false
      }
    },
    configs: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      let configs = {}
      Object.assign(configs, this.configs)
      configs.element = configs.element || this.$el.firstElementChild
      configs.initialValue = configs.initialValue || this.value

      // 实例化编辑器
      this.simplemde = new SimpleMDE(configs)

      // 判断是否开启代码高亮
      if (configs.renderingConfig && configs.renderingConfig.codeSyntaxHighlighting) {
        require.ensure([], () => {
          const theme = configs.renderingConfig.highlightingTheme || 'default'
          window.hljs = require('highlight.js')
          require(`highlight.js/styles/${theme}.css`)
        }, 'highlight')
      }

      // 判断是否引入样式文件
      if (!this.customTheme) {
        require('simplemde/dist/simplemde.min.css')
      }

      // 添加自定义 previewClass
      const className = this.previewClass || ''
      this.addPreviewClass(className)

      // 绑定事件
      this.bindingEvents()
    },
    bindingEvents () {
      this.simplemde.codemirror.on('change', () => {
        this.content = this.simplemde.value()
        this.$emit('input', {content: this.content, save: false})
        if (this.timer === 0) {
          this.timer = Date.parse(new Date()) / 1000
        } else {
          let JetLag = Date.parse(new Date()) / 1000 - this.timer
          if (JetLag > 10) {
            this.timer = Date.parse(new Date()) / 1000
            console.log(this.value)
            console.log(this.title)
            console.log(JetLag)
          }
        }
      })
      this.simplemde.codemirror.on('keydown', (editor, event) => {
        if (event.ctrlKey === true && event.keyCode === 83) {
          this.postContent(this.content)
          event.preventDefault()
        }
      })
      this.simplemde.codemirror.on('drop', (editor, event) => {
        // 拖拽
        // console.log(event)
        event.preventDefault()
        var data = event.dataTransfer
        // console.log(data.files)
        var len = data.files.length
        for (var i = 0; i < len; i++) {
          var file = data.files[i]
          // this.simplemde.value(_this.value + '\n![](' + base64Str + ')')
          this.uploadImgFromPaste(file)
        }
      })
      this.simplemde.codemirror.on('paste', (editor, event) => {
        // 粘帖
        if (event.clipboardData || event.originalEvent) {
          var clipboardData = (event.clipboardData || event.originalEvent.clipboardData)
          if (clipboardData.items) {
            // for chrome
            // this.fileChrom(event, clipboardData)
            for (var i = 0; i < clipboardData.items.length; i++) {
              var item = clipboardData.items[i]
              console.log(item.kind)
              if (item.kind === 'file') {
                // 文件内容
                if (item.type.indexOf('image') !== -1) {
                  // 只处理图片内容
                  var blob = item.getAsFile()
                  var maxsize = 20 * 1024 * 1024
                  var size = blob.size
                  if (size === 0 || size > maxsize) {
                    return
                  }
                  event.preventDefault()
                  console.log(blob.size)
                  // 文件上传
                  this.uploadImgFromPaste(blob)
                }
              } else if (item.kind === 'string') {
                // 文本内容 不做处理
              }
            }
          } else {
            // for firefox
          }
        } else {
          // for ie11
        }
      })
    },
    addPreviewClass (className) {
      const wrapper = this.simplemde.codemirror.getWrapperElement()
      const preview = document.createElement('div')
      wrapper.nextSibling.className += ` ${className}`
      preview.className = `editor-preview ${className}`
      wrapper.appendChild(preview)
    },
    uploadImgFromPaste (file) {
      var _this = this
      var formData = new FormData()
      formData.append('image', file)
      var xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', function (e) {
        _this.onProgress(e.loaded, e.total)
      }, false)
      xhr.open('POST', '/upload_image.php')
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setTimeout(function () {
              _this.loadOver = true
            }, 400)
            console.log(xhr)
          } else {
            console.log(xhr)
            setTimeout(function () {
              _this.loadOver = true
            }, 400)
          }
        }
      }
      xhr.onerror = function (e) {
        console.log(xhr)
      }
      xhr.send(formData)
    },
    postContent (content) {
      this.$emit('input', {content: content, save: true})
    },
    onProgress (loaded, total) {
      this.loadOver = false
      this.loadText = (loaded / total * 100).toFixed(2) + '%'
    }
  },
  destroyed () {
    this.simplemde = null
  },
  watch: {
    value (val) {
      if (val === this.simplemde.value()) return
      this.simplemde.value(val)
    }
  }
}
</script>

<style>
.markdown-editor {
  height: calc(100% - 70px);
  position: relative;
}
.markdown-editor .markdown-body {
  padding: 0.5em
}
.markdown-editor .CodeMirror {
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 51px;
    bottom: 32px;
    box-sizing: border-box;
}
.markdown-editor .editor-preview-active, .markdown-editor .editor-preview-active-side {
  display: block;
}
.markdown-editor .CodeMirror,.markdown-editor .CodeMirror-scroll {
  min-height: 300px;
}
.editor-statusbar {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    position: absolute;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
}

/*进度条样式*/
.wrapper {  
    width: 350px;  
    margin: 200px auto;  
}  
.wrapper p a {color:#757575; text-decoration:none;}  
.wrapper .load-bar {  
    width: 100%;  
    height: 25px;  
    border-radius: 30px;  
    background: #dcdbd7;  
    position: relative;  
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8),  inset 0 2px 3px rgba(0, 0, 0, 0.2);  
    z-index: 11;
}  
.wrapper .load-bar:hover .load-bar-inner, .wrapper .load-bar:hover #counter {  
    animation-play-state: paused;  
    -moz-animation-play-state: paused;  
    -o-animation-play-state: paused;  
    -webkit-animation-play-state: paused;  
}  
.wrapper .load-bar-inner {  
    height: 99%;  
    width: 0%;  
    border-radius: inherit;  
    position: relative;  
    background: #c2d7ac;  
    background: linear-gradient(#e0f6c8, #98ad84);  
    background: -moz-linear-gradient(#e0f6c8, #98ad84);  
    background: -webkit-linear-gradient(#e0f6c8, #98ad84);  
    background: -o-linear-gradient(#e0f6c8, #98ad84);  
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 1),  0 1px 5px rgba(0, 0, 0, 0.3),  0 4px 5px rgba(0, 0, 0, 0.3);  
    animation: loader 10s linear infinite;  
    -moz-animation: loader 10s linear infinite;  
    -webkit-animation: loader 10s linear infinite;  
    -o-animation: loader 10s linear infinite;  
}  
.wrapper #counter {  
    position: absolute;  
    background: #eeeff3;  
    background: linear-gradient(#eeeff3, #cbcbd3);  
    background: -moz-linear-gradient(#eeeff3, #cbcbd3);  
    background: -webkit-linear-gradient(#eeeff3, #cbcbd3);  
    background: -o-linear-gradient(#eeeff3, #cbcbd3);  
    padding: 5px 10px;  
    border-radius: 0.4em;  
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 1),  0 2px 4px 1px rgba(0, 0, 0, 0.2),  0 1px 3px 1px rgba(0, 0, 0, 0.1);  
    left: -25px;  
    top: -50px;  
    font-size: 12px;  
    font-weight: bold;  
    width: 44px;  
    animation: counter 10s linear infinite;  
    -moz-animation: counter 10s linear infinite;  
    -webkit-animation: counter 10s linear infinite;  
    -o-animation: counter 10s linear infinite;  
}  
.wrapper #counter:after {  
    content: "";  
    position: absolute;  
    width: 8px;  
    height: 8px;  
    background: #cbcbd3;  
    transform: rotate(45deg);  
    -moz-transform: rotate(45deg);  
    -webkit-transform: rotate(45deg);  
    -o-transform: rotate(45deg);  
    left: 50%;  
    margin-left: -4px;  
    bottom: -4px;  
    box-shadow:  3px 3px 4px rgba(0, 0, 0, 0.2),  1px 1px 1px 1px rgba(0, 0, 0, 0.1);  
    border-radius: 0 0 3px 0;  
}  
.wrapper h1 {  
    font-size: 28px;  
    padding: 20px 0 8px 0;  
}  
.wrapper p {  
    font-size: 13px;  
}  

</style>
