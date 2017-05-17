<template>
  <div id="login" class="content">
    <div class="login-box">
      <span class="logo">
        每个人都代表夜空里的一颗星星。
      </span>
      <form>
        <div class="ipunt-wrap">
          <label for="email" class="icon-user"></label>
          <input type="text" id="email1" placeholder="邮箱" v-model="email" name="email">
        </div>
        <div class="ipunt-wrap">
          <label for="password" class="icon-password"></label>
          <input type="password" id="password" placeholder="密码" v-model="password">
        </div>
        <div class="button">
          <a class="gv" href="javascript:;" @click="login()">登录</a>
        </div>
        <div class="toregist">
          还没有账号？<router-link to="/Regist"><span>去注册</span></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import dialog from '@/components/Dialog'
import api from '../axios'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      dialog: false,
      dialogMsg: ''
    }
  },
  methods: {
    confirm () {
      this.dialog = false
    },
    login () {
      if (!this.email || !this.password) {
        this.dialog = true
        this.dialogMsg = '请填写完整'
        return
      }
      let szReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!szReg.test(this.email)) {
        this.dialog = true
        this.dialogMsg = '邮箱不合法'
        console.log('邮箱不合法')
        return
      }
      var user = {
        email: this.email,
        password: this.password
      }
      var params = new URLSearchParams()
      for (var i in user) {
        params.append(i, user[i])
      }
      api.UserLogin(params).then(response => {
        var result = response.data
        if (result.State) {
          this.email = ''
          this.password = ''
          localStorage.setItem('token', result.Data.token)
          sessionStorage.id = result.Data.uid
          sessionStorage.email = result.Data.email
          sessionStorage.phone = result.Data.phone
          this.$router.push('/Home')
        } else {
          this.dialog = true
          this.dialogMsg = response.Message
        }
      }).catch(err => {
        this.dialog = true
        this.dialogMsg = '服务器异常'
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  #login {
  height: 100%;
  overflow: hidden;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.gv {
  text-decoration: none;
    background: url('../assets/nav_gv.png') repeat 0px 0px;
    width: 130px;
    height: 43px;
    display: block;
    text-align: center;
    line-height: 43px;
    cursor: pointer;
    float: left;
    margin: 10px 2px 10px 2px;
    font: 18px/43px 'microsoft yahei';
    color: #066197;
}
a.gv:hover { 
  background: url('../assets/nav_gv.png') repeat 0px -43px; 
  color:#1d7eb8;
  -webkit-box-shadow: 0 0 6px #1d7eb8;
  transition-duration: 0.5s;
}
.login-box {
  width: 600px;
  padding: 50px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 100001;
}
.login-box .logo{
  display: inline-block;
  width: 370px;
  height: 60px;
  margin-bottom: 20px;
  text-align: center;
  font: 18px/43px 'microsoft yahei';
  color: #066197;
}
.ipunt-wrap label{
  display: inline-block;
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 10px;
  background-size: cover;
}
.icon-user{
  background: url('../assets/user.png') no-repeat;
}
.icon-password{
  background: url('../assets/password.png') no-repeat;
}
.ipunt-wrap input{
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid #fff;
  margin-top: 30px;
  width: 200px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-size: 14px;
  padding: 0 5px;
}
.button {
  margin-top: 30px;
  margin-left: 60px
}
.toregist{
  font-size: 12px;
  float: right;
  padding-top: 20px;
  color: #fff;
}
.toregist span{
  color: #066197;
  text-decoration: none;
}
</style>
