<script setup>
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()

//控制登陆注册切换
const login = ref(true)
//登录表单配置
const loginRef = ref(null)
const loginRuleForm = ref({
  username: '',
  password: ''
})
//登录表单规则
const loginRules = ref({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 1, max: 12, message: '长度应为1-12位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 1, max: 12, message: '长度应为1-12位', trigger: 'blur' },
  ]
})
//提交登录表单
const loginForm = async (loginRef) => {
  if (!loginRef) return
  await loginRef.validate(async (valid, fields) => {
    if (valid) {
      //登录验证合法需要做的事情
      const res = await userStore.login(loginRuleForm.value)
      if (res.status === "success") {
        ElMessage.success(res.message)
        //后端验证通过进入主页
        router.push('/')
      }
      else {
        //验证不通过提示错误
        ElMessage.warning(res.message)
      }
    }
    else {
      console.log('提交失败!', fields)
    }
  })
}
//注册表单配置
const registerRef = ref(null)
const registerRuleForm = ref({
  username: '',
  password: '',
  email: ''
})
//注册的表单规则
const registerRules = ref({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 1, max: 12, message: '长度应为1-12位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 1, max: 12, message: '长度应为1-12位', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { min: 1, max: 20, message: '长度应为1-20位', trigger: 'blur' },
  ]
})
//提交注册表单
const registerForm = async (registerRef) => {
  if (!registerRef) return
  await registerRef.validate(async (valid, fields) => {
    if (valid) {
      //注册验证合法需要做的事情
      const res = await userStore.register(registerRuleForm.value)
      if (res.status === "success") {
        ElMessage.success(res.message)
        login.value = true
      } else {
        ElMessage.warning(res.message)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>
<template>
  <div class="login-container">
    <header class="login-header">
      <div class="container">
        <h1 class="logo">
          <RouterLink to="/"><i class="iconfont icon-shouye"></i></RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-icon-angle-right-dubble"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">{{ login ? '账户登录' : '账户注册' }}</a>
        </nav>
        <div class="account-box">
          <div class="form" v-if="login">
            <el-form ref="loginRef" :model="loginRuleForm" :rules="loginRules" label-position="right" label-width="60px"
              status-icon>
              <el-form-item label="账号" prop="username">
                <el-input v-model="loginRuleForm.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password" >
                <el-input v-model="loginRuleForm.password" type="password" />
              </el-form-item>
              <el-form-item label="验证码">
                <el-input class="code" />
              </el-form-item>
              <el-button type="primary" size="large" class="subBtn" @click="loginForm(loginRef)">点击登录</el-button>
              <a class="gotoA" href="javascript:;" @click.prevent="login = false">没有账号？去注册</a>
            </el-form>
          </div>
          <div class="form" v-else>
            <el-form ref="registerRef" :model="registerRuleForm" :rules="registerRules" label-position="right"
              label-width="60px" status-icon>
              <el-form-item label="账号" prop="username">
                <el-input v-model="registerRuleForm.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="registerRuleForm.password"  />
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerRuleForm.email" />
              </el-form-item>
              <el-button type="primary" size="large" class="subBtn" @click="registerForm(registerRef)">点击注册</el-button>
              <a class="gotoA" href="javascript:;" @click.prevent="login = true">去登录</a>
            </el-form>
          </div>
        </div>
      </div>
    </section>
    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">XXXX</a>
          <a href="javascript:;">XXXX</a>
          <a href="javascript:;">XXXX</a>
        </p>
        <p>CopyRight &copy; XXXX</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-container {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/bg3.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .login-header {
    border-bottom: 1px solid #e4e4e4;

    .container {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    .logo {
      height: 100px;
      line-height: 100px;

      i {
        color: skyblue;
        font-size: 60px;
      }

    }

    .entry {
      width: 120px;
      height: 100px;
      line-height: 100px;
      font-size: 16px;
      color: black;
    }
  }

  .login-section {
    height: 540px;
    position: relative;

    .wrapper {


      box-sizing: content-box;
      padding: 50px;
      height: 380px;
      border-radius: 50%;
      width: 380px;
      background-color: rgba(0, 0, 0, .2);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

      nav {
        font-size: 14px;
        height: 55px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        padding: 0 40px;
        text-align: right;
        align-items: center;

        a {
          flex: 1;
          line-height: 1;
          display: inline-block;
          font-size: 18px;
          position: relative;
          text-align: center;
          color: black;

        }

      }
    }
  }

  .login-footer {

    p {
      text-align: center;
      color: #999;
      padding-top: 20px;

      a {
        line-height: 1;
        padding: 0 10px;
        color: #999;
        display: inline-block;

        ~a {
          border-left: 1px solid #ccc;
        }
      }
    }
  }

  .account-box {
    .gotoA {
      display: block;
      float: right;
      padding: 10px 0 15px 0;
      text-decoration: underline;
      color: blak;
    }

    ::v-deep .el-form-item__label {
      color: black;
    }

    .form {
      padding: 0 20px 20px 20px;

      .code {
        width: 100px;
      }

    }

  }

  .subBtn {
    width: 100%;
  }
}
</style>