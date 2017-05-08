<template>
  <div id="login" class="content">
    <div class="modal fade login in" id="loginModal" style="display: block;" aria-hidden="false">
      <div class="modal-dialog login">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">登入</h4>
          </div>
          <div class="modal-body">
            <div class="box">
              <div class="content">
                <div class="social">
                  <a class="circle github" href="/auth/github"><i class="fa fa-github fa-fw"></i></a>
                  <a id="google_login" class="circle google" href="/auth/google_oauth2"><i class="fa fa-google-plus fa-fw"></i></a>
                  <a id="facebook_login" class="circle facebook" href="/auth/facebook"><i class="fa fa-facebook fa-fw"></i></a>
                </div>
                <div class="division">
                  <div class="line l"></div>
                    <span>or</span>
                  <div class="line r"></div>
                </div>
                <div class="error"></div>
                <div class="form loginBox">
                  <form method="post" action="/login" accept-charset="UTF-8">
                    <input id="email" class="form-control" type="text" placeholder="Email" name="email">
                    <input id="password" class="form-control" type="password" placeholder="Password" name="password">
                    <input class="btn btn-default btn-login" type="button" value="Login" onclick="loginAjax()">
                  </form>
                </div>
              </div>   
            </div>
          </div>
          <div class="modal-footer">
            <div class="forgot login-footer">
              <span>马上去 
                <a href="javascript: showRegisterForm();">创建帐号</a>
              ?</span>
            </div>
          </div>
        </div>
      </div>
	  </div>
  </div>
</template>

<script>
  export default {
    name: 'login'
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
      opacity: .6;
  }
  .login .modal-dialog {
      width: 350px;
  }
  .modal-dialog {
      position: relative;
      z-index: 1050;
      width: auto;
      padding-top: 100px;
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
  .login .modal-header {
      border: 0 none;
      padding: 15px 15px 15px;
  }
  .modal-header {
      min-height: 16.428571429px;
      padding: 15px;
      border-bottom: 1px solid #e5e5e5;
  }
  .modal-title {
      margin: 0;
      line-height: 1.428571429;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #000;
      font-size: 18px;
  }
  .login .modal-body {
      /* background-color: #eeeeee; */
  }
  .modal-body {
      position: relative;
      padding: 20px;
  }
  .login .box .social {
      float: none;
      margin: 0 auto 30px;
      text-align: center;
  }
  .login .social .github {
      background-color: #403A3A;
  }
  .login .social .google {
      background-color: #F74933;
  }
  .login .social .facebook {
      background-color: #455CA8;
  }
  .login .social .circle {
      /* background-color: #EEEEEE; */
      color: #FFFFFF;
      border-radius: 100px;
      display: inline-block;
      margin: 0 17px;
      padding: 15px;
  }
  .login .division {
      float: none;
      margin: 0 auto 18px;
      overflow: hidden;
      position: relative;
      text-align: center;
      width: 100%;
  }
  .login .division .line.l {
      left: 0;
  }
  .login .division .line {
      border-top: 1px solid #DFDFDF;
      position: absolute;
      top: 10px;
      width: 34%;
  }
  .login .division .line.r {
      right: 0;
  }
  .login .box .form input[type="text"], .login .box .form input[type="password"] {
      border-radius: 3px;
      border: none;
      color: #333333;
      font-size: 16px;
      height: 46px;
      margin-bottom: 5px;
      padding: 13px 12px;
      width: 100%;
      box-sizing: border-box;
  }
  .login .form-control {
      background-color: rgba(0, 0, 0, 0.09);
      box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.09) inset;
  }
  .form-control {
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.428571429;
      color: #555555;
      vertical-align: middle;
      background-color: #ffffff;
      background-image: none;
      border: 1px solid #cccccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }
  .login .btn-login {
      background-color: #00BBFF;
      border-color: #00BBFF;
      border-width: 0;
      color: #FFFFFF;
      display: block;
      margin: 0 auto;
      padding: 15px 50px;
      text-transform: uppercase;
      width: 100%;
  }
  .login .btn-login:hover {
      background-color: #00A4E4;
      color: #FFFFFF;
  }
  .btn {
      font-size: 14px;
      font-weight: normal;
      line-height: 1.428571429;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      border: 1px solid transparent;
      border-radius: 4px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
  }
  .login .modal-footer {
      border-top: 0;
      margin-top: 0px;
      padding: 10px 20px 20px;
  }
  .modal-footer {
      padding: 19px 20px 20px;
      margin-top: 15px;
      text-align: right;
      border-top: 1px solid #e5e5e5;
  }
  .login .forgot {
      color: #797979;
      margin-left: 0;
      overflow: hidden;
      text-align: center;
      width: 100%;
  }
</style>
