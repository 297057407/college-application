<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>
<template>
    <div class="container">
        <div class="innerbox">
        </div>
        <h1>抱歉,没有找到与"{{ route.query.message.trim() }}"相关的内容</h1>
    </div>
</template>
<style scoped lang="scss"> .container {
     width: 1200px;
     margin: 0 auto;
     .innerbox {
         width: 600px;
         margin: 0 auto;
         height: 400px;
         background: url('@/assets/images/notfind.png');
         background-repeat: no-repeat;
     }

     h1 {
        margin-top: -30px;
        padding-bottom: 20px;
         text-align: center;
         color: #808794;
     }
 }</style>