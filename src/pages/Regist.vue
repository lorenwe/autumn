<template>
  <div id="regist">
    <div class="regist-box">
      <form>
        <div class="ipunt-wrap">
          <label for="email" class="icon-user"></label>
          <input type="text" id="email" placeholder="邮箱" v-model="email">
        </div>
        <div class="ipunt-wrap">
          <label for="phone" class="icon-phone"></label>
          <input type="text" id="phone" placeholder="手机号" v-model="phone">
        </div>
        <div class="ipunt-wrap">
          <label for="password" class="icon-password"></label>
          <input type="password" id="password" placeholder="密码" v-model="password">
        </div>
        <div class="ipunt-wrap">
          <label for="confimpassword" class="icon-password"></label>
          <input type="password" id="confimpassword" placeholder="确认密码" v-model="confimpassword">
        </div>
        <div class="button">
          <a class="gv" href="javascript:;" @click="regist()">注册</a>
        </div>
        <div class="toregist">
          已有账号？<router-link to="/Login"><span>去登录</span></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../axios'
export default {
  name: 'regist',
  data () {
    return {
      email: '',
      phone: '',
      password: '',
      confimpassword: '',
      dialog: false,
      dialogMsg: ''
    }
  },
  methods: {
    confirm () {
      this.dialog = false
    },
    regist () {
      if (!this.email || !this.phone || !this.password || !this.confimpassword) {
        this.dialog = true
        this.dialogMsg = '请填写完整'
        console.log('请填写完整')
        return
      }
      if (this.password !== this.confimpassword) {
        this.dialog = true
        this.dialogMsg = '两次密码不相等'
        console.log('两次密码不相等')
        return
      }
      if (!(/^1[34578]\d{9}$/).test(this.phone)) {
        this.dialog = true
        this.dialogMsg = '您的手机号码输入有误，请重新输入'
        console.log('手机号码输入')
        return
      }
      let szReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!szReg.test(this.email)) {
        this.dialog = true
        this.dialogMsg = '您的邮箱输入有误，请重新输入'
        console.log('邮箱不合法')
        return
      }
      var user = {
        email: this.email,
        password: this.password,
        phone: this.phone
      }
      var params = new URLSearchParams()
      for (var i in user) {
        params.append(i, user[i])
      }
      api.UserRegister(params).then(response => {
        var result = response.data
        if (result.State) {
          this.username = ''
          this.password = ''
          sessionStorage.id = result.Data.uid
          sessionStorage.email = result.Data.email
          sessionStorage.phone = result.Data.phone
          this.$router.push('/Login')
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
#regist {
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
.regist-box {
  margin-left: auto;
  margin-right: auto;
  width: 253px;
  padding: 50px;
  margin: 40px auto;
  display: flex;
  z-index: 10001;
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
.icon-phone{
  background: url('../assets/phone.png') no-repeat;
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
  z-index: 10001;
}
.toregist span{
  color: #066197;
  text-decoration: none;
}
</style>
