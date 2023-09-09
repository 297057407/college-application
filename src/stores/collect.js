import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getAllMajorApi, favoriteAddApi, favoriteGetApi, favoriteDeleteApi, getAllUniversityApi } from '@/apis/collect'
// import { useUserStore } from '@/stores/user'
export const useCollectStore = defineStore('collect', () => {
    //学校收藏信息
    const collectSchool = ref([])
    //专业收藏信息
    const collectMajor = ref([])
    //添加收藏
    const favoriteAdd = async (data) => {
        await favoriteAddApi(data)
    }
    const schoolInfo = ref([])
    const majorInfo = ref([])
    //查询收藏
    const favoriteGet = async (data) => {
        const res = await favoriteGetApi(data)
        if (data.item_type == '0') {
            collectMajor.value = res.message
        } else {
            collectSchool.value = res.message
        }
    }
    //获取收藏的学校数据
    const getAllSchool = async (data) => {
        const res = await getAllUniversityApi(data)
        schoolInfo.value = res.message
    }
    //获取收藏的专业数据
    const getAllMajor = async (data) => {
        const res = await getAllMajorApi(data)
        majorInfo.value = res.message
    }
    //删除收藏
    const favoriteDelete = async (data) => {
        await favoriteDeleteApi(data)
    }
    return { getAllMajor,majorInfo,favoriteAdd, favoriteGet, favoriteDelete, collectSchool, collectMajor, getAllSchool, schoolInfo }
})
