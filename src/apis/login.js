import http from '@/utils/http'

//登录接口
export const loginApi = (data) => {
    return http({
        url: '/user/login',
        method: 'POST',
        data
    })
}

//注册接口
export const registerApi = (data) => {
    return http({
        url: '/user/register',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}