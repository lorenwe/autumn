<template>
  <div style="height:100%" id="app">
    <vue-progress-bar></vue-progress-bar>
    <div class="container-with-aside fade-transition">
      <aside class="sidebar">
        <img class="sidebar-logo" src="../assets/logo2.png" alt="logo">
        <!-- 侧边导航 -->
        <nav class="aside-nav">
          <ul class="aside-nav-list">
            <li v-for="(item, index) in items" class="aside-nav-item">
              <router-link :to="{path: item.url }">
                <a :class="[commonClass,item.active ? activeClass : '']"  v-on:click="navClickEvent(items, index)">
                  <i class="fa fa-fw iconfont" :class="[item.icon]"></i>
                </a>
              </router-link>
            </li>
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
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      commonClass: 'aside-nav-button',
      activeClass: 'active',
      items: [
        {
          url: '/Home',
          icon: 'fa-home',
          active: true
        },
        {
          url: '/Tag',
          icon: 'fa-tags',
          active: false
        },
        {
          url: '/About',
          icon: 'fa-user',
          active: false
        }
      ]
    }
  },
  mounted () {
    this.$Progress.finish()
  },
  created () {
    // 路由绑定钩子事件，切换路由出现进度条
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  methods: {
    navClickEvent: function (items, index) {
      items.forEach(function (el) {
        el.active = false
      })
      items[index].active = true
    }
  }
}
</script>

<style>
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
