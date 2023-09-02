<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useMyformStore } from '@/stores/myform.js'
const userStore = useUserStore()
const myformStore = useMyformStore()
const route = useRoute()
onMounted(async() => {
    myformStore.setIndex(3)
    await myformStore.getSaveList({
        user_id : userStore.loginInfo.user_id,
        index : route.params.id
    })
})
</script>
<template>
    <div class="container-box">
        <ul class="header-box">
            <li>大学名称</li>
            <li>招生计划</li>
            <li>分数</li>
            <li>位次</li>
            <li>专业名称</li>
        </ul>
        <ul class="body-box">
            <li v-for="v in myformStore.current_form" :key="v.id">
                <div class="div">
                    <span>{{ v.university }} </span>
                    <span>院校代码: {{ v.university_code }}</span>
                </div>
                <div class="div">
                    <span>{{ v.num_students }}</span>
                </div>
                <div class="div">
                    <span>{{ v.score }}</span>
                </div>
                <div class="div">
                    <span>{{ v.ranking }}</span>
                </div>
                <div class="div">
                    <span>{{ v.major }}</span>
                    <span>专业代码: {{ v.major_code }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="scss"> .container-box {

     padding: 15px;
     flex: 1;
     // background-color: green;

     .header-box {
         // padding-left: 20px;
         margin-top: 10px;
         border-radius: 10px 10px 0 0;
         background-color: #fafafa;
         display: flex;
         height: 60px;
         line-height: 60px;

         li {
             text-align: center;
         }

         li:nth-child(1) {
             flex: 3;
         }

         li:nth-child(2) {
             flex: 2;
         }

         li:nth-child(3) {
             flex: 2;
         }

         li:nth-child(4) {
             flex: 2;
         }

         li:nth-child(5) {
             flex: 3;
         }
     }

     .shaixuan {
         padding: 10px 20px 0 20px;
         border: 1px solid #d8d6d6;
         border-top: 0;
         border-radius: 0 0 10px 10px;
     }

     .body-box {
         background-color: #fff;
         // padding-left: 20px;

         li {
             width: 100%;
             display: flex;
             height: 80px;
             border-bottom: 1px dotted #909399;

             .div {
                 display: flex;
                 align-items: center;
                 justify-content: center;
             }

             .div:nth-child(1) {
                 flex: 3;
                 display: flex;
                 flex-direction: column;
                 justify-content: space-evenly;
             }

             .div:nth-child(2) {
                 flex: 2;
             }

             .div:nth-child(3) {
                 flex: 2;
             }

             .div:nth-child(4) {
                 flex: 2;
             }

             .div:nth-child(5) {
                 flex: 3;
                 display: flex;
                 flex-direction: column;
                 justify-content: space-evenly;
             }
         }
     }
 }
</style>