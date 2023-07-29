<script setup>
import { ref } from 'vue'
import HotItem from '@/components/HotItem.vue';


const imgArr = ["src/assets/images/1.jpg", "src/assets/images/c2.jpg", "src/assets/images/c3.jpg", "src/assets/images/c4.jpg"]


// const activeName = ref('first')
// const handleClick = (tab, event) => {
//     console.log(tab, event)
// }

const count = ref(0)
const load = () => {
    count.value += 2
}
</script>
<template>
    <!-- <div class="countainer">
        轮播图
        <div class="carousel-container">
            <el-carousel indicator-position="outside" height="300px" :interval="3000" type="card">
                <el-carousel-item v-for="(img, index) in imgArr" :key="index">
                    <img :src="img" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        热门
        <ul class="hotitem infinite-list" v-infinite-scroll="load" style="overflow: auto">
            <HotItem v-for="item in count" :key="item" class="infinite-list-item"></HotItem>
        </ul>
        <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="热门院校" name="first">
               
            </el-tab-pane>
            <el-tab-pane label="热门专业" name="second">热门专业</el-tab-pane>
        </el-tabs>
    </div> -->

    <div class="hot-top">
        <h2>热门院校</h2> <a href="#" class="fresh"><i class="iconfont icon-huanyipi"></i> 换一批</a>
    </div>
    <section>
        <div class="left-card">
            <RouterLink to="/" class="item">
                <img src="src/assets/images/140.jpg" alt="" />
                <p class="name ellipsis">清华大学</p>
                <p class="desc ellipsis">好学校</p>
            </RouterLink>
        </div>
        <div class="right-cards">
            <div class="right-card">
                <HotItem></HotItem>
            </div>
            <div class="right-card">
                <HotItem></HotItem>
            </div>
            <div class="right-card">
                <HotItem></HotItem>
            </div>
            <div class="right-card">
                <HotItem></HotItem>
            </div>
            <div class="right-card">
                <HotItem></HotItem>
            </div>
            <div class="right-card">
                <HotItem></HotItem>
            </div>

            <!-- 可以添加更多次热门院校的卡片 -->
        </div>
    </section>
    <div class="hot-top">
        <h2>高考资讯</h2> <a href="#" class="fresh"><i class="iconfont icon-huanyipi"></i> 换一批</a>
    </div>
    <section>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </section>
</template>
<style scoped lang="scss">
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

.left-card {
    flex: 1;
    /* 左边占用一定比例的空间 */
    background-color: #fff;
    border-radius: 5px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    .item {
        background-color: pink;
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
}</style>