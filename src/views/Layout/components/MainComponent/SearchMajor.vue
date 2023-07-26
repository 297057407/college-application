<script  setup>
import { ref, onMounted, watch } from 'vue'
import MajorPanel from '@/components/MajorPanel.vue'

import { useMajorStore } from '@/stores/major.js'

const majorStore = useMajorStore()
//搜索框
const search = ref('')
const selected = ref({
    major_level: '本科',
    major_category: '全部',
    major_class: '全部'
})
//分页
const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
//条件展示选项
const rankRadio = ref('默认排序')
//薪酬排序选项 0 升序 1 降序
const sortWay = ref("1")
const sortWayPeople = ref("1")


onMounted(async () => {
    //获取筛选数据
    await majorStore.getCategoryInfo()
    //获取专业数据
    await majorStore.getMajorInfo()
    //获取薪酬排序后的专业数据
    await majorStore.getSortBySalary(({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWay.value }))
    //获取人气排序后的专业数据
    await majorStore.getSortByPeople(({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWayPeople.value }))
    searchBtn()
})



// 搜索按钮
const searchBtn = async () => {
    if (rankRadio.value === '默认排序')
        await majorStore.getSearchInfo(search.value)
    else if (rankRadio.value === '人气排序') console.log('人气排序')
    // else if (rankRadio.value === '薪酬排序') majorStore.getSortBySalary({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWay.value })

}

//监听排序单选按钮变化
watch(sortWay, async () => {
    await majorStore.getSortBySalary(({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWay.value }))
})
watch(sortWayPeople, async () => {
    await majorStore.getSortByPeople(({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWayPeople.value }))
})
// 监听筛选选项变化
watch(selected, async () => {
    search.value = ""
    if (rankRadio.value === '默认排序')
        await majorStore.getSearchInfoByTags({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class })
    else if (rankRadio.value === '人气排序') await majorStore.getSortByPeople(({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWayPeople.value }))
    else if (rankRadio.value === '薪酬排序') await majorStore.getSortBySalary({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWay.value })

}, {
    deep: true,
})

</script>
<template>
    <div class="searchSchool">
        <div class="left-box">

            <div class="search">
                <i class="iconfont icon-icon-search"></i>
                <el-input class="input" v-model="search" placeholder="根据名称搜专业" clearable />
                <el-button type="primary" @click="searchBtn">搜索</el-button>
            </div>
            <br><br>
            <!-- 筛选列表 -->
            <div class="institution-affiliation">
                <span>专业层次 > </span>
                <div class="tag">
                    <el-radio-group v-model="selected.major_level" size="large">
                        <el-radio-button v-for="item in majorStore.categoryInfo.major_level" :label="item" :key="item" />
                    </el-radio-group>
                </div>
            </div>
            <div class="institution-affiliation">
                <span>专业门类 > </span>
                <div class="tag">
                    <el-radio-group v-model="selected.major_category" size="large">
                        <el-radio-button label="全部" />
                        <el-radio-button v-for="item in majorStore.categoryInfo.major_category" :label="item" :key="item" />
                    </el-radio-group>
                </div>
            </div>
            <div class="institution-affiliation" v-show="selected.major_category !== '全部'">
                <span>专业大类 > </span>
                <div class="tag">
                    <el-radio-group v-model="selected.major_class" size="large">
                        <el-radio-button label="全部" />
                        <el-radio-button v-for="item in majorStore.categoryInfo.major_class?.[selected.major_category]"
                            :label="item" :key="item" />
                    </el-radio-group>
                </div>
            </div>
            <!-- 排序选项 -->
            <el-radio-group v-model="rankRadio">
                <el-radio label="默认排序" size="large" border></el-radio>
                <el-radio label="人气排序" size="large" border></el-radio>
                <el-radio label="薪酬排序" size="large" border></el-radio>
            </el-radio-group>
            <!-- 内容显示 默认排序 -->
            <div class="demo-collapse" v-if="rankRadio === '默认排序'">
                <el-collapse>
                    <el-collapse-item
                        v-for="(value, index) in majorStore.searchInfo.major_categories?.slice((5 * (currentPage1 - 1)), (5 * currentPage1))"
                        :title="value.category_name" :key="index">
                        <div v-for="(item, index) in value.major_classes" :key="index">
                            <h2 style="color: lightgreen;">{{ item.class_name }}</h2>
                            <MajorPanel v-for="(v, i) in item.majors" :key="i" :item="v">
                            </MajorPanel>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="currentPage1" :small="small" :disabled="disabled"
                        :background="background" layout="prev, pager, next, jumper"
                        :total="majorStore.searchInfo.major_categories?.length" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :default-page-size="5" />
                </div>
            </div>
            <!-- 内容显示 人气排序 -->
            <div v-if="rankRadio === '人气排序'">
                <div style="margin: 10px 20px;float: right;">
                    <el-radio-group v-model="sortWayPeople" size="small">
                        <el-radio label="1" border>从高到低</el-radio>
                        <el-radio label="0" border>从低到高</el-radio>
                    </el-radio-group>
                </div>
                <MajorPanel
                    v-for="(v, i) in majorStore.peopleSortInfo.slice((10 * (currentPage2 - 1)), (10 * currentPage2))"
                    :key="i" :item="v">
                    <template #people>
                        <span class="salary"> <i class="iconfont icon-renqiredu"></i> 人气值 : <i> {{ v.popularity
                        }}</i></span>
                    </template>
                </MajorPanel>
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="currentPage2" :small="small" :disabled="disabled"
                        :background="background" layout="prev, pager, next, jumper"
                        :total="majorStore.peopleSortInfo.length" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :default-page-size="10" />
                </div>
            </div>
            <!-- 内容显示 薪酬排序 -->
            <div v-if="rankRadio === '薪酬排序'">
                <div style="margin: 10px 20px;float: right;">
                    <el-radio-group v-model="sortWay" size="small">
                        <el-radio label="1" border>从高到低</el-radio>
                        <el-radio label="0" border>从低到高</el-radio>
                    </el-radio-group>
                </div>
                <MajorPanel
                    v-for="(v, i) in majorStore.salarySortInfo.slice((10 * (currentPage3 - 1)), (10 * currentPage3))"
                    :key="i" :item="v">
                </MajorPanel>
                <div class="demo-pagination-block">
                    <el-pagination v-model:current-page="currentPage3" :small="small" :disabled="disabled"
                        :background="background" layout="prev, pager, next, jumper"
                        :total="majorStore.salarySortInfo.length" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :default-page-size="10" />
                </div>
            </div>
        </div>
        <div class="right-box"><br><br><br>
            <h1>右 <br> 边</h1>
        </div>
    </div>
</template>
<style scoped  lang="scss">
.salary {
    margin-left: 20px;
    color: red;
}

::v-deep .el-collapse-item__header {
    font-size: 24px;
    font-weight: 700;
}

.demo-collapse {
    margin-top: 30px;
}

.searchSchool {
    background-color: #fff;
    padding: 15px;
}

.demo-pagination-block {
    margin: 30px 150px;
    margin-right: 0;
}


.searchSchool {
    display: flex;
    margin-top: 20px;
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
}</style>
  