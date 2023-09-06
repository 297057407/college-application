<script  setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import SchoolPanel from '@/components/SchoolPanel.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { useSchoolStore } from '@/stores/school.js'
import { useCollectStore } from '@/stores/collect.js'
import { useUserStore } from '@/stores/user.js'
import { ElLoading } from 'element-plus'
import "element-plus/theme-chalk/el-loading.css";
const schoolStore = useSchoolStore()
const collectStore = useCollectStore()
const userStore = useUserStore()
//搜索框
const search_name = ref('')
const selected = ref({
    level: '全部',
    location: '全部',
    tags: [],
    type: '全部'
})
//加载的组件
const loadEl = ref(null)
const curloadEl = ref(null)

//搜索确定按钮
const btndisabled = ref(false)
const searchBtn = () => {
    if (btndisabled.value) return
    btndisabled.value = true
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: curloadEl.value || loadEl.value
    })
    schoolStore.getSchoolByTags({ level: selected.value.level, location: selected.value.location, type: selected.value.type, tags: selected.value.tags.toString(), search_name: search_name.value, page: 1 })
    loading.close()
    btndisabled.value = false

}

//分页
const currentPage = ref(1)
// const currentPageData = computed(() => {
//     return schoolStore.allSchoolInfo.slice((10 * (currentPage.value - 1)), (10 * currentPage.value))
// })
//初始化
onMounted(async () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: loadEl.value
    })
    //获取分类信息
    if (JSON.stringify(schoolStore.categoryInfo) === '{}') await schoolStore.getCategory()
    //获取学校数据
    // if (JSON.stringify(schoolStore.allSchoolInfo) === '[]') await schoolStore.getSchoolInfo()
    await schoolStore.getSchoolByTags({ level: selected.value.level, location: selected.value.location, type: selected.value.type, tags: selected.value.tags.toString(), search_name: search_name.value, page: 1 })
    //获取收藏信息
    await collectStore.favoriteGet({ user_id: userStore.userInfo.user_id, item_type: 1 })
    loading.close()
})
//监听筛选选项变化
watch(selected, async () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: curloadEl.value || loadEl.value
    })
    await schoolStore.getSchoolByTags({ level: selected.value.level, location: selected.value.location, type: selected.value.type, tags: selected.value.tags.toString(), search_name: search_name.value, page: 1 })
    loading.close()
}, {
    deep: true,
})
//取消收藏按钮
const deleteCollectBtn = async (item_id) => {
    await collectStore.favoriteDelete({
        user_id: userStore.userInfo.user_id,
        item_id: item_id,
        item_type: 1
    })
    await collectStore.favoriteGet({ user_id: userStore.userInfo.user_id, item_type: 1 })
    ElMessage.success("取消收藏成功")

}
//添加收藏
const addCollectBtn = async (item_id) => {
    await collectStore.favoriteAdd({
        user_id: userStore.userInfo.user_id,
        item_id: item_id,
        item_type: 1
    })
    await collectStore.favoriteGet({ user_id: userStore.userInfo.user_id, item_type: 1 })
    ElMessage.success("添加收藏成功")
}
//分页器
const handleCurrentChange = async () => {
    // const loading = ElLoading.service({
    //     text: '玩命加载中...',
    //     target: loadEl.value
    // })
    await schoolStore.getSchoolByTags({ level: selected.value.level, location: selected.value.location, type: selected.value.type, tags: selected.value.tags.toString(), search_name: search_name.value, page: currentPage.value })
    // loading.close()
}
//以下代码保证右侧盒子在视口中央
onMounted(() => {
    window.addEventListener("scroll", centerChild);
})
onBeforeUnmount(() => {
    window.removeEventListener("scroll", centerChild);
    if (timer.value) {
        clearTimeout(timer.value);
    }
})
const timer = ref(null)
const parentContainer = ref(null)
const childContainer = ref(null)
const centerChild = () => {
    if(!showDetail.value) return
    if (!timer.value) {
        timer.value = setTimeout(() => {
            const parent = parentContainer.value.getBoundingClientRect().y
            childContainer.value.style.top = parent > 0 ? '140px' : `${-parent + 140}px`;
            timer.value = null
        }, 500);
    }
}

//点击学校名显示详情
const showDetail = ref(false)
const right = ref(null)
const clickname = async (name) => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: curloadEl.value
    })
    await schoolStore.getUniversityDetails({ name })
    loading.close()
    if (!showDetail.value) right.value.style.width = '800px'
    showDetail.value = true
}
const closeIntro = () => {
    right.value.style.width = '100%'
    showDetail.value = false
}
//学校简介
const zhankai = ref(false)
</script>
<template>
    <div class="searchSchool">
        <div class="left-box" ref="right">
            <el-tabs type="border-card" class="demo-tabs">
                <div class="search">
                    <i class="iconfont icon-icon-search"></i>
                    <el-input class="input" v-model="search_name" placeholder="根据校名搜大学" clearable />
                    <el-button type="primary" @click="searchBtn">搜索</el-button>
                </div>
                <br>
                <el-tab-pane class="border" label="院 校 大 全">
                    <div ref="loadEl">
                        <div class="institution-affiliation" style="width: 800px;">
                            <span>院校所属 > </span>
                            <div class="tag">
                                <el-radio-group v-model="selected.location" size="large">
                                    <el-radio-button label="全部" />
                                    <el-radio-button v-for="item in schoolStore.categoryInfo.location" :label="item"
                                        :key="item" />
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="institution-affiliation" style="width: 800px;">
                            <span>院校类型 > </span>
                            <div class="tag">
                                <el-radio-group v-model="selected.type" size="large">
                                    <el-radio-button label="全部" />
                                    <el-radio-button v-for="item in schoolStore.categoryInfo.type" :label="item"
                                        :key="item" />
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="institution-affiliation" style="width: 800px;">
                            <span>办学类型 > </span>
                            <div class="tag">
                                <el-radio-group v-model="selected.level" size="large">
                                    <el-radio-button label="全部" />
                                    <el-radio-button v-for="item in schoolStore.categoryInfo.level" :label="item"
                                        :key="item" />
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="institution-affiliation" style="width: 800px;">
                            <span>院校特色 > </span>
                            <div class="tag">
                                <el-checkbox-group v-model="selected.tags" size="large">
                                    <el-checkbox-button v-for="item in schoolStore.categoryInfo.tags" :key="item"
                                        :label="item">
                                        {{ item }}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div v-if="schoolStore.allSchoolInfo.length" ref="curloadEl">
                            <SchoolPanel @click-school-name="clickname" v-for="item in schoolStore.allSchoolInfo"
                                :key="item.id" :name="item.name" :location="item.location" :tags="item.tags.split('/')">
                                <template #btn>
                                    <el-button
                                        v-if="collectStore.collectSchool.findIndex(v => v.item_id === item.id) !== -1"
                                        type="primary" @click="deleteCollectBtn(item.id)">
                                        <span><i class="iconfont icon-shoucang6"></i>&nbsp;已收藏</span></el-button>
                                    <el-button v-else @click="addCollectBtn(item.id)"> <span><i
                                                class="iconfont icon-shoucang1"></i>&nbsp;收藏</span></el-button>
                                </template>
                            </SchoolPanel>
                            <div class="demo-pagination-block">
                                <el-pagination v-model:current-page="currentPage" layout="prev, pager, next, jumper"
                                    :total="schoolStore.allSchoolInfo.total_results / 2" @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange">
                                </el-pagination>
                            </div>
                        </div>
                        <!-- 空标签 -->
                        <el-empty description="啥也没搜到~" v-else />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="right-box" ref="parentContainer">
            <div class="child-box" ref="childContainer">
                <el-button type="info" @click="closeIntro">关闭简介</el-button>
                <div style="text-align: center;">
                    <img style="width: 100px;height: 100px;border-radius: 50%;"
                        v-lazy="`https://p7571184p7.zicp.fun/img/picture/${schoolStore.schoolDetail.name}.jpeg` || ''"
                        alt="">
                </div>
                <h1 style="text-align: center;margin: 10px 0;">{{ schoolStore.schoolDetail.name }}</h1>
                <p class="schoolIntro">
                    学校简介: {{ schoolStore.schoolDetail.introduction?.substr(0, 65) + '...' }}
                    <a href="javascript:void(0)" @click="zhankai = !zhankai" style="color:#409eff">查看详情</a>


                    <el-drawer v-model="zhankai" title="学校简介" :with-header="false" direction="ltr">
                        <span>{{ schoolStore.schoolDetail.introduction || '' }}</span>
                    </el-drawer>

                </p>
                <div class="tags">
                    <div v-if="schoolStore.schoolDetail.qs_ranking" class="tagsDetail"><span>{{
                        schoolStore.schoolDetail.qs_ranking }}</span><span>软科综合</span></div>
                    <div v-if="schoolStore.schoolDetail.alumni" class="tagsDetail"><span>{{ schoolStore.schoolDetail.alumni
                    }}</span><span>校友会综合</span></div>
                    <div v-if="schoolStore.schoolDetail.us_world_ranking" class="tagsDetail"><span>{{
                        schoolStore.schoolDetail.us_world_ranking }}</span><span>US世界</span></div>
                    <div v-if="schoolStore.schoolDetail.qs_world_ranking" class="tagsDetail"><span>{{
                        schoolStore.schoolDetail.qs_world_ranking }}</span><span>QS世界</span></div>
                    <div v-if="schoolStore.schoolDetail.times_higher_ranking" class="tagsDetail"><span>{{
                        schoolStore.schoolDetail.times_higher_ranking }}</span><span>泰晤士</span></div>
                </div>

                <div class="address">
                    <span> <i class="iconfont icon-dizhi"></i> 地址: {{ schoolStore.schoolDetail.address }}</span>
                    <span> <i class="iconfont icon-shouye1"></i> 电话: {{ schoolStore.schoolDetail.phone }}</span>
                    <span> <i class="iconfont icon-youxiang"></i> 邮箱: {{ schoolStore.schoolDetail.email }}</span>
                    <span> <i class="iconfont icon-wangzhi"></i> 网址1: {{ schoolStore.schoolDetail.website1 }}</span>
                    <span> <i class="iconfont icon-wangzhi"></i> 网址2: {{ schoolStore.schoolDetail.website2 }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped  lang="scss">
::v-deep .el-popconfirm__action {
    display: none;
}

//院校大全文字右侧颜色
::v-deep .el-tabs--border-card>.el-tabs__header {
    background-color: #fff;
}

//分页样式
::v-deep .demo-pagination-block {
    margin: 30px 150px;
    margin-right: 0;
}

//院校特色复选框格式
::v-deep .el-checkbox-button__inner {
    border: none;
    margin: 5px;
}

::v-deep .el-checkbox-button--large .el-checkbox-button__inner {
    padding: 6px 5px 7px 5px;
}

::v-deep .el-checkbox-button:first-child .el-checkbox-button__inner {
    border: none;
}


//整个盒子分左右
.searchSchool {
    display: flex;
}

// 搜索框样式
.search {
    height: 50px;
    position: relative;
    line-height: 50px;

    .icon-icon-search {
        font-size: 20px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .input {
        width: 280px;
        padding-left: -10px;
        color: #666;
        margin-right: 10px;
    }
}

//左边盒子
.left-box {
    // width: 800px;
    width: 100%;
    transition: all .5s;
}

// 右边盒子
.right-box {
    flex: 1;
    position: relative;
    width: 370px;
    margin-left: 30px;
    height: 2500px;

    .child-box {
        overflow: hidden;
        position: absolute;
        top: 200px;
        width: 100%;
        height: 700px;
        transition: all .5s;
        .address {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding-left: 60px;

            span {
                margin-bottom: 15px;
            }
        }

        .schoolIntro {
            padding: 20px 50px;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            padding: 0 60px;
            margin-bottom: 20px;

            .tagsDetail {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                width: 60px;
                height: 60px;
                margin: 10px;
                border-radius: 10px;
                font-size: 14px;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
}

//筛选条件样式
.institution-affiliation {
    display: flex;
    margin-bottom: 20px;

    span {
        padding-top: 8px;
    }

    .tag {
        flex: 1;
    }
}

::v-deep .el-radio-button--large .el-radio-button__inner {
    padding: 6px 5px 7px 5px;
    margin: 5px;
    border: 0;
}

::v-deep .el-radio-button__original-radio:checked+.el-radio-button__inner {
    background-color: #fff;
    color: var(--el-color-primary);
    box-shadow: none;
}

::v-deep .el-checkbox-button {
    --el-checkbox-button-checked-bg-color: var(--el-color-white);
    --el-checkbox-button-checked-text-color: var(--el-color-primary);
}

::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
    box-shadow: none;
}


// 大盒子边框
::v-deep .el-tabs--border-card {
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color);
    border-left: 0;
    border-right: 0;
}




//院校大全四个字样式
::v-deep .el-tabs__item {
    padding: 32px;
    color: #6b778c;
    font-size: 24px;
    font-weight: 700;
}
</style>
  
