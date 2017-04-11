<template>
  <div class="markdown-editor">
    <textarea></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'

export default {
  name: 'markdown-editor',
  props: {
    value: String,
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
  ready () {
    this.initialize()
    this.syncValue()
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
        this.$emit('input', this.simplemde.value())
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
    syncValue () {
      this.simplemde.codemirror.on('change', () => {
        this.value = this.simplemde.value()
      })
    },
    uploadImgFromPaste (file) {
      var formData = new FormData()
      formData.append('image', file)
      var xhr = new XMLHttpRequest()
      xhr.open('POST', '/upload_image')
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr)
          } else {
            console.log(xhr)
          }
        }
      }
      xhr.onerror = function (e) {
        console.log(xhr)
      }
      xhr.send(formData)
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
  height: 100%;
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
</style>
