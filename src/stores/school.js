import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUniversityDetailsApi, getSchoolInfoApi, getSchoolByTagsApi, getCategoryApi, getSchoolRankingApi, downloadRankingApi } from '@/apis/school.js'
export const useSchoolStore = defineStore('school', () => {
    const categoryInfo = ref({})
    const allSchoolInfo = ref([])
    const schoolRankInfo = ref([])
    const downloadInfo = ref([])
    const schoolDetail = ref({})
    const hotSchool2 = ref([])
    const hotSchool = ref([])
    //获取热门学校
    const getHot = async (province) => {
        if (province !== '') {
            const res1 = await downloadRankingApi({
                "type": "",
                "location": province,
                "level": "",
                "tags": [],
            })
            hotSchool.value = res1.message
            if (hotSchool.value.length === 0) {
                const res2 = await getSchoolRankingApi({
                    "type": "",
                    "location": "",
                    "level": "",
                    "tags": [],
                    "page": 1
                })
                hotSchool.value = res2.message
            }
        } else {
            const res2 = await getSchoolRankingApi({
                "type": "",
                "location": "",
                "level": "",
                "tags": [],
                "page": 1
            })
            console.log(res2);
            hotSchool.value = res2.message
        }
        if (hotSchool.value.length < 7) {
            const res3 = await downloadRankingApi({
                "type": "",
                "location": "",
                "level": "",
                "tags": [],
                "page": 2
            })
            hotSchool.value = [...hotSchool.value, ...res3.message]
        }
        hotSchool2.value = hotSchool.value
        hotSchool.value = hotSchool.value.slice(0,7).sort((a,b)=>b.popularity - a.popularity)
    }
    //刷新热门院校
    const refresh = () => {
        if (hotSchool.value.length !== 0) {
            let set = new Set()
            while (set.size < 7) {
                let random = Math.floor(Math.random() * (hotSchool2.value.length - 1 - 0 + 1) + 0)
                set.add(hotSchool2.value[random])
            }
            hotSchool.value = [...set]
            hotSchool.value.sort((a, b) => b.popularity - a.popularity)
        }
    }
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
    //设置allSchoolInfo的值
    const setAllSchoolInfo = (data) => {
        allSchoolInfo.value = data
    }
    //学校排名模块
    // 获取排序后学校信息(分页)
    const getSortedInfo = async (data, page) => {
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
    const getUniversityDetails = async (name) => {
        const res = await getUniversityDetailsApi(name)
        schoolDetail.value = res.message
    }
    return { refresh, getHot, hotSchool, setAllSchoolInfo, schoolDetail, getUniversityDetails, allSchoolInfo, getSchoolInfo, getSchoolByTags, getCategory, categoryInfo, getSortedInfo, schoolRankInfo, downloadInfo, downloadRanking }
})



