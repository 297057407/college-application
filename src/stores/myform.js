import { defineStore } from 'pinia'
import { getRecommendListApi, deleteListApi, getSaveListApi } from '@/apis/recommend.js'
import { ref } from 'vue'
export const useMyformStore = defineStore('myform', () => {
    //个人中心的左侧
    const leftList = ref([ { name: '个人资料', path: '/my/myinfo', icon: 'iconfont icon-wode' },{ name: '会员中心', path: '/my/myvip', icon: 'iconfont icon-huiyuan' }, { name: '我的收藏', path: '/my/mycollect', icon: 'iconfont icon-shoucang1' }, { name: '我的志愿表', path: '/my/myform', icon: 'iconfont icon-biaoge_o' }, { name: '联系客服', path: '/my/kefu', icon: 'iconfont icon-kefu' }])
    //个人中心左侧选中下标
    const i = ref(0)

    const form_list = ref([])
    const form_detail = ref([])
    const current_form = ref([])

    // 设置个人中心左侧下标
    const setIndex = (index) => {
        i.value = index
    }
    //获取我的志愿表
    const getList = async (data) => {
        const res = await getRecommendListApi(data)
        form_list.value = res
        console.log(res);
    }
    //删除志愿表
    const deleteList = async (data) => {
        await deleteListApi(data)
    }
    //获取志愿表详情
    const getSaveList = async (data) => {
        current_form.value = form_detail.value.find(item => item.index === data.index)?.info || undefined
        if (!current_form.value) {
            current_form.value = await getSaveListApi(data)
            console.log(current_form.value);
            form_detail.value.push({
                index: data.index,
                info: current_form.value
            })
        }

    }
    return {
        form_list, getList, deleteList, getSaveList, current_form, leftList, i, setIndex
    }
})