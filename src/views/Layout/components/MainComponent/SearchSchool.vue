<script  setup>
import { ref, onMounted, watch, computed } from 'vue'
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

const loadEl = ref(null)
const curloadEl = ref(null)
onMounted(async () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: loadEl.value
    })
    //获取分类信息
    await schoolStore.getCategory()
    //获取学校数据
    await schoolStore.getSchoolInfo()
    //获取收藏信息
    await collectStore.favoriteGet({ user_id: userStore.userInfo.user_id, item_type: 1 })
    loading.close()
})


//搜索按钮
const btndisabled = ref(false)
const searchBtn = () => {
    if(btndisabled.value) return 
    btndisabled.value = true
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: curloadEl.value || loadEl.value
    })
    schoolStore.getSchoolByTags({ level: selected.value.level, location: selected.value.location, type: selected.value.type, tags: selected.value.tags.toString(), search_name: search_name.value })
    loading.close()
    btndisabled.value = false

}

//监听筛选选项变化
watch(selected, () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: curloadEl.value || loadEl.value
    })
    schoolStore.getSchoolByTags({ level: selected.value.level, location: selected.value.location, type: selected.value.type, tags: selected.value.tags.toString(), search_name: search_name.value })
    loading.close()

}, {
    deep: true,
})

//分页
const currentPage = ref(1)

const currentPageData = computed(() => {
    return schoolStore.allSchoolInfo.slice((10 * (currentPage.value - 1)), (10 * currentPage.value))
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
</script>
<template>
    <div class="searchSchool">
        <div class="left-box">
            <el-tabs type="border-card" class="demo-tabs">
                <div class="search">
                    <i class="iconfont icon-icon-search"></i>
                    <el-input class="input" v-model="search_name" placeholder="根据校名搜大学" clearable />
                    <el-button type="primary" @click="searchBtn">搜索</el-button>
                </div>
                <br>
                <el-tab-pane class="border" label="院校大全" >
                    <div ref="loadEl">
                        <div class="institution-affiliation">
                        <span>院校所属 > </span>
                        <div class="tag">
                            <el-radio-group v-model="selected.location" size="large">
                                <el-radio-button label="全部" />
                                <el-radio-button v-for="item in schoolStore.categoryInfo.location" :label="item"
                                    :key="item" />
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="institution-affiliation">
                        <span>院校类型 > </span>
                        <div class="tag">
                            <el-radio-group v-model="selected.type" size="large">
                                <el-radio-button label="全部" />
                                <el-radio-button v-for="item in schoolStore.categoryInfo.type" :label="item" :key="item" />
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="institution-affiliation">
                        <span>办学类型 > </span>
                        <div class="tag">
                            <el-radio-group v-model="selected.level" size="large">
                                <el-radio-button label="全部" />
                                <el-radio-button v-for="item in schoolStore.categoryInfo.level" :label="item" :key="item" />
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="institution-affiliation">
                        <span>院校特色 > </span>
                        <div class="tag">
                            <el-checkbox-group v-model="selected.tags" size="large">
                                <el-checkbox-button v-for="item in schoolStore.categoryInfo.tags" :key="item" :label="item">
                                    {{ item }}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div v-if="currentPageData.length" ref="curloadEl">
                        <SchoolPanel class="infinite-list-item" v-for="item in currentPageData" :key="item.id"
                            :name="item.name" :location="item.location" :tags="item.tags.split('/')">
                            <template #btn>
                                <el-button v-if="collectStore.collectSchool.findIndex(v => v.item_id === item.id) !== -1"
                                    type="primary" @click="deleteCollectBtn(item.id)">
                                    <span><i class="iconfont icon-shoucang6"></i>&nbsp;已收藏</span></el-button>
                                <el-button v-else @click="addCollectBtn(item.id)"> <span><i
                                            class="iconfont icon-shoucang1"></i>&nbsp;收藏</span></el-button>
                            </template>
                        </SchoolPanel>
                        <div class="demo-pagination-block">
                            <el-pagination v-model:current-page="currentPage" layout="prev, pager, next, jumper"
                                :total="schoolStore.allSchoolInfo.length" @size-change="handleSizeChange"
                                @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- 空标签 -->
                    <el-empty description="啥也没搜到~" v-else />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="大学分数线">大学分数线</el-tab-pane>
            </el-tabs>
        </div>
        <div class="right-box"><br><br><br>
            <h1>右 <br> 边</h1>
        </div>
    </div>
</template>
<style scoped  lang="scss">
::v-deep .el-tabs--border-card>.el-tabs__header {
    background-color: #fff;
}

::v-deep .demo-pagination-block {
    margin: 30px 150px;
    margin-right: 0;
}

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

::v-deep .el-check-tag:hover {
    background-color: #fff;
}

.searchSchool {
    display: flex;
}

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

.left-box {
    width: 800px;
}

.right-box {
    width: 370px;
    margin-left: 30px;
}

.institution-affiliation {
    display: flex;
    // align-items: center;
    margin-bottom: 20px;

    span {
        padding-top: 8px;
    }

    .tag {
        flex: 1;
    }
}

::v-deep .demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

::v-deep .demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
}

::v-deep .el-tabs--border-card {
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color);
    border-left: 0;
    border-right: 0;
}

::v-deep .el-radio-button--large .el-radio-button__inner {
    padding: 6px 5px 7px 5px;
    margin: 5px;
    border: 0;
}

::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border-left: none;
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

::v-deep .el-tabs__item {
    padding: 32px;
    color: #6b778c;
    font-size: 24px;
    font-weight: 500;
}
</style>
  
