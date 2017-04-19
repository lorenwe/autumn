<template>
  <section class="post-list-column">
    <h3 class="page-title"><i class="fa fa-home fa-fw iconfont"></i> 文章列表  <i class="fa fa-plus fa-fw iconfont post-add" v-on:click="test()"></i></h3>
    <ul class="post-list reset-list">
      <li v-for="(post, index) in postList" :class="[commonClass, index===focus ? activeClass : '']" v-on:click="postClickEvent(index)">
        <i class="fa fa-file-text fa-2x icon-note"></i>
        <p class="abbreviate">{{post['excerpt']}}</p>
        <a href="javascript:void(0)" data-type="edit" class="note-link title">{{post['title']}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      commonClass: 'post-list-item',
      focus: 0,
      activeClass: 'active',
      postList: []
    }
  },
  beforeCreate: function () {

  },
  // 组件实例化之前
  created: function () {

  },
  // 组件实例化了
  beforeMount: function () {

  },
  // 组件写入dom结构之前
  mounted: function () {
    this.getPostList()
  },
  // 组件写入dom结构了
  beforeUpdate: function () {

  },
  // 组件更新前
  updated: function () {

  },
  // 组件更新比如修改了文案
  beforeDestroy: function () {

  },
  // 组件销毁之前
  destroyed: function () {

  },
  // 组件已经销毁
  methods: {
    postClickEvent: function (index) {
      this.focus = index
      this.$emit('postClick', this.postList[index].excerpt)
    },
    test: function () {
      this.$Progress.start()
      setTimeout(() => {
        if (Math.random() > 0.5) {
          this.$Progress.finish()
        } else {
          this.$Progress.fail()
        }
      }, 300)
    },
    getPostList: function () {
      var _this = this
      this.$ajax.post('/postList.php').then(function (response) {
        var result = response.data
        if (result.State) {
          _this.postList = result.Data
          _this.$emit('postClick', _this.postList[0].excerpt)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .post-list-column {
      float: left;
      border-right: 1px solid #ececec;
      height: 100%;
      width: 300px;
      overflow-y: auto;
  }
  .page-title {
      color: #7f8c8d;
      padding-left: 25px;
      font-weight: 400;
      margin: 18px 0;
  }
  
  .post-add {
      cursor: pointer;
      float: right;
      margin-right: 10px;
      margin-top: 5px;
  }
  .post-list {
      border-top: 1px solid #ececec;
  }
  .reset-list {
      list-style: none;
      padding-left: 0;
  }
  .post-list-item {
      color: #555555;
      position: relative;
      max-height: 90px;
      height: 90px;
      border-top: 1px solid #dcdcdc;
      background-color: transparent;
      border-left: 5px solid transparent !important;
  }
  .post-list-item:hover {
      color: #555555;
      position: relative;
      max-height: 90px;
      height: 90px;
      border-top: 1px solid #dcdcdc;
      background-color: #ececec;
      border-left: 5px solid #ec7259 !important;
  }
  .post-list>.active{
      background-color: #ececec;
      color: #555555;
      border-left: 5px solid #ec7259 !important;
  }
  .post-list>.active:hover {
      background-color: #ececdd;
      color: #555555;
      border-left: 5px solid #ec7259 !important;
  }
  .icon-note {
      position: absolute;
      top: 35px;
      left: 15px;
      width: 22px;
      height: 30px;
      background-position: 0 -25px;
      background-repeat: no-repeat;
      background-size: 250px;
  }
  .post-list-item .abbreviate {
      cursor: pointer;
  }
  .abbreviate {
      position: absolute;
      top: 40px;
      left: 50px;
      right: 40px;
      max-height: 30px;
      height: 30px;
      margin: 0;
      color: #555555;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 11px;
      font-weight: normal;
      line-height: 36px;
  }
  .title {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 15px 30px 15px 55px;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-weight: normal;
      line-height: 36px;
  }
</style>
