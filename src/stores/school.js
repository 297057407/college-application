import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUniversityDetailsApi,getSchoolInfoApi, getSchoolByTagsApi, getCategoryApi, getSchoolRankingApi,downloadRankingApi } from '@/apis/school.js'
export const useSchoolStore = defineStore('school', () => {
    const categoryInfo = ref({})
    const allSchoolInfo = ref([])
    const schoolRankInfo = ref([])
    const downloadInfo = ref([])
    const schoolDetail = ref({})
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

    //根据筛选条件获取学校信息
    const getSchoolByTags = async (data) => {
        data = JSON.parse(JSON.stringify(data))
        data.level = data.level === '全部' ? '' : data.level
        data.location = data.location === '全部' ? '' : data.location
        data.type = data.type === '全部' ? '' : data.type
        const res = await getSchoolByTagsApi(data)
        allSchoolInfo.value = res.message
        allSchoolInfo.value.total_results = res.total_results
    }


    //学校排名模块
    // 获取排序后学校信息(分页)
    const getSortedInfo = async (data,page) => {
        data = JSON.parse(JSON.stringify(data))
        data.tags = data.tags.join(',')
        data.page = page
        console.log(data);
        const res = await getSchoolRankingApi(data)
        schoolRankInfo.value = res
    }

    //获取当前学校排行榜信息
    const downloadRanking = async (data) => {
        data = JSON.parse(JSON.stringify(data))
        data.tags = data.tags.join(',')
        const res = await downloadRankingApi(data)
        downloadInfo.value = res.message
    }
    //获取学校详情
    const getUniversityDetails = async(name)=>{
       const res = await getUniversityDetailsApi(name)
       schoolDetail.value = res.message
    }
    return {schoolDetail,getUniversityDetails, allSchoolInfo, getSchoolInfo, getSchoolByTags, getCategory, categoryInfo, getSortedInfo, schoolRankInfo ,downloadInfo,downloadRanking}
})



