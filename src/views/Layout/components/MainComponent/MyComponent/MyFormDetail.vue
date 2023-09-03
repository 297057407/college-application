<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useMyformStore } from '@/stores/myform.js'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { utils, writeFile } from "xlsx";
const userStore = useUserStore()
const myformStore = useMyformStore()
const route = useRoute()
onMounted(async () => {
    myformStore.setIndex(3)
    await myformStore.getSaveList({
        user_id: userStore.loginInfo.user_id,
        index: route.params.id
    })
})
//导出志愿表
const outinfo = async () => {
    ElMessage('已开始下载，请耐心等待...')
    let arr = myformStore.current_form.map((item, index) => {
        return {
            编号: index + 1,
            大学名称: item.university,
            大学代码: item.university_code,
            招生计划: item.num_students + '人',
            分数: item.score + '分',
            位次: item.ranking + '名',
            专业名称: item.major,
            专业代码: item.university_code
        }
    })
    let sheet = utils.json_to_sheet(arr)
    let book = utils.book_new()
    utils.book_append_sheet(book, sheet, "我的志愿表")
    await writeFile(book, `${route.query.introduction}${new Date().getTime()}.xls`)
    ElMessage({
        message: '下载完成，请前往下载内容中查看。',
        type: 'success',
    })
}
</script>
<template>
    <div class="container-box">
        <div class="myformhead">我的志愿表 {{ route.params.id }} </div>
        <div class="infoAndout">
            <span>当前信息: {{ route.query.introduction }}</span>
            <a href="javascript:void(0)" @click="outinfo"><i class="iconfont icon-daochu" @click.prevent="downloadInfo">
                    导出当前排行榜</i></a>
        </div>
        <ul class="header-box">
            <li>编号</li>
            <li>大学名称</li>
            <li>招生计划</li>
            <li>分数</li>
            <li>位次</li>
            <li>专业名称</li>
        </ul>
        <ul class="body-box">
            <li v-for="(v, i) in myformStore.current_form" :key="v.id">
                <div class="div">{{ i + 1 }}</div>
                <div class="div">
                    <span>{{ v.university }} </span>
                    <span>院校代码: {{ v.university_code }}</span>
                </div>
                <div class="div">
                    <span>{{ v.num_students }} 人</span>
                </div>
                <div class="div">
                    <span>{{ v.score }} 分</span>
                </div>
                <div class="div">
                    <span>第 {{ v.ranking }} 名</span>
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
     .myformhead {
         text-align: center;
         font-weight: 700;
         font-size: 20px;
         margin-bottom: 20px;
         padding-right: 100px;
         color: #007bff;
     }

     .infoAndout {
         display: flex;
         justify-content: space-between;

         a {
             width: 145px;
             color: #007bff;
             padding-right: 10px;
         }

         span {
             color: #007bff;
             font-weight: 700;
             flex: 1;
         }
     }

     padding: 15px;
     flex: 1;
     // background-color: green;

     .header-box {
         // padding-left: 20px;
         margin-top: 10px;
         border-radius: 10px 10px 0 0;
         border-radius: 10px 10px 0 0;
         background-color: rgba(0, 123, 255, .5);
         display: flex;
         height: 60px;
         line-height: 60px;

         li {
             text-align: center;
         }

         li:nth-child(1) {
             flex: 1;
         }

         li:nth-child(2) {
             flex: 3;
         }

         li:nth-child(3) {
             flex: 2;
         }

         li:nth-child(4) {
             flex: 2;
         }

         li:nth-child(5) {
             flex: 2;
         }

         li:nth-child(6) {
             flex: 3;
         }
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
                 flex: 1;
                 font-size: 20px;
                 font-weight: 700;
             }

             .div:nth-child(2) {
                 flex: 3;
                 display: flex;
                 flex-direction: column;
                 justify-content: space-evenly;

                 span:nth-child(1) {
                     font-size: 18px;
                     font-weight: 500;
                     color: #007bff;
                 }

                 span:nth-child(2) {
                     font-size: 12px;
                     color: rgba(159, 159, 159, .7);
                 }
             }

             .div:nth-child(3) {
                 flex: 2;
             }

             .div:nth-child(4) {
                 flex: 2;
             }

             .div:nth-child(5) {
                 flex: 2;
             }

             .div:nth-child(6) {
                 span:nth-child(1) {
                     font-size: 14px;
                     font-weight: 700;
                     color: #007bff;
                 }

                 span:nth-child(2) {
                     font-size: 12px;
                     color: rgba(0, 123, 255, .5);
                 }

                 flex: 3;
                 display: flex;
                 flex-direction: column;
                 justify-content: space-evenly;
             }
         }
     }
 }</style>