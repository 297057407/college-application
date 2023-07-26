import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryApi } from '@/apis/school.js'

import { getSchoolInfoApi, getSchoolByTagsApi } from '@/apis/school'
export const useSchoolStore = defineStore('school', () => {
    const allSchoolInfo = ref([])
    const searchInfo = ref([])
    const categoryInfo = ref({})
    //获取筛选数据
    const getCategory = async () => {
        const res = await getCategoryApi()
        categoryInfo.value = res
    }
    //获取学校信息
    const getSchoolInfo = async () => {
        const res = await getSchoolInfoApi()
        allSchoolInfo.value = res.message
    }
    //根据搜索内容获取学校信息
    const getSearchInfo = (str) => {
        if (str.trim() === '') {
            searchInfo.value = allSchoolInfo.value
        }
        else {
            searchInfo.value = allSchoolInfo.value.filter((item) => item.name.includes(str.trim())) || []
        }
    }
    //根据筛选条件获取学校信息
    const getSchoolByTags = async (data) => {
        data.level = data.level === '全部' ? '' : data.level
        data.location = data.location === '全部' ? '' : data.location
        data.type = data.type === '全部' ? '' : data.type
        const res = await getSchoolByTagsApi(data)
        searchInfo.value = res.message
    }
    return { allSchoolInfo, getSchoolInfo, getSearchInfo, searchInfo, getSchoolByTags ,getCategory,categoryInfo}
})



