import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRecommendApi,addRecommendApi } from '@/apis/recommend'

export const useRecommendStore = defineStore('recommend', () => {
    const recommendList = ref([])
    //一键生成志愿表
    const getRecommend = async (data) => {
        data = JSON.parse(JSON.stringify(data))
        data.level = data.level === '全部' ? '' : data.level
        data.location = data.location === '全部' ? '' : data.location
        data.type = data.type === '全部' ? '' : data.type
        data.tags = data.tags.join(',')
        const res = await getRecommendApi(data)
        recommendList.value = res.recommendations
    }
    //将志愿表添加到我的志愿
    const addRecommend = async(data) => {
        await addRecommendApi(data)
    }
    return { getRecommend, recommendList,addRecommend }
})

