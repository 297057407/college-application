<script setup>
import { ref } from 'vue'
const arr = ref([
  {
    id: 1,
    path: '/home',
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
    path: '/chooseuniversity',
    name: '智能选大学',
  },
  {
    id: 6,
    path: '/toolbox',
    name: '高考工具箱',
  },
])


</script>

<template>
  <header class='header'>
    <div class="container">
      <ul class="header-nav">
        <li class="home" v-for="item in arr" :key="item.id">
          <!-- <RouterLink class="font-link" active-class="active" :to="`${item.path}`">{{ item.name }}</RouterLink> -->
          <RouterLink class="font-link" active-class="active" :to="`${item.path}`">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>


<style scoped lang='scss'>
.header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .header-nav {
    display: flex;
    position: relative;
    z-index: 998;
    .font-link {
      font-size: 20px;
      font-weight: 700;
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
        border-bottom: 1px solid #666;
      }
    }
  }


}
</style>