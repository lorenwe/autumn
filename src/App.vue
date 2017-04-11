<template>
  <div style="height:100%" id="app">
    <div class="container-with-aside fade-transition">
      <aside class="sidebar">
        <img class="sidebar-logo" src="./assets/logo2.png" alt="logo">
        <!-- 侧边导航 -->
        <nav class="aside-nav">
          <ul class="aside-nav-list">
            <li class="aside-nav-item"><a href="#/" class="aside-nav-button active"><i class="fa fa-home fa-fw iconfont"></i></a> </li>
            <li class="aside-nav-item"><a href="#/tag" class="aside-nav-button"><i class="fa fa-tags fa-fw iconfont"></i></a> </li>
            <li class="aside-nav-item"><a href="#/about" class="aside-nav-button"><i class="fa fa-user fa-fw iconfont"></i></a> </li>
          </ul>
        </nav>
        <!-- 侧边导航end -->
        <!-- 登出 -->
        <nav class="aside-menu">
          <ul class="aside-nav-list">
            <li class="aside-nav-item"><a href="#/out" class="aside-nav-button"><i class="fa fa-sign-out fa-fw fa-rotate-180 iconfont"></i> </a></li>
          </ul>
        </nav>
        <!-- 登出end -->
      </aside>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
  *{margin: 0;padding: 0;}
  html, body {
      height: 100%;
      color: #4a4a4a;
  }
  img {
      border: 0;
  }
  body, ul, ol, form {
      margin: 0;
  }
  a {
      text-decoration: none;
      color: inherit;
  }
  li {
      display: list-item;
      text-align: -webkit-match-parent;
  }
  h3 {
      display: block;
      font-size: 1.17em;
      -webkit-margin-before: 1em;
      -webkit-margin-after: 1em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
      font-weight: bold;
  }
  .container-with-aside {
      margin-left: 70px;
      height: 100%;
  }
  .fade-transition {
      -webkit-transition: opacity 0.2s ease;
      transition: opacity 0.2s ease;
  }
  .sidebar {
      box-sizing: border-box;
      border-right: 1px solid #ececec;
      background-color: #f8f8f8;
      text-align: center;
      color: #fff;
      position: fixed;
      height: 100%;
      width: 70px;
      padding: 12px 12px 24px 12px;
      left: 0;
      top: 0;
  }
  .sidebar-logo {
      margin-top: 5px;
      width: 36px;
  }
  .sidebar .aside-nav {
      margin-top: 30px;
      border-top: 1px solid #ececec;
  }
  .sidebar .aside-nav .aside-nav-list {
      list-style: none;
      padding: 0;
  }
  .aside-nav-item {
      padding: 20px 0;
  }
  
  .aside-nav-button {
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      width: 45px;
      height: 45px;
      background: #fff;
      padding: 0;
      padding-top: 10px;
      border: 1px solid #ececec;
      border-radius: 50%;
      color: #42b983;
  }
  .aside-nav-button:hover {
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      width: 45px;
      height: 45px;
      background: #42b983;
      padding: 0;
      padding-top: 10px;
      border: 1px solid #ececec;
      border-radius: 50%;
      color: #fff;
  }
  .aside-nav-button.active {
      border: 1px solid #42b983;
  }
  .iconfont {
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
  }
  .aside-nav-button .iconfont {
      font-size: 22px;
  }
  .aside-menu {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
  }
  .content {
      height: 100%;
  }
</style>
