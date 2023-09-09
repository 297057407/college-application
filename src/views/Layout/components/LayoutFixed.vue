<script setup>
import { useScroll } from '@vueuse/core'
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
    name: '智能填报志愿',
  },
  {
    id: 3,
    path: '/searchmajor',
    name: '查专业',
  },

  {
    id: 4,
    path: '/searchschool',
    name: '查学校',
  },
  {
    id: 5,
    path: '/schoolrank',
    name: '学校排名',
  },
  {
    id: 6,
    path: '/my',
    name: '个人中心',
  },
])



const { y } = useScroll(window)
</script>

<template>
  <div class="header-sticky " :class="{ 'show': y > 178 }">
    <div class="container w1200">
      <!-- 导航区域 -->
      <ul class="header-nav">
        <li class="home" v-for="item in arr" :key="item.id">
          <RouterLink exact-active-class="active" :to="`${item.path}`">{{item.name}}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.w1200 {
  width: 1200px;
  margin: 0 auto;
}

.header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #3498db; /* 与主体背景颜色相协调的蓝色背景 */
  color: #fff; /* 文本颜色 */
  /* 文本颜色 */
  // border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  z-index: 9998; /* 提高层级，确保在其他内容上面 */

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
      color: #fff;

      &:hover {
        border-bottom: 1px solid #fff;
      }
    }

    .active {
      color: #333;
      border-bottom:1px solid #333;
    }
  }
}</style>