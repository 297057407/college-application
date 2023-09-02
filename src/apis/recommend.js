import http from '@/utils/http'

//获取学校筛选条件
export const getRecommendApi = (data) => {
    return http({
        url: '/recommend/getList',
        method : 'post',
        data
    })
}
//将志愿添加到志愿表
export const addRecommendApi = (data) => {
    return http({
        url: '/recommend/saveList',
        method : 'post',
        data
    })
}
//获取志愿列表
export const getRecommendListApi = (data) => {
    return http({
        url: '/recommend/getSaveListCategory',
        method : 'post',
        data
    })
}
//删除志愿表
export const deleteListApi = (data) => {
    return http({
        url: '/recommend/deleteList',
        method : 'post',
        data
    })
}
//获取志愿表详情
export const getSaveListApi = (data) => {
    return http({
        url: '/recommend/getSaveList',
        method : 'post',
        data
    })
}