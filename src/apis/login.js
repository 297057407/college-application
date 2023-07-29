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
//获取省市
export const getLocationApi = () => {
    return http({
        url: '/information/getLocation',
    })
}
//获取用户信息
export const getInformationApi = (data) => {
    return http({
        url: '/information/getInformation',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
//修改用户信息
export const addInformationApi = (data) => {
    return http({
        url: '/information/addInformation',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//修改用户昵称
export const updateNicknameApi = (data) => {
    return http({
        url: '/user/updateNickname',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//修改用户密码
export const revisePasswordApi = (data) => {
    return http({
        url: '/user/revisePassword',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


//获取基本信息
export const getUserApi = (data) => {
    return http({
        url: '/user/getUser',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}



