<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
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
  #app {
    width: 100%;
    height: 100%;
  }
</style>
