<template>
  <div id="login" class="content">
    <div class="modal fade login in" id="loginModal" style="display: block;" aria-hidden="false">
      <div class="modal-dialog login">
        <div class="modal-content">
          <div class="message"><span>确认登出吗？</span></div>
          <div class="social">
            <button class="button button-confirm" v-on:click="LoginOut()">确认</button>
            <button class="button button-clear" v-on:click="Cancel()">取消</button>
          </div>
        </div>
      </div>
	  </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      LoginOut () {
        localStorage.removeItem('token')
        this.$router.push('/Login')
      },
      Cancel () {
        this.$router.push('/Home')
      }
    }
  }
</script>

<style scoped>
  .fade .in {
      opacity: 1;
  }
  .modal {
      background-color: #000;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      display: none;
      overflow: auto;
  }
  .fade {
      background:rgba(0,0,0,0.6);
  }
  .login .modal-dialog {
      width: 350px;
  }
  .modal-dialog {
      position: relative;
      z-index: 1050;
      width: auto;
      padding-top: 200px;
      margin-right: auto;
      margin-left: auto;
      box-sizing: border-box;
  }
  .modal-content {
      position: relative;
      background-color: #ffffff;
      border: 1px solid #999999;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      outline: none;
      -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      background-clip: padding-box;
  }
  .message {
      float: none;
      margin: 50px 20px 30px 20px;
      text-align: center;
  }
  .social {
      float: none;
      margin: 20px auto 20px;
      text-align: center;
  }
  .button {
      margin: 5px;
      color: #FFF;
      font-weight: 300;
      font-size: 16px;
      text-decoration: none;
      text-align: center;
      line-height: 40px;
      height: 40px;
      padding: 0 40px;
      display: inline-block;
      appearance: none;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-transition-property: all;
      transition-property: all;
      -webkit-transition-duration: .3s;
      transition-duration: .3s;
      outline:none;
  }
  .button:hover{
      text-decoration: none;
      outline: none;
  }
  .button-confirm {
      margin-right: 20px;
      background-color: #FF4351;
      border-color: #FF4351;
  }
  .button-confirm:hover {
      background-color: #ff7680;
      border-color: #ff7680;
  }
  .button-clear {
      margin-left: 20px;
      background-color: #229ffd;
      border-color: #229ffd;
  }
  .button-clear:hover {
      background-color: #4cb0f9;
      border-color: #4cb0f9;
  }
</style>
