<template>
  <section class="post-list-column">
    <h3 class="page-title"><i class="fa fa-home fa-fw iconfont"></i> 文章列表  <i class="fa fa-plus fa-fw iconfont post-add"></i></h3>
    <ul class="post-list reset-list">
      <li class="post-list-item active" v-for="post in postList">
        <i class="fa fa-file-text fa-2x icon-note"></i>
        <p class="abbreviate">{{post['excerpt']}}</p>
        <a href="javascript:void(0)" data-type="edit" class="note-link title">{{post['title']}}</a>
      </li>
      <li class="post-list-item">
        <i class="fa fa-file-text fa-2x icon-note"></i>
        <p class="abbreviate">2365.26233都是就自动保存功能，书写的文章只有在发布之后才会</p>
        <a href="javascript:void(0)" data-type="edit" class="note-link title">02313</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      postList: [
        {id: 1, title: '标题', article: 'article', excerpt: 'excerpt', lastEditTime: '2017-03-30'}
      ]
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
