<script  setup>
import { ref, onMounted, watch, computed } from 'vue'
import MajorPanel from '@/components/MajorPanel.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { useMajorStore } from '@/stores/major.js'
import { useCollectStore } from '@/stores/collect.js'
import { useUserStore } from '@/stores/user.js'
import { ElLoading } from 'element-plus'
import "element-plus/theme-chalk/el-loading.css";
const collectStore = useCollectStore()
const userStore = useUserStore()
const majorStore = useMajorStore()
//搜索框
const search_name = ref('')
const selected = ref({
    major_level: '本科',
    major_category: '全部',
    major_class: '全部',
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

//请求最新数据
const sendRequest = async () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: loadoneEl.value
    })
    if (rankRadio.value === '默认排序') await majorStore.getSearchInfoByTags({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, 'search_name': search_name.value })
    else if (rankRadio.value === '人气排序') await majorStore.getSortByPeople(({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWayPeople.value, 'search_name': search_name.value }))
    else if (rankRadio.value === '薪酬排序') await majorStore.getSortBySalary({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWay.value, 'search_name': search_name.value })
    loading.close()
}
const loadEl = ref(null)
const loadoneEl = ref(null)

onMounted(async () => {
    const loading = ElLoading.service({
        text: '玩命加载中...',
        target: loadEl.value
    })
    //获取筛选数据 
    if(JSON.stringify(majorStore.categoryInfo) === '{}') await majorStore.getCategoryInfo()
    //获取默认排序的专业数据
    await majorStore.getSearchInfoByTags({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, 'search_name': search_name.value })
    //获取收藏信息
    await collectStore.favoriteGet({ user_id: userStore.userInfo.user_id, item_type: 0 })
    loading.close()
})

// 搜索按钮
const btndisabled = ref(false)
const searchBtn = async () => {
    if (btndisabled.value) return
    btndisabled.value = true
    await sendRequest()
    btndisabled.value = false
}
//监听排序方式的变化
watch(rankRadio, async () => {
    await sendRequest()
})
//监听排序单选按钮变化
watch(sortWay, async () => {
    await majorStore.getSortBySalary({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWay.value, 'search_name': search_name.value })
})
watch(sortWayPeople, async () => {
    await majorStore.getSortByPeople({ "major_level": selected.value.major_level, "major_category": selected.value.major_category === '全部' ? '' : selected.value.major_category, "major_class": selected.value.major_class === '全部' ? '' : selected.value.major_class, "sort": sortWayPeople.value, 'search_name': search_name.value })
})
// 监听筛选选项变化
watch(selected, async () => {
    await sendRequest()
}, {
    deep: true,
})

//默认排序的数据
const defaultDate = computed(() => {
    return majorStore.searchInfo.major_categories?.slice((5 * (currentPage1.value - 1)), (5 * currentPage1.value)) || []
})
//人气排序的数据
const peopleDate = computed(() => {
    if (Object.keys(majorStore.peopleSortInfo).length === 0) return []
    return majorStore.peopleSortInfo.slice((10 * (currentPage2.value - 1)), (10 * currentPage2.value))
})
//薪酬排序的数据
const salaryDate = computed(() => {
    if (Object.keys(majorStore.salarySortInfo).length === 0) return []
    return majorStore.salarySortInfo.slice((10 * (currentPage3.value - 1)), (10 * currentPage3.value))
})

//取消收藏按钮
const deleteCollectBtn = async (item_id) => {
    await collectStore.favoriteDelete({
        user_id: userStore.userInfo.user_id,
        item_id: item_id,
        item_type: 0
    })
    await collectStore.favoriteGet({ user_id: userStore.userInfo.user_id, item_type: 0 })
    ElMessage.success("取消收藏成功")

}
//添加收藏
const addCollectBtn = async (item_id) => {
    await collectStore.favoriteAdd({
        user_id: userStore.userInfo.user_id,
        item_id: item_id,
        item_type: 0
    })
    await collectStore.favoriteGet({ user_id: userStore.userInfo.user_id, item_type: 0 })
    ElMessage.success("添加收藏成功")
}
</script>
<template>
    <div class="searchMajor">
        <div class="left-box">
            <div class="search">
                <i class="iconfont icon-icon-search"></i>
                <el-input class="input" v-model="search_name" placeholder="根据名称搜专业" clearable />
                <el-button type="primary" @click="searchBtn">搜索</el-button>
            </div>
            <br><br>
            <div ref="loadEl">
                <!-- 筛选列表 -->
                <div class="institution-affiliation">
                    <span>专业层次 > </span>
                    <div class="tag">
                        <el-radio-group v-model="selected.major_level" size="large">
                            <el-radio-button v-for="item in majorStore.categoryInfo.major_level" :label="item"
                                :key="item" />
                        </el-radio-group>
                    </div>
                </div>
                <div class="institution-affiliation">
                    <span>专业门类 > </span>
                    <div class="tag">
                        <el-radio-group v-model="selected.major_category" size="large">
                            <el-radio-button label="全部" />
                            <el-radio-button v-for="item in majorStore.categoryInfo.major_category" :label="item"
                                :key="item" />
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
                <div ref="loadoneEl">
                    <!-- 内容显示 默认排序 -->
                    <div class="demo-collapse" v-if="rankRadio === '默认排序'">
                        <div v-if="defaultDate.length">
                            <el-collapse>
                                <el-collapse-item v-for="(value, index) in defaultDate" :title="value.category_name"
                                    :key="index">
                                    <div v-for="(item, index) in value.major_classes" :key="index">
                                        <h2 style="color: lightgreen;">{{ item.class_name }}</h2>
                                        <MajorPanel v-for="(v, i) in item.majors" :key="i" :item="v">

                                            <template #btn>
                                                <el-button
                                                    v-if="collectStore.collectMajor.findIndex(val => val.item_id === v.id) !== -1"
                                                    type="primary" @click="deleteCollectBtn(v.id)">
                                                    <span><i class="iconfont icon-shoucang6"></i>&nbsp;已收藏
                                                    </span></el-button>
                                                <el-button v-else @click="addCollectBtn(v.id)"> <span><i
                                                            class="iconfont icon-shoucang1"></i>&nbsp;收藏</span></el-button>
                                            </template>
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
                        <!-- 空标签 -->
                        <el-empty description="啥也没搜到~" v-else />
                    </div>
                    <!-- 内容显示 人气排序 -->
                    <div v-if="rankRadio === '人气排序'">
                        <div v-if="peopleDate.length">
                            <div style="margin: 10px 20px;float: right;">
                                <el-radio-group v-model="sortWayPeople" size="small">
                                    <el-radio label="1" border>从高到低</el-radio>
                                    <el-radio label="0" border>从低到高</el-radio>
                                </el-radio-group>
                            </div>
                            <MajorPanel v-for="(v, i) in peopleDate" :key="i" :item="v">
                                <template #people>
                                    <span class="salary"> <i class="iconfont icon-renqiredu"></i> 人气值 : <i> {{ v.popularity
                                    }}</i></span>
                                </template>
                                <template #btn>

                                    <el-button
                                        v-if="collectStore.collectMajor.findIndex(val => val.item_id === v.major_id) !== -1"
                                        type="primary" @click="deleteCollectBtn(v.major_id)">
                                        <span><i class="iconfont icon-shoucang6"></i>&nbsp;已收藏</span></el-button>
                                    <el-button v-else @click="addCollectBtn(v.major_id)"> <span><i
                                                class="iconfont icon-shoucang1"></i>&nbsp;收藏</span></el-button>
                                </template>
                            </MajorPanel>
                            <div class="demo-pagination-block">
                                <el-pagination v-model:current-page="currentPage2" :small="small" :disabled="disabled"
                                    :background="background" layout="prev, pager, next, jumper"
                                    :total="majorStore.peopleSortInfo.length" @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange" :default-page-size="10" />
                            </div>
                        </div>
                        <!-- 空标签 -->
                        <el-empty description="啥也没搜到~" v-else />
                    </div>
                    <!-- 内容显示 薪酬排序 -->
                    <div v-if="rankRadio === '薪酬排序'">
                        <div v-if="salaryDate.length">
                            <div style="margin: 10px 20px;float: right;">
                                <el-radio-group v-model="sortWay" size="small">
                                    <el-radio label="1" border>从高到低</el-radio>
                                    <el-radio label="0" border>从低到高</el-radio>
                                </el-radio-group>
                            </div>
                            <div>
                                <MajorPanel v-for="(v, i) in salaryDate" :key="i" :item="v">
                                    <template #btn>
                                        <el-button
                                            v-if="collectStore.collectMajor.findIndex(val => val.item_id === v.major_id) !== -1"
                                            type="primary" @click="deleteCollectBtn(v.major_id)">
                                            <span><i class="iconfont icon-shoucang6"></i>&nbsp;已收藏</span></el-button>
                                        <el-button v-else @click="addCollectBtn(v.major_id)"> <span><i
                                                    class="iconfont icon-shoucang1"></i>&nbsp;收藏</span></el-button>
                                    </template>
                                </MajorPanel>
                            </div>
                            <div class="demo-pagination-block">
                                <el-pagination v-model:current-page="currentPage3" :small="small" :disabled="disabled"
                                    :background="background" layout="prev, pager, next, jumper"
                                    :total="majorStore.salarySortInfo.length" @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange" :default-page-size="10" />
                            </div>
                        </div>
                        <!-- 空标签 -->
                        <el-empty description="啥也没搜到~" v-else />
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="right-box"><br><br><br>
            <h1>右 <br> 边</h1>
        </div> -->
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

.searchMajor {
    background-color: #fff;
    width: 100%;
}

.demo-pagination-block {
    margin: 30px 150px;
    margin-right: 0;
}


.searchMajor {
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
    // width: 800px;
    width: 1200px;
    margin: 0 auto;
    padding-left: 20px;
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
}
</style>
  