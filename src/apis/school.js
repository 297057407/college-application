import http from '@/utils/http'

//获取学校筛选条件
export const getCategoryApi = () => {
    return http({
        url: '/university/getAllTags',
    })
}

//获取全部学校信息
export const getSchoolInfoApi = () => {
    return http({
        url: '/university/getAll',
    })
}

//根据大学名字模糊查询
// export const getBySchoolNameApi = (schoolName) => {
//     return http({
//         url: '/university/getBySchoolName',
//         params: {
//             schoolName
//         },
//     })
// }

//根据大学筛选条件查询
export const getSchoolByTagsApi = (data) => {
    return http({
        url: '/university/getByTags',
        method : 'POST',
        data 
    })
}


