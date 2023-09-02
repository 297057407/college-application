
<script setup>
import { useRouter } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useMyformStore } from '@/stores/myform.js'
const userStore = useUserStore()
const myformStore = useMyformStore()
const router = useRouter()
onMounted(async () => {
    if (!userStore.loginInfo.user_id) ElMessage.warning('请先登录')
    else {
        await myformStore.getList({ user_id: userStore.loginInfo.user_id })
    }
})
//跳转到志愿表详情
const form_detail = (id) => {
    router.push({
        path: `/my/myformdetail/${id}`, // 传递的参数
    });
}
//删除志愿表
const delete_form = async (index) => {
    await myformStore.deleteList({
        index,
        user_id: userStore.loginInfo.user_id
    })
    ElMessage.success('删除成功')
    await myformStore.getList({ user_id: userStore.loginInfo.user_id })
}
</script>
<template>
    <div class="form_container">
        <div class="form_head">
            <h2>我的志愿表</h2>
            <hr>
            <ul>
                <li v-for="(v, i) in myformStore.form_list" :key="i" class="form_li"><span>编号:{{ v.index
                }}</span><span>信息 : {{ v.introduction }}</span><span> <el-button type="primary"
                            @click="form_detail(v.index)">查看志愿表</el-button> <el-button type="danger"
                            @click="delete_form(v.index)">删除志愿表</el-button></span></li>
            </ul>
        </div>
        <div class="form_detail">

        </div>
    </div>
</template>
<style scoped lang="scss">
.form_container {
    width: 100%;
    padding: 30px 20px;

    ul {
        border: 1px solid #999;
        border-bottom: none;
        border-radius: 5px;

        .form_li {
            padding-left: 40px;
            height: 60px;
            border-bottom: 1px solid #999;
            display: flex;
            align-items: center;

            span:first-child {
                flex: 1;
            }

            span:nth-child(2) {
                flex: 3;
            }

            span:nth-child(3) {
                flex: 2;
            }
        }
    }

}
</style>
