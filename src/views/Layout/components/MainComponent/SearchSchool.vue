<script  setup>
import { ref, onMounted, watch } from 'vue'
import SchoolPanel from '@/components/SchoolPanel.vue'
import { useSchoolStore } from '@/stores/school.js'
const schoolStore = useSchoolStore()
//搜索框
const search = ref('')
const selected = ref({
    level: '全部',
    location: '全部',
    tags: [],
    type: '全部'
})


onMounted(async () => {
    await schoolStore.getCategory()
    //获取学校数据
    await schoolStore.getSchoolInfo()
    searchBtn()
})


//搜索按钮
const searchBtn = () => {
    schoolStore.getSearchInfo(search.value)
}

//监听筛选选项变化
watch(selected, () => {
    search.value = ""
    schoolStore.getSchoolByTags({ level: selected.value.level, location: selected.value.location, type: selected.value.type, tags: selected.value.tags.toString() })
}, {
    deep: true,
})
// const newSchoolInfo = computed(() => {
//     if (search.value.trim() === '') {
//         return schoolStore.allSchoolInfo
//     }
//     else {
//         return schoolStore.allSchoolInfo.filter((item) => item.name.includes(search.value.trim())  ) || []
//     }
// })

//分页
const currentPage = ref(1)


</script>
<template>
    <div class="searchSchool">
        <div class="left-box">
            <el-tabs type="border-card" class="demo-tabs">
                <div class="search">
                    <i class="iconfont icon-icon-search"></i>
                    <el-input class="input" v-model="search" placeholder="根据校名搜大学" clearable />
                    <el-button type="primary" @click="searchBtn">搜索</el-button>
                </div>
                <br>
                <el-tab-pane class="border" label="院校大全">
                    <div class="institution-affiliation">
                        <span>院校所属 > </span>
                        <div class="tag">
                            <el-radio-group v-model="selected.location" size="large">
                                <el-radio-button label="全部" />
                                <el-radio-button v-for="item in schoolStore.categoryInfo.location" :label="item" :key="item" />
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
                    <div>
                        <SchoolPanel class="infinite-list-item"
                            v-for="item in schoolStore.searchInfo.slice((10 * (currentPage - 1)), (10 * currentPage))"
                            :key="item.id" :name="item.name" :location="item.location" :tags="item.tags.split(',')">
                        </SchoolPanel>
                        <div class="demo-pagination-block">
                            <el-pagination v-model:current-page="currentPage" layout="prev, pager, next, jumper"
                                :total="schoolStore.searchInfo.length" @size-change="handleSizeChange"
                                @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
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
    margin-top: 20px;
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
  