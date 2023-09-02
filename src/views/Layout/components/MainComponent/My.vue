<script setup>
import { onMounted } from 'vue'
import { useMyformStore } from '@/stores/myform.js'
const myformStore = useMyformStore()
onMounted(()=> {
    myformStore.setIndex(1)
})
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="aside" width="200px">
                <div class="info-top">
                    <div class="avator">Q</div> <span>177****6170</span>
                </div>
                <ul>
                    <li :class="{ active: index === myformStore.i }" v-for="(item, index) in myformStore.leftList" :key="index" @click="myformStore.setIndex(index)">
                        <RouterLink :to="item.path"><i class="iconfont icon-yonghu"></i> {{ item.name }}</RouterLink>
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