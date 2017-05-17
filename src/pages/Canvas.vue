<template>
  <div id="modal" class="content">
    <canvas id="canvas" class="canvas"></canvas>
    <transition name="fade-in">
      <router-view></router-view>
    </transition>
    <div class="city" id="city"></div>
    <div class="moon"></div>	
  </div>
</template>

<script>
  import Stars from '../../static/js/Star'
  import Moon from '../../static/js/Moon'
  import Meteor from '../../static/js/Meteor'

  export default {
    name: 'modal',
    mounted: function () {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let width = window.innerWidth
      let height = window.innerHeight
      // 实例化月亮和星星。流星是随机时间生成，所以只初始化数组
      let moon = new Moon(ctx, width, height)
      let stars = new Stars(ctx, width, height, 200)
      let meteors = []
      let count = 0
      canvas.width = width
      canvas.height = height
      const meteorGenerator = () => {
        // x位置偏移，以免经过月亮
        let x = Math.random() * width + 500
        meteors.push(new Meteor(ctx, x, height))
        // 每隔随机时间，生成新流星
        setTimeout(() => {
          meteorGenerator()
        }, Math.random() * 2000)
      }
      const frame = () => {
        count++
        count % 10 === 0 && stars.blink()
        moon.draw()
        stars.draw()
        meteors.forEach((meteor, index, arr) => {
          // 如果流星离开视野之内，销毁流星实例，回收内存
          if (meteor.flow()) {
            meteor.draw()
          } else {
            arr.splice(index, 1)
          }
        })
        requestAnimationFrame(frame)
      }
      meteorGenerator()
      frame()
    }
  }
</script>

<style scoped>
#modal {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.canvas {
  position: fixed;
  z-index: -1;
}
.city {
  width: 100%;
  height: 170px;
  position: fixed;
  bottom: 0px;
  z-index: 100;
  background: url('../assets/city.png') no-repeat;
  background-size: cover;
  background-position: 0 0;
  background-repeat: repeat-x;
  -webkit-animation-name:'wobble';/*动画属性名，也就是我们前面keyframes定义的动画名*/ 
  -webkit-animation-duration: 150s;/*动画持续时间*/ 
  -webkit-animation-timing-function: linear; /*动画频率，和transition-timing-function是一样的*/ 
  -webkit-animation-delay: 0;/*动画延迟时间*/ 
  -webkit-animation-iteration-count: infinite;/*定义循环资料，infinite为无限次*/ 
  -webkit-animation-direction: normal;/*定义动画方式*/
}
@-webkit-keyframes wobble {
  0%{ 
    background-position: 0 0;
  }
  50%{
    background-position: 2046px 0;
  }
  100%{
    background-position: 4092px 0;
  }
}
.moon {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 100px;
  top: 100px;
  background: url('../assets/moon.png') no-repeat;
  background-size: cover;
}
.fade-in-enter-active, .fade-in-leave-active {
    transition: all .5s
}
.fade-in-enter, .fade-in-leave-active {
    opacity: 0;
    transform: translateX(400px);
}
</style>
