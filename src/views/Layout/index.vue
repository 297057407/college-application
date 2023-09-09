
<script setup>
import { onMounted } from 'vue'
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutMain from './components/LayoutMain.vue'
import LayoutFooter from './components/LayoutFooter.vue'


onMounted(async () => {
})
</script>
<template>
    <div >
        <LayoutFixed></LayoutFixed>
        <LayoutNav ></LayoutNav>
        <LayoutMain></LayoutMain>
        <RouterView class="w1200"></RouterView>
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