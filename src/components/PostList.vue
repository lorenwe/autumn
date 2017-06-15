<template>
  <section class="post-list-column">
    <h3 class="page-title">
      <i class="fa fa-home fa-fw iconfont"></i> 
      文章列表  
      <i class="fa fa-plus fa-fw iconfont post-add" v-on:click="addPost()"></i>
    </h3>
    <draggable class="post-list reset-list" @update="onUpdate" element="ul" v-model="postList" :options="dragOptions" @start="onStart">
      <transition-group type="transition" :name="'flip-list'">
        <li 
        v-for="(post, index) in postList" 
        v-on:click="postClickEvent(index)" 
        :class="[commonClass, focus===index ? activeClass : '']" 
        :key="index">
          <i class="fa fa-file-text fa-2x icon-note"></i>
          <p class="abbreviate">{{post['excerpt']}}</p>
          <a href="javascript:void(0)" data-type="edit" class="note-link title">{{post['title']}}</a>
        </li>
      </transition-group>
    </draggable>
  </section>
</template>

<script>
import api from '../axios'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      commonClass: 'post-list-item',
      focus: 0,
      editable: true,
      activeClass: 'active',
      postList: [],
      oldList: []
    }
  },
  components: {
    draggable
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
    onStart: function (event) {
      this.oldList = this.postList
    },
    onUpdate: function (event) {
      var oldIndex = event.oldIndex
      var newIndex = event.newIndex
      var sortlist = []
      var curId = this.oldList[this.focus]._id
      var oldList = this.oldList
      for (var i in oldList) {
        sortlist[i] = oldList[i].sort
      }
      // 需要更新的记录
      var updateArr = []
      var obj = {}
      if (parseInt(oldIndex) > parseInt(newIndex)) {
        // 从下往上拖
        for (var j = newIndex; j <= oldIndex; j++) {
          obj = {}
          obj._id = oldList[j]._id
          obj.sort = oldList[j].sort
          updateArr[j] = obj
        }
        for (var item in updateArr) {
          if (parseInt(item) === parseInt(oldIndex)) {
            updateArr[item].sort = oldList[newIndex].sort
          } else {
            updateArr[item].sort = oldList[item].sort - 1
          }
        }
      } else {
        // 从上往下拖
        for (var k = oldIndex; k <= newIndex; k++) {
          obj = {}
          obj._id = oldList[k]._id
          obj.sort = oldList[k].sort
          updateArr[k] = obj
        }
        for (var y in updateArr) {
          if (parseInt(y) === parseInt(oldIndex)) {
            updateArr[y].sort = oldList[newIndex].sort
          } else {
            updateArr[y].sort = oldList[y].sort + 1
          }
        }
      }
      console.log(updateArr)
      this.saveSort(updateArr)
      for (var v in this.postList) {
        if (curId === this.postList[v]._id) {
          this.focus = parseInt(v)
        }
        this.postList[v].sort = sortlist[v]
      }
    },
    postClickEvent: function (index) {
      this.focus = index
      this.$emit('postClick', this.postList[index])
    },
    addPost: function () {
      this.$Progress.start()
      api.AddPost().then(response => {
        var result = response.data
        if (result.State) {
          this.postList.unshift(result.Data)
          this.$emit('postClick', this.postList[0])
          this.$Progress.finish()
        } else {
          this.$Progress.fail()
        }
      }).catch(err => {
        console.log(err)
        this.$Progress.fail()
      })
    },
    getPostList: function () {
      api.GetPostList().then(response => {
        var result = response.data
        if (result.State) {
          this.postList = result.Data
          this.$emit('postClick', this.postList[0])
        }
      }).catch(err => {
        console.log(err)
      })
    },
    saveSort: function (data) {
      var params = []
      for (var item in data) {
        if (data[item] !== null) {
          params.push(data[item])
        }
      }
      api.SaveSort(params).then(response => {
        var result = response.data
        if (result.State) {
          console.log('保存成功')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
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
  /*.post-list-item:hover {
      color: #555555;
      position: relative;
      max-height: 90px;
      height: 90px;
      border-top: 1px solid #dcdcdc;
      background-color: #ececec;
      border-left: 5px solid #ec7259 !important;
  }*/
  .post-list .active{
      background-color: #ececec;
      color: #555555;
      border-left: 5px solid #ec7259 !important;
  }
  .post-list .active:hover {
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
  .flip-list-move {
      transition: transform 0.9s;
  }

  .no-move {
      transition: transform 0.5s;
  }
  .ghost {
      opacity: .7;
      background: #C8EBFB;
  }
  /*.list-group-item {
      cursor: move;
  }

  .list-group-item i{
      cursor: pointer;
  }*/
</style>
