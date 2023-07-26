import { defineStore } from 'pinia'
import { getAllTagsApi, getMajorInfoApi, getByMajorNameApi, getByTagsApi } from '@/apis/major'
import { ref } from 'vue'
export const useMajorStore = defineStore('major', () => {
    const categoryInfo = ref({})
    const majorInfo = ref({})
    const searchInfo = ref({})
    //获取筛选条件数据
    const getCategoryInfo = async () => {
        const res = await getAllTagsApi()
        categoryInfo.value = res

    }
    //获取专业信息
    const getMajorInfo = async () => {
        const res = await getMajorInfoApi()
        majorInfo.value = res
    }

    //根据搜索内容获取专业信息
    const getSearchInfo = async (str) => {
        if (str.trim() === '') {
            searchInfo.value = majorInfo.value
        }
        else {
            const res = await getByMajorNameApi({ "major_name": str })
            searchInfo.value = res
        }
    }

    //根据筛选内容获取专业信息
    const getSearchInfoByTags = async (data) => {
        const res = await getByTagsApi(data)
        searchInfo.value = res
    }
    return {
        categoryInfo, getCategoryInfo, getMajorInfo, majorInfo, getSearchInfo, searchInfo, getSearchInfoByTags
    }
})

