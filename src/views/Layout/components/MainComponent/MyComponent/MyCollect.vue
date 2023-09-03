<script  setup>
import SchoolPanel from '@/components/SchoolPanel.vue'
import { useCollectStore } from '@/stores/collect.js'
import { useUserStore } from '@/stores/user.js'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
const userStore = useUserStore()
const collectStore = useCollectStore()
import { onMounted } from 'vue'
onMounted(async () => {
    if (JSON.stringify(collectStore.schoolInfo) === '[]') {
        await collectStore.getAllSchool({ user_id: userStore.loginInfo.user_id })
    }
})
//取消学校收藏
const cancelCollect = async (id) => {
    await collectStore.favoriteDelete({
        user_id: userStore.loginInfo.user_id,
        item_id: id,
        item_type: 1
    })
    await collectStore.getAllSchool({ user_id: userStore.loginInfo.user_id })
    ElMessage.success("取消收藏成功")
}
</script>
<template>
    <el-tabs :tab-position="'right'" style="height: 200px" class="demo-tabs">
        <el-tab-pane label="收藏的学校">
            <SchoolPanel v-for="item in collectStore.schoolInfo" :key="item.id" :name="item.name" :location="item.location"
                :tags="item.tags.split('/')">
                <template #btn>
                    <el-popconfirm title="取消收藏？" @confirm="cancelCollect(item.id)">
                        <template #reference>
                            <el-button type="danger">
                                取消收藏
                            </el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </SchoolPanel>
        </el-tab-pane>
        <el-tab-pane label="收藏的专业">Config</el-tab-pane>
    </el-tabs>
</template>

<style scoped lang="scss">
.demo-tabs {
    height: auto !important;
}

::v-deep.demo-tabs>.el-tabs__content {
    width: 720px;
    padding: 0;
    margin: 0;
}

::v-deep .el-tabs__item.is-right {
    font-size: 22px;
    margin-bottom: 10px;
}
</style>