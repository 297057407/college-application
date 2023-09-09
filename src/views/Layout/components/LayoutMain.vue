<script setup>
import { ref } from 'vue'
import { useSchoolStore } from '@/stores/school';
import { useMajorStore } from '@/stores/major';
const majorStore = useMajorStore()
const schoolStore = useSchoolStore()
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

const goToSchool = async (id) => {
  if (id == 3) {
    //获取默认排序的专业数据
    await majorStore.getSearchInfoByTags({ "major_level": '', "major_category": '', "major_class": '', 'search_name': '' })
  }
  if (id == 4) {
    await schoolStore.getSchoolByTags({ level: '', location: '', type: '', tags: '', search_name: '', page: 1 })
  }
}
</script>

<template>
  <header class='header'>
    <div class="container">
      <ul class="header-nav">
        <li class="home" v-for="item in arr" :key="item.id" @click="goToSchool(item.id)">
          <RouterLink class="font-link" active-class="active" :to="`${item.path}`" exact-active-class="active">{{
            item.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>


<style scoped lang='scss'>
.header {
  background: #fff;
  width: 100%;
  border-bottom: 1px solid #c5c3c3;
  margin-bottom: 30px;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .header-nav {
      display: flex;
      position: relative;
      z-index: 998;
      padding-left: 50px;

      .font-link {
        font-size: 20px;
        font-weight: 700;
        color: #007bff;
        text-decoration: none;
        transition: color 0.3s ease;

      }

      .home {
        margin-right: 10px;
        width: 160px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        padding-top: 20px;

        a {
          font-size: 26px;
          line-height: 100px;
          height: 80px;
          display: inline-block;

          &:hover {
            border-bottom: 1px solid #007bff;
          }
        }

        .active {
          color: #ff5722;
          border-bottom: 3px solid #ff5722;
        }
      }


    }

  }



}
</style>