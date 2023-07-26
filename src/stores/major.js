import { defineStore } from 'pinia'
import { getAllTagsApi, getMajorInfoApi, getByMajorNameApi, getByTagsApi, getSortBySalaryApi, getSortByPeopleApi } from '@/apis/major'
import { ref } from 'vue'
export const useMajorStore = defineStore('major', () => {
    //筛选数据
    const categoryInfo = ref({})
    //专业数据
    const majorInfo = ref({})
    //搜索后的专业数据
    const searchInfo = ref({})
    //按薪酬排好序的专业数据
    const salarySortInfo = ref({})
    //按人气排好序的专业数据
    const peopleSortInfo = ref({})
    //获取筛选条件数据
    const getCategoryInfo = async () => {
        const res = await getAllTagsApi()
        categoryInfo.value = res

    }
    //获取专业信息
    const getMajorInfo = async () => {
        const res = await getMajorInfoApi()
        majorInfo.value = res
        console.log(res);
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
    //根据薪酬对专业信息排序
    const getSortBySalary = async (data) => {
        const res = await getSortBySalaryApi(data)
        salarySortInfo.value = res
    }
    //根据人气对专业信息排序
    const getSortByPeople = async (data) => {
        const res = await getSortByPeopleApi(data)
        peopleSortInfo.value = res
    }
    return {
        categoryInfo, getCategoryInfo, getMajorInfo, majorInfo, getSearchInfo, searchInfo, getSearchInfoByTags, getSortBySalary, salarySortInfo,getSortByPeople,peopleSortInfo
    }
})

