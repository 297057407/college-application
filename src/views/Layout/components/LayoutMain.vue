<script setup>
import { ref } from 'vue'
const arr = ref([
  {
    id: 1,
    path: '/',
    name: '首页',
  },
  {
    id: 2,
    path: '/fillform',
    name: '模拟填报志愿',
  },
  {
    id: 3,
    path: '/searchschool',
    name: '查学校',
  },
  {
    id: 4,
    path: '/searchmajor',
    name: '查专业',
  },

  {
    id: 5,
    path: '/my',
    name: '个人中心',
  },
])


</script>

<template>
  <header class='header'>
    <div class="container">
      <ul class="header-nav">
        <li class="home" v-for="item in arr" :key="item.id">
          <RouterLink class="font-link" active-class="active" :to="`${item.path}`" exact-active-class="active">{{
            item.name }}</RouterLink>
        </li>
        <li><a class="font-link" href="https://eduranking.cn/" target="_blank">易度大学排名</a></li>
      </ul>
    </div>
  </header>
</template>


<style scoped lang='scss'>
.header {
  background: #fff;

  .container {
    width: 1200px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .header-nav {
    display: flex;
    position: relative;
    z-index: 998;

    .font-link {
      font-size: 20px;
      font-weight: 700;
      color: #007bff;
      text-decoration: none;
      transition: color 0.3s ease;

    }

    li {
      margin-right: 40px;
      width: 120px;
      height: 100px;
      line-height: 100px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          border-bottom: 1px solid black;
        }
      }

      .active {
        color: #ff5722; 
      }
    }
  }


}
</style>