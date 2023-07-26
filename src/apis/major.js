import http from '@/utils/http'
//获取所有筛选条件
export const  getAllTagsApi = () => {
    return http({
        url : '/major/getAllTags'
    })
}

//获取所有专业信息
export const  getMajorInfoApi = () => {
    return http({
        url : '/major/getAll'
    })
}
//根据搜索内容获取相应的专业信息
export const  getByMajorNameApi = (data) => {
    return http({
        url : '/major/getByMajorName',
        method :'POST',
        data
    })
}

//根据筛选内容获取相应的专业信息
export const getByTagsApi = (data) => {
    return http({
        url : '/major/getByTags',
        method :'POST',
        data
    })
}

//根据薪酬排序
export const getSortBySalaryApi = (data) => {
    return http({
        url : '/major/getAndSort',
        method :'POST',
        data
    })
}

//根据人气排序
export const getSortByPeopleApi = (data) => {
    return http({
        url : '/major/getByPeople',
        method :'POST',
        data
    })
}