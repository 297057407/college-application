import http from '@/utils/http'
//获取所有筛选条件
export const getAllTagsApi = () => {
    return http({
        url: '/major/getAllTags'
    })
}

//获取所有专业信息
export const getMajorInfoApi = () => {
    return http({
        url: '/major/getAll'
    })
}

//获取默认排序的专业信息
export const getByTagsApi = (data) => {
    return http({
        url: '/major/getByTags',
        method: 'POST',
        data
    })
}
//根据搜索内容获取相应的专业信息
// export const getByMajorNameApi = (data) => {
//     return http({
//         url: '/major/getByMajorName',
//         method: 'POST',
//         data
//     })
// }


//根据薪酬排序的专业信息
export const getSortBySalaryApi = (data) => {
    return http({
        url: '/major/getByMoney',
        method: 'POST',
        data
    })
}

//根据搜索内容获取人气排名的专业信息
// export const getByPeopleSearchApi = (data) => {
//     return http({
//         url: '/major/getByPeopleSearch',
//         method: 'POST',
//         data
//     })
// }

//根据人气排序的专业信息
export const getSortByPeopleApi = (data) => {
    return http({
        url: '/major/getByPeople',
        method: 'POST',
        data
    })
}

//根据搜索内容获取薪酬排名的专业信息
// export const getByMoneySearchApi = (data) => {
//     return http({
//         url: '/major/getByMoneySearch',
//         method: 'POST',
//         data
//     })
// }