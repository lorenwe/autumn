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
          var reader = new FileReader()
          var _this = this
          reader.readAsDataURL(file)
          reader.onload = function (e) {
            let base64Str = e.target.result
            _this.uploadImgFromPaste(base64Str, 'drop', true)
          }
        }
      })
      // console.log(this)
      this.simplemde.codemirror.on('paste', (editor, event) => {
        // 粘帖
        if (event.clipboardData || event.originalEvent) {
          var clipboardData = (event.clipboardData || event.originalEvent.clipboardData)
          if (clipboardData.items) {
            // for chrome
            this.fileChrom(event, clipboardData)
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
    fileChrom (event, clipboardData) {
      var items = clipboardData.items
      var len = items.length
      var blob = null
      event.preventDefault()
      for (var i = 0; i < len; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          blob = items[i].getAsFile()
          // console.log(blob)
        }
      }
      if (blob !== null) {
        var reader = new FileReader()
        var _this = this
        reader.onload = function (event) {
          let base64Str = event.target.result
          // console.log(_this)
          _this.uploadImgFromPaste(base64Str, 'paste', true)
        }
        reader.readAsDataURL(blob)
      }
    },
    uploadImgFromPaste (file, type, isChrome) {
      var formData = new FormData()
      formData.append('image', file)
      formData.append('submission-type', type)
      var xhr = new XMLHttpRequest()
      xhr.open('POST', '/upload_image')
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr)
            // var data = JSON.parse(xhr.responseText)
            // var tarBox = document.getElementById('tar_box')
            if (isChrome) {
              // var img = document.createElement('img')
              // img.className = 'my_img'
              // img.src = data.store_path
              // tarBox.appendChild(img)
              // console.log(xhr)
            }
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
