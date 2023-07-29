import { defineStore } from 'pinia'
import { getAllTagsApi,getByTagsApi, getSortBySalaryApi, getSortByPeopleApi } from '@/apis/major'
import { ref } from 'vue'
export const useMajorStore = defineStore('major', () => {
    //筛选数据
    const categoryInfo = ref({})
    // //专业数据
    // const majorInfo = ref({})
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
    // //获取专业信息
    // const getMajorInfo = async () => {
    //     const res = await getMajorInfoApi()
    //     searchInfo.value = res
    // }
    //根据默认对专业信息排序
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

    //根据搜索内容获取默认排名的专业信息
    // const getSearchInfo = async (str) => {
    //     if (str.trim() === '') {
    //         searchInfo.value = await getMajorInfoApi()
    //     }
    //     else {
    //         const res = await getByMajorNameApi({ "major_name": str })
    //         searchInfo.value = res
    //     }
    // }
    //根据搜索内容获取人气排名的专业信息
    // const getByPeopleSearch = async () => {
    //     const res = await getByPeopleSearchApi()
    //     peopleSortInfo.value = res
    // }
    //根据搜索内容获取薪酬排名的专业信息
    // const getByMoneySearch = async () => {
    //     const res = await getByMoneySearchApi()
    //     salarySortInfo.value = res
    // }
    return {
        categoryInfo, getCategoryInfo, searchInfo, getSearchInfoByTags, getSortBySalary, salarySortInfo, getSortByPeople, peopleSortInfo
    
    }
})

