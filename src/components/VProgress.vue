<template>
  <div class="__cov-progress" id="vprogress"></div>
</template>

<script>
export default {
  name: 'vprogress',
  data () {
    return {
      opacity: 0
    }
  }
}
</script>

<style>
  .__cov-progress {
    position: fixed;
    z-index: 999999;
    width:100%;
    background-color:#0000FF;
    margin:0px;
    padding:0px;
    height:3px;
  }
</style>
