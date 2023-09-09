<script setup>
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { useRouter } from 'vue-router'
import { getSchoolByTagsApi } from '@/apis/school.js'
import { getByTagsApi } from '@/apis/major'
import { useSchoolStore } from '@/stores/school.js'
import { useMajorStore } from '@/stores/major'
const schoolStore = useSchoolStore()
const majorStore = useMajorStore()
const userStore = useUserStore()
const router = useRouter()
import { onMounted, ref, watch } from 'vue'
const input = ref('')
const exitHandler = () => {
    userStore.exit()
    ElMessage.success("退出成功")
    router.push('/login')
}
const search = async () => {
    const school = await getSchoolByTagsApi({ "level": '', "location": '', "type": '', "tags": '', "search_name": input.value, page: 1 })
    if (school.message.length) {
        schoolStore.setAllSchoolInfo(school.message)
        router.push({
            path: '/searchschool', // 传递的参数
        });
        return
    }
    const major = await getByTagsApi({ "major_level": '', "major_category": '', "major_class": '', 'search_name': input.value })
    if (major.major_categories.length) {
        majorStore.setSearchInfo(major)
        router.push({
            path: '/searchmajor',
        })
    } else {
        router.push({
            path: '/notfindany',
            query: {
                message: input.value
            }
        })
    }
}
const selectVal = ref('')
watch(selectVal, async () => {
    userStore.getLocation(selectVal.value)
    await schoolStore.getHot(userStore.location)
})
onMounted(async () => {
    /* global BMapGL */
    if ("geolocation" in navigator) {
        let options = {
            enableHighAccuracy: true, // 启用高精度定位
            timeout: 5000,            // 最大等待时间（毫秒）
            maximumAge: 0             // 缓存最长时间（毫秒）
        };
        // 浏览器支持地理定位
        navigator.geolocation.getCurrentPosition(function (position) {
            // 获取位置成功时的回调函数
            // 获取经纬度
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;
            // 根据坐标得到地址描述    
            //获取城市
            let myGeo = new BMapGL.Geocoder();
            myGeo.getLocation(new BMapGL.Point(longitude, latitude), function (result) {
                if (result) {
                    selectVal.value = result.addressComponents.province.slice(0, -1)
                    userStore.getLocation(selectVal.value)
                }
            });
        }, handleError, options)
    }
    //获取分类信息
    if (JSON.stringify(schoolStore.categoryInfo) === '{}')
        await schoolStore.getCategory()
})

const handleError = () => {
    // switch (error.code) {
    //     case error.PERMISSION_DENIED:
    //         currentCity.value = "用户拒绝了定位请求。";
    //         break;
    //     case error.POSITION_UNAVAILABLE:
    //         currentCity.value = "无法获取位置信息。";
    //         break;
    //     case error.TIMEOUT:
    //         currentCity.value = "获取位置信息超时。";
    //         break;
    //     case error.UNKNOWN_ERROR:
    //         currentCity.value = "发生未知错误。";
    //         break;
    // }
}
</script>
<template>
    <div class="nav">
        <div class="container">
            <div class="logo">
                <img src="@/assets/images/logo3.png" alt="">
            </div>
            <div class="search">
                <el-input v-model="input" placeholder="搜大学 查专业" size="large" />
            </div>
            <el-button type="primary" size="large" @click="search">搜索</el-button>
            <div class="welcome" v-if="userStore.loginInfo.user_id">欢迎：{{ userStore.loginInfo.user_id }}</div>
            <div class="welcome" v-else>请先登录</div>
            <div id="allmap" v-if="userStore.location">当前位置: {{ userStore.location }}
                <a href="javascript:void(0)" style="color: #007bff;">[切换]</a>
                <select v-model="selectVal" class="select">
                    <option :value="v" v-for="(v, i) in schoolStore.categoryInfo.location" :key="i">{{ v }}</option>
                </select>
                <div class="notice" style="font-size: 12px;color: rgba(159, 159, 159, .7);">注: 首页将根据定位推荐热门院校</div>
            </div>
            <div class="login">

                <el-popconfirm title="确定退出？" @confirm="exitHandler()">
                    <template #reference>
                        <el-button type="danger" v-if="userStore.loginInfo.user_id">退出</el-button>
                    </template>
                </el-popconfirm>
                <el-button type="primary" v-if="!userStore.loginInfo.user_id"
                    @click="router.push('/login')">登录/注册</el-button>
            </div>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
.nav {
    background-color: #f2f2f2;
    /* 浅灰色背景 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* 模糊的阴影效果 */

    // margin-bottom: 20px;
    .container {

        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 1200px;
        padding: 50px;
        padding-right: 0;
        height: 60px;
        margin: auto;
        font-size: 16px;

        .logo {
            width: 200px;
            height: 65px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .search {
            width: 380px;
            margin-left: 90px;
        }

        ::v-deep .el-input__wrapper {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            margin-right: -3px;
        }

        #allmap {
            width: 300px;
            position: relative;

            select {
                position: absolute;
                left: 100px;
                top: 3px;
                opacity: 0;
            }

            .notice {
                position: absolute;
                top: 30px;
            }
        }

        .welcome {
            margin-left: 50px;
            width: 200px;
        }

        .login {
            // width: 100px;
            float: right;
        }
    }
}
</style>