
<script setup>
import HotItem from '@/components/HotItem.vue';

import { onMounted, ref } from 'vue'
import { useSchoolStore } from '@/stores/school';
import { useUserStore } from '@/stores/user';
import { useNewsStore } from '@/stores/news';
const schoolStore = useSchoolStore()
const userStore = useUserStore()
const newsStore = useNewsStore()
// const imgArr = ["src/assets/images/c2.jpg", "src/assets/images/c3.jpg", "src/assets/images/c4.jpg"]

//随机生成9条数据
const randomArticles = ref([])
onMounted(async () => {
    getRandomArticles()
    await schoolStore.getHot(userStore.location)
})
const getRandomArticles = () => {
    let set = new Set()
    while (set.size < 9) {
        let random = Math.floor(Math.random() * (newsStore.articles.length - 1 - 0 + 1) + 0)
        set.add(random)
    }
    randomArticles.value = [...set]
}

//刷新热门院校
const refreshschool = () => {
    schoolStore.refresh()
}

//学校详情
const opendetail = ref(false)
const openSchoolDetail = () => {
    opendetail.value = true
}
</script>
<template>
    <div class="countainer">
        <h1>让我们一起寻找您的完美选择，为您的未来赋能！</h1>
        <br>
        <div style="text-align: center;"><video src="@/assets/images/video.mp4" controls width="1000" height="560"
                loop="true" muted="true" autoplay="true" controlsList="nodownload"></video></div>
        <br>
        <div class="hot-top">
            <h2>热门院校</h2> <a @click="refreshschool" href="javascript:void(0)" class="fresh"><i
                    class="iconfont icon-huanyipi"></i> 换一批</a>
        </div>
        <section>
            <div class="left-card" @click="openSchoolDetail(schoolStore.hotSchool[0])">
                <RouterLink to="/" class="item">
                    <img v-lazy="`https://p7571184p7.zicp.fun/img/picture/${schoolStore.hotSchool[0]?.name}.jpeg` || ''"
                        alt="" />
                    <p class="name ellipsis">{{ schoolStore.hotSchool[0]?.name }}</p>
                    <p> <i style="color: red;" class="iconfont icon-renqiredu"></i> <span style="font-size: 16px;">热度: {{
                        schoolStore.hotSchool[0]?.popularity }}</span> </p>
                    <p class="desc ellipsis">{{ schoolStore.hotSchool[0]?.location }}</p>
                </RouterLink>
            </div>
            <div class="right-cards">
                <div class="right-card" @click="openSchoolDetail(v)" v-for="(v, i) in schoolStore.hotSchool.slice(1)"
                    :key="i">
                    <HotItem :item="v"></HotItem>
                </div>
                <!-- 可以添加更多次热门院校的卡片 -->
            </div>
        </section>
        <el-drawer z-index="9999" v-model="opendetail" title="学校详情" :with-header="false" direction="ttb">

        </el-drawer>
        <div class="hot-top">
            <h2>高考资讯</h2> <a @click="getRandomArticles" href="javascript:void(0)" class="fresh"><i
                    class="iconfont icon-huanyipi"></i> 换一批</a>
        </div>
        <ul>
            <li v-for="(v, i) in randomArticles" :key="i" class="article">
                <RouterLink :to="{ path: '/news', query: { id: randomArticles[i] } }"> {{
                    newsStore.articles[randomArticles[i]].head }}</RouterLink>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="scss">
h1 {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-top: 20px;
    font-style: italic;
}

.hot-top {
    padding-right: 55px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #007bff;

    .fresh {
        font-size: 16px;
        align-self: flex-end;
        color: rgb(255, 141, 67);
    }
}

h2 {
    color: #007bff;
}

section {
    height: 315px;
    margin: 20px;
    display: flex;

    /* 使用 flex 布局 */

}

ul {
    .article {
        padding-left: 40px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        border-bottom: 1px solid #adabab;

        a:hover {
            color: #007bff;
        }
    }

}

.left-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
    /* 左边占用一定比例的空间 */
    background-color: #fff;
    border-radius: 5px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    .item {
        // background-color: pink;
        display: block;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 20px 30px;
        text-align: center;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .see {
            font-size: 20px;
        }
    }
}



.right-cards {
    flex: 3;
    /* 右边占用两倍的空间 */
    display: flex;
    flex-wrap: wrap;
    /* 右边的卡片换行排列 */
    justify-content: space-evenly
        /* 均匀分布卡片 */
}

.right-card {
    width: 250px;
    height: 150px;
    /* 每个卡片宽度为一半减去间距 */
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    text-align: center;
}

.right-card img {
    width: 100%;
    border-radius: 5px;
}

.right-card h3 {
    margin: 10px 0;
    color: #007bff;
}

.right-card p {
    color: #666;
}

//tab
.hotitem {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.demo-tabs {
    margin-top: 50px;
    padding: 0 30px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

::v-deep .el-tabs__item {
    font-size: 26px;
    font-weight: 700;
    padding: 20px 30px;

}

//无限滚动
.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.countainer {
    width: 1200px;
    background-color: #fff;

    .carousel-container {
        width: 100%;
        height: 300px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

//轮播图
.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>