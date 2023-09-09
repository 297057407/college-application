<script setup>
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSchoolStore } from '@/stores/school.js'
import { useRecommendStore } from '@/stores/recommend.js'
import { useMyformStore } from '@/stores/myform.js'
const myformStore = useMyformStore()
const schoolStore = useSchoolStore()
const userStore = useUserStore()
const recommendStore = useRecommendStore()
//组件对象
const formEl = ref(null)
//form双向绑定对象
const form = ref({
    user_id: "",
    province: '',
    city: '',
    high_school: "",
    grade: "",
    subject: [],
    score: '',
    score_rank: '',
    exam_type: ""
})
//筛选框
const selected = ref({
    level: '全部',
    location: '全部',
    tags: [],
    type: '全部'
})
//控制弹出框
const dialogFormVisible = ref(false)
const click_close = ref(false)
//复选框验证规则
const validatePass = (rule, value, callback) => {
    let len = value.reduce((pre, cur) => {
        return pre += cur === '' ? 0 : 1
    }, 0)
    if (len === 3)
        callback()
    else callback(new Error('请选择三个科目'))
}
//表单验证规则
const rules = ref({

    province: [
        {
            required: true,
            message: '请选择省',
            trigger: 'blur',
        },
    ],
    city: [
        {
            required: true,
            message: '请选择市',
            trigger: 'blur',
        },
    ],
    grade: [
        {
            required: true,
            message: '请选择年级',
            trigger: 'blur',
        },
    ],
    subject: [
        { required: true, message: '请选择科目', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ],
    score: [
        {
            required: true,
            message: '请填写分数',
            trigger: 'blur',
        },
    ],
    score_rank: [
        {
            required: true,
            message: '请填写排名',
            trigger: 'blur',
        },
    ],
    exam_type: [
        {
            required: true,
            message: '请选择类型',
            trigger: 'blur',
        },
    ],
})


//当前信息
const current_info = ref({})
//当前志愿表信息
const current_form = ref({
    "score": '',
    "rank": '',
    "location": "",
    "type": "综合",
    "level": "本科",
    "tags": []
})
//提交表单
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (!userStore.loginInfo.user_id) ElMessage.warning("请先登录")
        else {
            if (valid) {
                //修改用户信息
                await userStore.addInformation(form.value)
                await userStore.getInformation({ user_id: userStore.loginInfo.user_id })
                ElMessage({
                    message: '保存成功',
                    type: 'success',
                })
                current_info.value = {
                    省市: `${form.value.province} ${form.value.city}`,
                    年级: form.value.grade,
                    选科: form.value.subject.join(','),
                    分数: form.value.score,
                    排名: form.value.score_rank,
                    类型: `${form.value.exam_type}类`
                }
                //获取推荐志愿信息
                await recommendStore.getRecommend({
                    "score": form.value.score,
                    "rank": form.value.score_rank,
                    "location": "",
                    "type": "综合",
                    "level": "本科",
                    "tags": [],
                    "membership": userStore.loginInfo.membership
                })
                //获取成功
                ElMessage.success('已生成志愿表')
                //当前志愿表信息
                current_form.value = {
                    "score": form.value.score,
                    "rank": form.value.score_rank,
                    "location": "",
                    "type": "综合",
                    "level": "本科",
                    "tags": []
                }
                //关闭弹窗
                dialogFormVisible.value = false
            } else {
                console.log('error submit!')
            }
        }
    })
}
//重置表单
const resetForm = async (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    console.log(form.value);
}
//一键获取志愿+完善信息
const initilize = async () => {
    if (form.value.score) {
        await recommendStore.getRecommend({
            "score": form.value.score,
            "rank": form.value.score_rank,
            "location": selected.value.location,
            "type": selected.value.type,
            "level": selected.value.level,
            "tags": selected.value.tags,
            "membership": userStore.loginInfo.membership
        })
        //当前志愿表信息
        current_form.value = {
            "score": form.value.score,
            "rank": form.value.score_rank,
            "location": selected.value.location,
            "type": selected.value.type,
            "level": selected.value.level,
            "tags": selected.value.tags
        }
        ElMessage.success('已生成志愿表')
    } else {
        dialogFormVisible.value = true
        ElMessage.warning('请先完善信息')
    }
}

onMounted(async () => {
    //获取分类信息
    if (JSON.stringify(schoolStore.categoryInfo) === '{}') await schoolStore.getCategory()
    //获取用户信息赋值为form
    if (!userStore.loginInfo.user_id) ElMessage.warning("请先登录")
    else {
        //初始化弹出框
        await userStore.getInformation({ user_id: userStore.loginInfo.user_id })
        form.value = JSON.parse(JSON.stringify(userStore.userInfo))
        //初始化左侧信息
        current_info.value = {
            省市: `${form.value.province} ${form.value.city}`,
            年级: form.value.grade,
            选科: form.value.subject.join(','),
            分数: form.value.score,
            排名: form.value.score_rank,
            类型: `${form.value.exam_type}`
        }
        // if(!form.value.score)  dialogFormVisible.value = true
        await initilize()
    }
})

let timer = null
//分数改变自动改变排名  节流
watch(() => form.value.score, async () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(async () => {
        await userStore.getMyRank({ score: form.value.score })
        form.value.score_rank = userStore.userInfo.score_rank
        clearTimeout(timer)
        timer = null
    }, 500);
})

//修改信息
const changeinfo = async () => {
    dialogFormVisible.value = true
    //初始化弹出框
    await userStore.getInformation({ user_id: userStore.loginInfo.user_id })
    form.value = JSON.parse(JSON.stringify(userStore.userInfo))
}
//展开筛选条件
const expand = ref(false)
const expand_btn = () => {
    expand.value = !expand.value
}

//一键生成志愿
const generate_btn = async () => {
    await initilize()
}
//重置筛选条件
const reset_btn = () => {
    selected.value = {
        level: '全部',
        location: '全部',
        tags: [],
        type: '全部'
    }
}
//将志愿表添加到我的志愿
const add_btn = async () => {
    if (userStore.loginInfo.membership == '0') {
        console.log(1);
        ElMessage.warning('开通VIP后可使用')

    }
    else {
        if (JSON.stringify(recommendStore.recommendList) === '[]') ElMessage.warning('请先一键生成志愿表')
        else {
            const list = recommendStore.recommendList.map(v => {
                return v.id
            })
            await recommendStore.addRecommend(
                {
                    user_id: userStore.loginInfo.user_id,
                    list,
                    introduction: `分数: ${current_form.value.score} | 排名: ${current_form.value.rank} | 属地: ${current_form.value.location} | 院校类型: ${current_form.value.type} | 办学类型: ${current_form.value.level} | 特色: ${current_form.value.tags.join('/')}`
                }
            )
            ElMessage.success('已添加至我的志愿')
        }
    }
}
</script>
<template>
    <el-dialog :close-on-click-modal="click_close" v-model="dialogFormVisible" center title="请填写学生信息" width="40%">
        <el-form :model="form" :rules="rules" ref="formEl" label-width="120px" :disabled="disabled">

            <el-form-item label="省" prop="province">
                <el-select v-model="form.province" placeholder="省" @change="form.city = ''">
                    <el-option v-for="(item, key) in userStore.provinceInfo" :key="key" :label="key" :value="key" />
                </el-select>
            </el-form-item>

            <el-form-item label="市" prop="city">
                <el-select v-model="form.city" placeholder="市">
                    <el-option v-for="(item, index) in userStore.provinceInfo[form.province]" :key="index" :label="item"
                        :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
                <el-radio-group v-model="form.grade">
                    <el-radio-button label="高一" />
                    <el-radio-button label="高二" />
                    <el-radio-button label="高三" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="选科" prop="subject">
                <el-checkbox-group v-model="form.subject">
                    <el-checkbox-button label="物理">物理</el-checkbox-button>
                    <el-checkbox-button label="化学">化学</el-checkbox-button>
                    <el-checkbox-button label="生物">生物</el-checkbox-button>
                    <el-checkbox-button label="政治">政治</el-checkbox-button>
                    <el-checkbox-button label="历史">历史</el-checkbox-button>
                    <el-checkbox-button label="地理">地理</el-checkbox-button>
                </el-checkbox-group>

            </el-form-item>

            <el-form-item label="分数" prop="score">
                <el-input-number v-model="form.score" class="mx-4" :min="0" :max="750" controls-position="right"
                    @change="handleScoreChange" />
            </el-form-item>

            <el-form-item label="位次" prop="score_rank">
                <el-input-number v-model="form.score_rank" class="mx-4" :min="1" controls-position="right"
                    @change="handleChange" />
            </el-form-item>


            <el-form-item label="考生类型" prop="exam_type">
                <el-radio-group v-model="form.exam_type">
                    <el-radio label="普通" />
                    <el-radio label="艺术" />
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formEl)">确定</el-button>
                <el-button @click="resetForm(formEl)">重置</el-button>
            </el-form-item>
        </el-form>
        <p style="color: #ff5722;">注意事项: 请确保提供的信息准确无误，因为这些信息将用于为您提供个性化的建议和推荐。
            如果您需要更新个人信息，可以随时返回到个人信息填写页面进行修改。
            如果您有任何疑问或需要进一步的帮助，请查看帮助中心或联系客户支持团队。
            填写个人信息是确保系统能够为您提供最准确的建议和推荐的重要步骤。这些信息将有助于我们更好地了解您的背景和需求，以便为您提供更好的体验和服务。感谢您的合作！
        </p>
    </el-dialog>
    <div class="container">
        <div class="left-box">
            <div class="current-info">
                <h4>当前信息</h4>
                <ul class="info-body">
                    <li class="info-li" v-for="(v, k, i) in current_info" :key="i">
                        {{ k }} : {{ v }}
                    </li>
                </ul> <button class="custom-button"
                    style="margin-left: 55px;background-color: rgba(0, 123, 255, .5);color: #fff;margin-top: 10px;"
                    @click="changeinfo">修改信息</button>
            </div>

        </div>
        <div class="right-box">
            <button class="custom-button" :class="{ 'btn-zhankai': expand, 'btn-shouqi': !expand }" style="width: 100%;"
                @click="expand_btn">{{ expand ? '收起' : '展开' }}筛选条件</button>
            <div style="overflow: hidden;margin-top: -5px;">
                <transition name="slide-down">
                    <div class="shaixuan" v-show="expand">
                        <div class="institution-affiliation">
                            <span>院校所属 > </span>
                            <div class="tag">
                                <el-radio-group v-model="selected.location" size="large">
                                    <el-radio-button label="全部" />
                                    <el-radio-button v-for="item in schoolStore.categoryInfo.location" :label="item"
                                        :key="item" />
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="institution-affiliation">
                            <span>院校类型 > </span>
                            <div class="tag">
                                <el-radio-group v-model="selected.type" size="large">
                                    <el-radio-button label="全部" />
                                    <el-radio-button v-for="item in schoolStore.categoryInfo.type" :label="item"
                                        :key="item" />
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="institution-affiliation">
                            <span>办学类型 > </span>
                            <div class="tag">
                                <el-radio-group v-model="selected.level" size="large">
                                    <el-radio-button label="全部" />
                                    <el-radio-button v-for="item in schoolStore.categoryInfo.level" :label="item"
                                        :key="item" />
                                </el-radio-group>
                            </div>
                        </div>

                        <div class="institution-affiliation">
                            <span>院校特色 > </span>
                            <div class="tag">
                                <el-checkbox-group v-model="selected.tags" size="large">
                                    <el-checkbox-button v-for="item in schoolStore.categoryInfo.tags" :key="item"
                                        :label="item">
                                        {{ item }}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="btn-operation">
                            <a href="javascript:void(0)" class="custom-button" @click="add_btn"> <i
                                    class="iconfont icon-tianjia"></i>
                                将该志愿表添加的我的志愿</a>
                            <a href="javascript:void(0)" class="custom-button" @click="generate_btn"> <i
                                    class="iconfont icon-shengchengshili"></i> 根据筛选条件一键生成志愿</a>
                            <a href="javascript:void(0)" class="custom-button" @click="reset_btn"> <i
                                    class="iconfont icon-icon--gengxin"></i> 重置筛选条件</a>
                        </div>
                    </div>
                </transition>
            </div>


            <ul class="header-box">
                <li>编号</li>
                <li>大学名称</li>
                <li>招生计划</li>
                <li>分数</li>
                <li>位次</li>
                <li>专业名称</li>
            </ul>
            <div class="mask-box">
                <ul class="body-box">
                    <li v-for="(v, i) in recommendStore.recommendList" :key="v.id">
                        <div class="div">{{ i + 1 }}</div>
                        <div class="div">
                            <span>{{ v.university }} </span>
                            <span>院校代码: {{ v.university_code }}</span>
                        </div>
                        <div class="div">
                            <span>{{ v.num_students }} 人</span>
                        </div>
                        <div class="div">
                            <span>{{ v.score }} 分</span>
                        </div>
                        <div class="div">
                            <span>第 {{ v.ranking }} 名</span>
                        </div>
                        <div class="div">
                            <span>{{ v.major }}</span>
                            <span>专业代码: {{ v.major_code }}</span>
                        </div>
                    </li>
                </ul>
                <div class="mask" v-if="userStore.loginInfo.membership == '0'">
                    <h1><i class="iconfont icon-lock"></i> <br> 请开通VIP解锁该功能 <div @click="myformStore.setIndex(1)">
                            <RouterLink :to="'/my/myvip'">去开通 <i class="iconfont icon-icon-angle-right-dubble"></i>
                            </RouterLink>
                        </div>
                    </h1>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
//自定义按钮
.custom-button {
    color: rgba(0, 123, 255, .5);
    border: none;
    /* 设置边框样式 */
    padding: 10px 20px;
    /* 设置内边距 */
    border-radius: 5px;
    /* 设置圆角 */
    /* 添加其他样式以满足您的需求 */
}

.custom-button2 {
    background-color: rgba(0, 123, 255, .5);
    color: #fff;
}

.btn-zhankai {
    background-color: rgba(0, 123, 255, .5);
    color: #fff;
}

.btn-showqi {
    background-color: #909399;
    color: black;
}

//按钮容器
.btn-operation {
    display: flex;
    justify-content: space-between;

    button {
        width: 400px;
        background-color: #007bff;

    }
}


/* 定义进入动画 */
.slide-down-enter-active {
    animation: slide-down-enter 0.5s ease-in-out;
}

.slide-down-leave-active {
    animation: slide-down-leave 0.5s ease-in-out;
}

@keyframes slide-down-enter {
    from {
        height: 0px;
        // transform: translateY(-100%);
    }

    to {
        height: 270px;
        // transform: translateY(0);
    }
}

@keyframes slide-down-leave {
    from {
        height: 270px;
        // transform: translateY(0);
    }

    to {
        height: 0px;
        // transform: translateY(-100%);
    }
}


.container {
    display: flex;
    width: 1200px;
    margin: auto;
    background-color: #fff;

    .left-box {
        padding: 15px;
        padding-top: 110px;
        width: 230px;
        // margin-right: 20px;
        height: 500px;

        .current-info {
            // padding: 10px 0;
            border: 1px solid #f0f0f0;
            border-radius: 10px;
            margin-top: 10px;
            overflow: hidden;
            padding-bottom: 10px;

            h4 {
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: rgba(0, 123, 255, .5);
                color: #FFF;
            }
        }

        // .operation-info {
        //     border: 1px solid #909399;
        //     border-radius: 10px;
        //     padding: 10px 0;

        //     li {
        //         padding-left: 30px;
        //     }
        // }

        .info-li {
            padding-left: 30px;
            margin: 10px 0;
        }
    }

    .right-box {
        position: relative;

        .mask-box {
            position: relative;

            .mask {
                width: 100%;
                position: absolute;
                background: linear-gradient(to bottom, rgba(180, 180, 180, 0), rgba(21, 13, 13, 0.7));
                /* 渐变颜色和透明度 */
                // pointer-events: none;
                /* 避免遮挡页面内容 */
                height: 365px;
                top: 50px;
                text-align: center;
                padding-top: 100px;

                i {
                    font-size: 50px;
                }

                a {
                    color: #74afee;
                    font-size: 25px;

                    i {
                        font-size: 30px;
                    }
                }
            }
        }



        padding: 15px;
        flex: 1;
        // background-color: green;

        .header-box {
            // padding-left: 20px;
            margin-top: 10px;
            border-radius: 10px 10px 0 0;
            background-color: rgba(0, 123, 255, .5);
            color: #FFF;
            display: flex;
            height: 60px;
            line-height: 60px;

            li {
                text-align: center;
            }

            li:nth-child(1) {
                flex: 1;
            }

            li:nth-child(2) {
                flex: 3;
            }

            li:nth-child(3) {
                flex: 2;
            }

            li:nth-child(4) {
                flex: 2;
            }

            li:nth-child(5) {
                flex: 2;
            }

            li:nth-child(6) {
                flex: 3;
            }
        }

        .shaixuan {
            padding: 10px 20px 0 20px;
            border: 1px solid #d8d6d6;
            border-top: 0;
            border-radius: 0 0 10px 10px;
        }

        .body-box {
            background-color: #fff;
            // padding-left: 20px;

            li {
                width: 100%;
                display: flex;
                height: 80px;
                border-bottom: 1px dotted #909399;

                .div {
                    display: flex;
                    align-items: center;
                    justify-content: center;


                }

                .div:nth-child(1) {
                    flex: 1;
                    font-size: 20px;
                    font-weight: 700;
                }

                .div:nth-child(2) {
                    flex: 3;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;

                    span:nth-child(1) {
                        font-size: 18px;
                        font-weight: 500;
                        color: #007bff;
                    }

                    span:nth-child(2) {
                        font-size: 12px;
                        color: rgba(159, 159, 159, .7);
                    }
                }

                .div:nth-child(3) {
                    flex: 2;
                }

                .div:nth-child(4) {
                    flex: 2;
                }

                .div:nth-child(5) {
                    flex: 2;
                }

                .div:nth-child(6) {
                    span:nth-child(1) {
                        font-size: 14px;
                        font-weight: 700;
                        color: #007bff;
                    }

                    span:nth-child(2) {
                        font-size: 12px;
                        color: rgba(0, 123, 255, .5);
                    }

                    flex: 3;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                }
            }
        }
    }
}

::v-deep .el-checkbox-button.is-disabled.is-checked .el-checkbox-button__inner {
    background-color: #F2F6FC;
}

::v-deep .el-input__wrapper {
    margin-right: 10px;
}





//筛选条件样式
.institution-affiliation {
    display: flex;
    margin-bottom: 10px;

    span {
        padding-top: 8px;
    }

    .tag {
        flex: 1;
    }
}

::v-deep .el-radio-button--large .el-radio-button__inner {
    padding: 6px 5px 7px 5px;
    margin: 5px;
    border: 0;
}

::v-deep .el-radio-button__original-radio:checked+.el-radio-button__inner {
    background-color: #fff;
    color: var(--el-color-primary);
    box-shadow: none;
}

::v-deep .el-checkbox-button {
    --el-checkbox-button-checked-bg-color: var(--el-color-white);
    --el-checkbox-button-checked-text-color: var(--el-color-primary);
}

::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
    box-shadow: none;
}

::v-deep .el-checkbox-button__inner {
    border: none;
    margin: 5px;
}

::v-deep .el-checkbox-button--large .el-checkbox-button__inner {
    padding: 6px 5px 7px 5px;
}

::v-deep .el-checkbox-button:first-child .el-checkbox-button__inner {
    border: none;
}
</style>