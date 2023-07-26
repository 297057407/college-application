<script setup>
import { useScroll } from '@vueuse/core'
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




const { y } = useScroll(window)
</script>

<template>
  <div class="header-sticky " :class="{'show' : y  > 78}">
    <div class="container w1200">
      <!-- 导航区域 -->
      <ul class="header-nav">
        <li class="home" v-for="item in arr" :key="item.id">
          <RouterLink :to="`${item.path}`">{{item.name}}</RouterLink>
          <!-- <RouterLink :to="`${item.path}`">{{item.name}}</RouterLink> -->

        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.w1200 {
    width: 1200px;
    margin:0 auto;
}
.header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;

  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
}
.header-nav {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    z-index: 998;
    .font-link {
      font-size: 20px;
      font-weight: 700;
    }
    li {
      margin-right: 40px;
      width: 120px;
      height: 80px;
      line-height: 80px;
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
// .header-nav {
//   width: 820px;
//   display: flex;
//   padding-left: 40px;
//   position: relative;
//   z-index: 998;

//   li {
//     margin-right: 40px;
//     width: 38px;
//     text-align: center;

//     a {
//       font-size: 16px;
//       line-height: 32px;
//       height: 32px;
//       display: inline-block;

//       &:hover {
//         color: rgb(50, 132, 255);
//         border-bottom: 1px solid rgb(50, 132, 255);
//       }
//     }

//     .active {
//       color: rgb(50, 132, 255);
//       border-bottom: 1px solid rgb(50, 132, 255);
//     }
//   }
// }
</style>