import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addMembershipApi, loginApi, registerApi, deleteUserApi, addInformationApi, getInformationApi, getLocationApi, updateNicknameApi, revisePasswordApi, getUserApi, getMyRankApi } from '@/apis/login'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const loginInfo = ref({})
    const provinceInfo = ref({})
    const location = ref('')
    //获取定位
    const getLocation = (str) => {
        location.value = str
    }
    //登录
    const login = async (data) => {
        //获取省市
        await getProvince()
        //获取登录信息
        const res = await loginApi(data)
        userInfo.value = res
        loginInfo.value = res
        return res
    }
    //注销用户
    const deleteUser = async (data) => {
        const res = await deleteUserApi(data)
        return res
    }
    //获取验证码

    //充值vip
    const addMembership = async (data) => {
        console.log(data);
        await addMembershipApi(data)
        loginInfo.value.expiration_time = data.timestamp
        loginInfo.value.membership = 1
    }

    //注册
    const register = async (data) => {
        const res = await registerApi(data)
        return res
    }
    //退出
    const exit = () => {
        userInfo.value = {}
        loginInfo.value = {}
    }
    //获取省市
    const getProvince = async () => {
        const res = await getLocationApi()
        provinceInfo.value = res
    }
    //获取用户信息
    const getInformation = async (data) => {
        const res = await getInformationApi(data)
        if (res.status === 'error') {
            userInfo.value = {
                user_id: loginInfo.value.user_id,
                province: '',
                city: '',
                high_school: "",
                grade: "",
                subject: [],
                score: '',
                score_rank: '',
                exam_type: ""
            }
        }
        else userInfo.value = res.message[0]
    }
    //修改用户信息
    const addInformation = async (data) => {
        await addInformationApi(data)
    }

    //修改昵称
    const updateNickname = async (data) => {
        const res = await updateNicknameApi(data)
        if (res.status == 'success') {
            ElMessage.success(res.message)
        } else {
            ElMessage.warning(res.message)
        }
    }

    //修改密码
    const revisePassword = async (data) => {
        const res = await revisePasswordApi(data)
        if (res.status == 'success') {
            ElMessage.success(res.message)
        } else {
            ElMessage.warning(res.message)
        }
    }
    //获取基本信息
    const getUser = async (data) => {
        const res = await getUserApi(data)
        loginInfo.value = res
    }
    //获取排名
    const getMyRank = async (data) => {
        const res = await getMyRankApi(data)
        if (res.status === 'success') userInfo.value.score_rank = res.result
    }
    return { getLocation,location,addMembership, userInfo, login, register, addInformation, getInformation, getProvince, provinceInfo, exit, loginInfo, updateNickname, revisePassword, getUser, getMyRank, deleteUser }
}, {
    persist: true
})