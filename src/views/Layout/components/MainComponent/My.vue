<script setup>
import { ref } from 'vue'
const leftList = ref([{ name: '会员中心' }, { name: '个人资料' }, { name: '我的收藏' }, { name: '我的志愿表' }, { name: '我的订单' }, { name: '意见反馈' }, { name: '用户协议' }, { name: '隐私政策' }, { name: '联系客服' }])
//左侧选中下标
const i = ref(0)
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="aside" width="200px">
                <div class="info-top">
                    <div class="avator">Q</div> <span>177****6170</span>
                </div>
                <ul>
                    <li :class="{ active: index === i }" v-for="(item, index) in leftList" :key="index" @click="i = index">
                        <RouterLink to="/my/myinfo"><i class="iconfont icon-yonghu"></i> {{ item.name }}</RouterLink>
                    </li>
                </ul>
            </el-aside>
            <el-container>
                <RouterView></RouterView>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped lang="scss">
.common-layout {
    background-color: #fff;
    margin-top: 30px;



    .aside {
        .info-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .avator {
                line-height: 60px;
                font-size: 30px;
                text-align: center;
                color: #fff;
                width: 60px;
                height: 60px;
                background-color: pink;
                border-radius: 50%;
            }

        }

        border: 1px dotted #c6c4c4;
        border-radius: 5px;
        margin-right: 20px;
        padding: 30px 20px;

        li {
            padding: 10px;
            border-radius: 5px;
        }

        li.active {
            background-color: rgb(105, 174, 242);
            color: #fff;
        }
    }
}

//卡片
</style>