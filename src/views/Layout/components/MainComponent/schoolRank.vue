<script setup>
import { ref, onMounted, watch } from 'vue'
// import { useRouter } from "vue-router"
import { useSchoolStore } from '@/stores/school.js'
import { utils, writeFile } from "xlsx";
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { ElLoading } from 'element-plus'
import "element-plus/theme-chalk/el-loading.css";
const schoolStore = useSchoolStore()
// const router = useRouter()

//左侧导航
const li_active = ref(0)

//当前页数
const page = ref(1)

const value = ref({
    "type": "",
    "location": "",
    "level": "",
    "tags": [],
})


// 跳转到学校详情页面
// const jumpToDetail = (id) => {
//     // router.push({ path: `/schooldetail/${id}` })
// }

const loadEl = ref(null)
onMounted(async () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: loadEl.value
    })
    //获取分类信息
    await schoolStore.getCategory()
    // 获取学校数据
    await schoolStore.getSortedInfo(value.value, page.value)
    loading.close()
})


watch(value, async () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: loadEl.value
    })
    page.value = 1
    // 获取学校数据
    await schoolStore.getSortedInfo(value.value, 1)
    loading.close()
}, { deep: true });


//点击左侧导航
const leftNav = (i, v) => {
    li_active.value = i
    value.value.type = v
}

//分页器
const handleCurrentChange = async () => {
    // const loading = ElLoading.service({
    //     text: '玩命加载中...',
    //     target: loadEl.value
    // })
    await schoolStore.getSortedInfo(value.value, page.value)
    // loading.close()
}

//下载排行榜
const downloadInfo = async () => {
    ElMessage('已开始下载，请耐心等待...')
    await schoolStore.downloadRanking(value.value)
    let arr = schoolStore.downloadInfo.map((item, index) => {
        return {
            排名: index + 1,
            院校名称: item.name,
            院校所属: item.location,
            办学类型: item.level,
            院校类型: item.type,
            报考热度: item.popularity,
            综合指数: item.composite_index
        }
    })
    let sheet = utils.json_to_sheet(arr)
    let book = utils.book_new()
    utils.book_append_sheet(book, sheet, "排行榜")
    await writeFile(book, `rank${new Date().getTime()}.xls`)
    ElMessage({
        message: '下载完成，请前往下载内容中查看。',
        type: 'success',
    })
}
//重置筛选条件
const reset = async () => {
    value.value = {
        "type": "",
        "location": "",
        "level": "",
        "tags": [],
    }
    page.value = 1
    li_active.value = 0
    // 重新获取学校数据
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: loadEl.value
    })
    await schoolStore.getSortedInfo(value.value, page.value)
    loading.close()
}
</script>
<template>
    <div class="countainer">
        <div class="left-box">
            <h1>排行榜单</h1>
            <ul>
                <li v-for="(v, i) in schoolStore.categoryInfo.type" @click="leftNav(i, v)"
                    :class="{ 'li_active': i === li_active }" :key="i">中国大学{{ v }}排行榜
                </li>
            </ul>
        </div>
        <div class="right-box">
            <!-- <div class="search">
                <el-input v-model="input" placeholder="请输入关键词搜索" /><el-button type="primary" size="large">搜索</el-button>
            </div> -->
            <div class="download">

                <a href="#"><i class="iconfont icon-daochu" @click.prevent="downloadInfo"> 导出当前排行榜</i></a>
                <a href="#"><i class="iconfont icon-reset" @click.prevent="reset"> 重置筛选</i></a>
            </div>
            <ul class="screen">
                <li>排名</li>
                <li style="margin: 0 40px 0 35px;">院校名称/院校特色 <i class="iconfont icon-xiala"></i>
                    <el-select v-model="value.tags" class="m-2 select-style" placeholder="Select" size="small" multiple
                        collapse-tags="true">
                        <!-- <el-option v-for="(v, i) in schoolStore.categoryInfo.tags" :key="i" :label="v" :value="v" /> -->
                        <el-option label="985" value="985" />
                        <el-option label="211" value="211" />
                        <el-option label="国重点" value="国重点" />
                        <el-option label="省属" value="省属" />
                        <el-option label="省重点" value="省重点" />
                        <el-option label="保研" value="保研" />
                        <el-option label="双一流" value="双一流" />
                    </el-select>
                </li>
                <li>院校所属 <i class="iconfont icon-xiala"></i>
                    <el-select v-model="value.location" text class="m-2 select-style" placeholder="Select" size="small">
                        <el-option v-for="(v, i) in schoolStore.categoryInfo.location" :key="i" :label="v" :value="v" />
                    </el-select>
                </li>
                <!-- <li>院校类型 <i class="iconfont icon-xiala"></i>
                    <el-select v-model="value" text class="m-2 select-style" placeholder="Select" size="small">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </li> -->
                <li>办学类型 <i class="iconfont icon-xiala"></i>
                    <el-select v-model="value.level" text class="m-2 select-style" placeholder="Select" size="small">
                        <el-option v-for="(v, i) in schoolStore.categoryInfo.level" :key="i" :label="v" :value="v" />
                    </el-select>
                </li>
                <li>院校类型</li>
                <li>报考热度</li>
                <li>综合指数</li>
            </ul>

            <ul class="schoolinfo" ref="loadEl">
                <li v-for="(v, i) in schoolStore.schoolRankInfo.message" :key="i" @click="jumpToDetail(i)">
                    <div class="base-info rank"
                        :class="{ 'rankone': i + 1 + 20 * (page - 1) === 1, 'ranktwo': i + 1 + 20 * (page - 1) === 2, 'rankthree': i + 1 + 20 * (page - 1) === 3 }">
                        {{ i + 1 + 20 * (page - 1) }}</div>
                    <div class="base-info flex-box">
                        <img style="width: 60px;
                        height: 60px;
                      border-radius: 50%;" v-lazy="`https://p7571184p7.zicp.fun/img/picture/${v.name}.jpeg`|| ''" alt="">
                        <div class="right">
                            <div class="right-info schoolname">{{ v.name }}</div>
                            <div class="right-info nature">{{ v.is_public }}</div>
                            <div class="right-info tags"><span>{{ v.tags }}</span></div>
                        </div>
                    </div>
                    <div class="base-info">{{ v.location }}</div>
                    <div class="base-info">{{ v.level }}</div>
                    <div class="base-info">{{ v.type }}</div>
                    <div class="base-info">{{ v.popularity }}</div>
                    <div class="base-info">{{ v.composite_index }}</div>
                </li>
            </ul>
            <div class="demo-pagination-block">
                <el-pagination v-model:current-page="page" :page-size="20" :small="small" hide-on-single-page="true"
                    layout="total, prev, pager, next, jumper" :total="schoolStore.schoolRankInfo.total_results"
                    @current-change="handleCurrentChange" />
            </div>
            <!-- 空标签 -->
            <el-empty description="啥也没搜到~" v-show="schoolStore.schoolRankInfo.message?.length === 0" />
        </div>
    </div>
</template>
<style scoped lang="scss">
//下载排行榜
.download {
    display: flex;
    height: 20px;
    margin-bottom: 20px;
    justify-content: end;

    // background-color:pink;
    a {
        margin-right: 15px;
        color: #007bff;

        i {
            font-size: 14px;
        }
    }

}

//分页器
::v-deep .demo-pagination-block {
    margin: 30px 150px;
    margin-right: 0;
}

.schoolinfo {
    li {
        transition: all .5s;
        // background-color: pink;
        height: 80px;
        padding: 10px;
        border-bottom: 1px dotted #c3c2c2;
        display: flex;

        .base-info {
            height: 60px;
            line-height: 60px;
            text-align: center;

            .right-info {
                height: 22px;
                width: auto;
                line-height: 1;
            }

        }

        .flex-box {
            text-align: left;
            display: flex;

            .right {
                width: 160px;
                margin-left: 10px;
            }


            .schoolname {
                font-weight: 500;
                font-style: normal;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.8);
                max-width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .tags {
                font-weight: 400;
                font-style: normal;
                font-size: 12px;
                width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .nature {
                font-weight: 400;
                font-style: normal;
                font-size: 12px;
                color: #999999;
                max-width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

        }

        .base-info:first-child {
            width: 80px;
        }

        .base-info:nth-child(2) {
            width: 230px;
        }

        .base-info:nth-child(3) {
            width: 100px;
        }

        .base-info:nth-child(4) {
            width: 150px;
        }

        .base-info:nth-child(5) {
            width: 90px;
        }

        .base-info:nth-child(6) {
            width: 130px;
        }

        .base-info:nth-child(7) {
            width: 90px;
        }
    }

    li:hover {
        background-color: rgb(245, 247, 250);
    }

    li .rank {
        font-size: 28px;
        color: rgb(153, 153, 153);
    }

    li .rankone {
        font-size: 34px;
        color: rgb(255, 51, 51);
    }

    li .ranktwo {
        font-size: 32px;
        color: rgb(255, 153, 0);
    }

    li .rankthree {
        font-size: 30px;
        color: rgb(255, 204, 0);
    }

}

.countainer {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    padding: 20px;

    .left-box {
        width: 190px;
        margin-right: 20px;
        // border: 1px solid black;
        padding: 30px 0px;
        background-color: rgb(247, 247, 247);
        border-radius: 10px;

        ul {
            li {
                height: 60px;
                line-height: 60px;
                text-align: center;
                // border-bottom: 1px solid black;
                transition: all .5s;
            }

            .li_active {
                color: rgb(75, 144, 247);
                font-weight: 700;
            }

            li:hover {
                background-color: rgb(238, 241, 247);
                color: rgb(75, 144, 247);
            }
        }
    }

    .right-box {
        flex: 1;
        // border: 1px solid black;
        padding: 30px;
        padding-top: 0;

        .screen {
            background-color: rgb(246, 249, 255);
            display: flex;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;

            li {
                .icon-xiala {
                    color: #666;
                    font-size: 10px;
                }

                position: relative;
                height: 50px;
                line-height: 50px;
                font-size: 12px;
                padding: 0 20px;
                margin: 0 10px;

                .select-style {
                    position: absolute;
                    left: 0;
                    top: 14px;
                    opacity: 0;
                }
            }


            ::v-deep .el-input {
                width: 150px;
            }
        }
    }

    h1 {
        text-align: center;
    }



    ::v-deep .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-right: -3px;
    }

    .search {
        padding-bottom: 30px;
        padding-left: 200px;
        display: flex;
    }

}
</style>