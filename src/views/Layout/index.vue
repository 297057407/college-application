
<script setup>
import { onMounted } from 'vue'
import { getCategoryApi, getSchoolInfoApi } from '@/apis/school'

import LayoutFixed from './components/LayoutFixed.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutMain from './components/LayoutMain.vue'
import LayoutFooter from './components/LayoutFooter.vue'


onMounted(async () => {
    // const res = await getCategoryApi()
    // console.log(res);
    // const res2 = await getSchoolInfoApi()
    // console.log(res2);
    // const res3 = await getBySchoolNameApi("北京")
    // console.log(res3);
})
</script>
<template>
    <div class="w1200">
        <LayoutFixed></LayoutFixed>
        <LayoutNav></LayoutNav>
        <LayoutMain></LayoutMain>
        <RouterView></RouterView>
        <LayoutFooter></LayoutFooter>
        <el-backtop :right="100" :bottom="100">
            <div><i class="iconfont icon-huidaodingbu" style="font-size: 40px;"></i></div>
        </el-backtop>
    </div>
</template>
<style lang="scss">
.w1200 {
    width: 1200px;
    margin: 0 auto;
}
</style>