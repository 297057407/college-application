<script setup>
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
import { ref } from 'vue'
const input = ref('')
const exitHandler = () => {
    userStore.exit()
    ElMessage.success("退出成功")
    router.push('/login')
}
</script>
<template>
    <div class="nav">
        <div class="container">
            <div class="logo">
                <img src="@/assets/images/logo3.png" alt="">
            </div>
            <div class="search">
                <el-input v-model="input" placeholder="搜大学 查专业" size="large" />
            </div>
            <el-button type="primary" size="large">搜索</el-button>
            <div class="welcome" v-if="userStore.loginInfo.user_id">欢迎：{{ userStore.loginInfo.user_id }}</div>
            <div class="welcome" v-else>请先登录</div>
            <div class="login">

                <el-popconfirm title="确定退出？" @confirm="exitHandler()">
                    <template #reference>
                        <el-button type="danger" v-if="userStore.loginInfo.user_id">退出</el-button>
                    </template>
                </el-popconfirm>
                <el-button type="primary" v-if="!userStore.loginInfo.user_id"
                    @click="router.push('/login')">登录/注册</el-button>
            </div>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
.nav {
    background-color: #1e1e1e;
    color: #fff;
    margin-bottom: 20px;
    .container {

        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 1200px;
        padding: 50px;
        height: 60px;
        margin: auto;
        .logo {
            width: 200px;
            height: 65px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .search {
            width: 380px;
            margin-left: 90px;
        }

        ::v-deep .el-input__wrapper {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            margin-right: -3px;
        }

        .welcome {
            margin-left: 100px;
            width: 200px;
        }

        .login {
            width: 100px;
        }
    }
}
</style>