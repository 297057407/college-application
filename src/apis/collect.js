import http from '@/utils/http'


//添加收藏
export const favoriteAddApi = (data) => {
    return http({
        url: '/favorite/add',
        method: 'POST',
        data
    })
}

//查询收藏
export const favoriteGetApi = (data) => {
    return http({
        url: '/favorite/get',
        method: 'POST',
        data
    })
}

//删除收藏
export const favoriteDeleteApi = (data) => {
    return http({
        url: '/favorite/delete',
        method: 'POST',
        data
    })
}

