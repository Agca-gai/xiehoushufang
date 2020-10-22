<template>
    <div class="container">
        <div class="login-bg">
            <img src="../assets/images/9999.png" alt="">
        </div>
        <div class="login-nav">
            <img src="../assets/images/888.png" alt="">
        </div>
        <div class="login-container">
          <el-form :rules="formRules" ref="form" :model="formData">
            <div class="img1-nav">
                <img class="img1" src="../assets/images/777.png" alt="">
                <div class="input-nav">
                    <div class="input-img">
                        <img class="img0" src="../assets/images/user.png" alt="">
                        <img class="img1" src="../assets/images/333.png" alt="">
                        <img class="img2" src="../assets/images/222.png" alt="">
                        <el-form-item prop="username">
                          <el-input placeholder="请输入用户名" v-model="formData.username" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="input-img">
                        <img class="img0" src="../assets/images/password.png" alt="">
                        <img class="img1" src="../assets/images/333.png" alt="">
                        <img class="img2" src="../assets/images/222.png" alt="">
                        <el-form-item prop="password">
                          <el-input placeholder="请输入密码" v-model="formData.password" show-password></el-input>
                        </el-form-item>
                    </div>
                </div>
            </div>
            <div class="img2-nav">
                <img class="img2" src="../assets/images/444.png" alt="">
                  <el-form-item class="el-item-button">
                      <el-button @click="tohome()">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                  </el-form-item>
            </div>
          </el-form>
        </div>
    </div>
</template>

<script>
// import qer from '../api/home'
import axios from 'axios'
const qs = require('qs')

export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    tohome () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
          axios({
            method: 'post',
            // url: 'http://localhost/xiehoushufang_hh/public/index.php/login/getuser',
            url: 'https://www.lingk.club/xiehoushufang_hh/public/index.php/Login/getUser',
            data: qs.stringify(this.formData),
            // data: {
            //   username: this.formData.username,
            //   password: this.formData.password
            // },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            console.log(data.data)
            if (data.data.code === 0) {
              sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
              // sessionStorage.setItem('falsValue', JSON.stringify(this.falsValue))
              if (data.data.data[0].userRole === 2) {
                this.$message({
                  type: 'success',
                  message: '登录成功！'
                })
                this.$router.push({path: 'home-data'})
              } else if (data.data.data[0].userRole === 3) {
                this.$message({
                  type: 'error',
                  message: '对不起！您没有权限登录系统！'
                })
                sessionStorage.clear('userInfo')
                sessionStorage.clear('roleInfo')
              } else if (data.data.data[0].userRole === 4) {
                this.$message({
                  type: 'error',
                  message: '对不起！您没有权限登录系统！'
                })
                sessionStorage.clear('userInfo')
                sessionStorage.clear('roleInfo')
              } else {
                this.$message({
                  type: 'success',
                  message: '登录成功！'
                })
                this.$router.push({path: 'home-data'})
              }
            } else {
              this.$message({
                type: 'error',
                message: data.data.mes
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
.container {
    background-image: url('../assets/images/timg2.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    position: fixed;
}
.login-bg {
    position: absolute;
    top: 46%;
    left: 0px;
    margin-top: -300px;
    img {
        width: 600px;
        height: 600px;
    }
}
.login-nav {
    position: absolute;
    right: 0;
    top: 0;
    img {
        width: 450px;
    }
}
.login-container {
    position: absolute;
    top: 47%;
    right: 20%;
    margin-top: -200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img1-nav {
        position: relative;
        .img1 {
            width: 400px;
        }
        .input-nav {
            position: absolute;
            left: 50px;
            top: 50%;
            margin-top: -70px;
              .input-img {
                  display: flex;
                  position: relative;
                  align-items: center;
                  margin: 10px;
                  .img0 {
                      position: absolute;
                      left: 10px;
                      width: 30px;
                  }
                  .img1 {
                      width: 50px;
                      height: 50px;
                      margin-right: 10px;
                  }
                  .img2 {
                      width: 220px;
                      height: 60px;
                  }
                  /deep/ .el-form-item {
                        position: absolute;
                        left: 90px;
                        height: 30px;
                        width: 120px;
                        margin-bottom: 10px;
                      .el-input {
                        .el-input__inner {
                            padding: 0;
                            background: transparent;
                            border: 0;
                            color: #fff;
                            width: 100%;
                            height: 100%;
                        }
                        .el-input__suffix {
                            right: unset;
                            top: -4px;
                        }
                    }
                  }
              }
        }
    }
    .img2-nav {
        position: relative;
        margin-top: 50px;
        .img2 {
            width: 200px;
            height: 65px;
            position: absolute;
            left: 50%;
            margin-left: -100px;
            top: 50%;
            margin-top: -32.5px;
        }
        .el-button {
            width: 180px;
            height: 65px;
            position: absolute;
            left: 50%;
            margin-left: -90px;
            top: 50%;
            margin-top: -32px;
            color: #fff;
            background: transparent;
            border: none;
            outline: none;
            font-size: 28px;
            cursor: pointer;
        }
    }
    .img2-nav:hover {
        opacity: 0.5;
    }
}
</style>
