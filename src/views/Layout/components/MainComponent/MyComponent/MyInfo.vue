<script setup>
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { nextTick } from 'vue'
import router from '@/router'
const userStore = useUserStore()
//组件对象
const formEl = ref(null)
//form双向绑定对象
const form = ref({
    user_id: "99",
    province: '山东省',
    city: '济南市',
    high_school: "",
    grade: "",
    subject: [],
    score: '',
    score_rank: '',
    exam_type: "艺术"
})

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
    high_school: [
        { required: true, message: '请填写学校', trigger: 'blur' },
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



//提交表单
const submitForm = async (formEl) => {

    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (!userStore.loginInfo.user_id) ElMessage.warning("请先登录")
        else {
            if (valid) {
                //修改用户信息
                console.log(form.value);
                await userStore.addInformation(form.value)
                await userStore.getInformation({ user_id: userStore.loginInfo.user_id })
                ElMessage({
                    message: '保存成功',
                    type: 'success',
                })
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
}

//表单是否编辑
const disabled = ref(true)
//昵称是否编辑
const nickable = ref(false)
const nickname = ref('')
//密码是否编辑
const passable = ref(false)
const password = ref('')
onMounted(async () => {
    //获取用户信息赋值为form
    if (!userStore.loginInfo.user_id) ElMessage.warning("请先登录")
    else {
        await userStore.getInformation({ user_id: userStore.loginInfo.user_id })
        form.value = JSON.parse(JSON.stringify(userStore.userInfo))
    }
})
//昵称输入框
const nickinput = ref(null)
//密码输入框
const passinput = ref(null)
//点击编辑昵称
const nickone = () => {
    nickable.value = true
    nickname.value = userStore.loginInfo.nickname
    nextTick(() => {
        // 这里可以执行在 DOM 更新后的操作
        nickinput.value.focus()
    });
}
//点击保存昵称
const nicktwo = async () => {
    nickable.value = false
    await userStore.updateNickname({ user_id: userStore.loginInfo.user_id, nickname: nickname.value || '' })
    await userStore.getUser({ user_id: userStore.loginInfo.user_id })
}
// //昵称输入框失去焦点
// const nickblur = () => {
//     nickable.value = false
// }
//点击编辑密码
const passone = () => {
    passable.value = true
    password.value = userStore.loginInfo.password
    nextTick(() => {
        // 这里可以执行在 DOM 更新后的操作
        passinput.value.focus()
    });
}
//点击保存密码
const passtwo = async () => {
    passable.value = false
    await userStore.revisePassword({ user_id: userStore.loginInfo.user_id, password: password.value || '' })
    await userStore.getUser({ user_id: userStore.loginInfo.user_id })
}
// //密码输入框失去焦点
// const passblur = () => {
//     passable.value = false
// }
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
//删除账户
const delete_account = () => {
    dialogFormVisible.value = true
    depassword.value = ''
}

const dialogFormVisible = ref(false)

const depassword = ref('')
const confirm_btn = async () => {
    const res = await userStore.deleteUser({
        user_id: userStore.loginInfo.user_id,
        password: depassword.value
    })
    if (res.message === '注销成功') {
        userStore.exit()
        router.replace('/')
        ElMessage.success(res.message)
    } else {
        ElMessage.error(res.message)

    }

}
</script>
<template>
    <el-dialog v-model="dialogFormVisible" title="请输入您的密码来注销账户" width="30%">
        <el-form :model="form">
            <el-form-item label="请输入密码" :label-width="formLabelWidth">
                <el-input type="password"  v-model="depassword" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button @click="confirm_btn">
                    <i class="iconfont icon--zhongdaweixian" style="color:red"> </i>&nbsp;确定注销
                </el-button>
            </span>
        </template>
    </el-dialog>
    <div class="countain">
        <div class="header">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>账号信息</span>
                        <!-- <el-button class="button" text>Operation button</el-button> -->
                    </div>
                </template>
                <el-form label-width="120px">
                    <el-form-item class="avator_container" label="头像">
                        <span class="avator"><img
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></span>
                    </el-form-item>
                    <el-form-item label="账号">
                        <span class="padding-left-20px"> {{ userStore.loginInfo.username }}</span>
                    </el-form-item>
                    <el-form-item label="昵称">

                        <span class="padding-left-20px" v-if="!nickable">{{ userStore.loginInfo.nickname }} <el-button
                                @click="nickone" class="button" text> <i class="iconfont icon-bianji-"></i>&nbsp;
                                编辑</el-button></span>
                        <span class="padding-left-20px" v-else style="display: flex;"><el-input v-model="nickname"
                                @blur="nickblur" ref="nickinput" placeholder="Please input" /><el-button @click="nicktwo"
                                class="button" text> <i class="iconfont icon-Save"></i>&nbsp;保存</el-button><el-button
                                @click="nickable = false" class="button" text> <i class="iconfont icon-quxiao"></i>&nbsp;
                                取消</el-button></span>
                    </el-form-item>

                    <el-form-item label="修改密码">
                        <span class="padding-left-20px" v-if="!passable">******<el-button @click="passone" class="button"
                                text>
                                <i class="iconfont icon-bianji-"></i>&nbsp; 编辑</el-button></span>
                        <span class="padding-left-20px" v-else style="display: flex;"><el-input v-model="password"
                                @blur="passblur" ref="passinput" placeholder="Please input" /><el-button @click="passtwo"
                                class="button" text><i class="iconfont icon-Save"></i>&nbsp;保存</el-button><el-button
                                @click="passable = false" class="button" text> <i class="iconfont icon-quxiao"></i>&nbsp;
                                取消</el-button></span>
                    </el-form-item>
                    <el-form-item style="margin-top: 30px;padding-left: 15px;">
                        <el-button type="danger" @click="delete_account">注销账户</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div>

            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>学生信息</span>
                        <el-button @click="disabled = false" class="button" text v-show="disabled"> <i
                                class="iconfont icon-bianji-"></i>&nbsp; 编辑</el-button>
                        <el-button @click="disabled = true" class="button" text v-show="!disabled"> <i
                                class="iconfont icon-quxiao"></i>&nbsp; 取消</el-button>
                    </div>
                </template>
                <el-form :model="form" :rules="rules" ref="formEl" label-width="120px" :disabled="disabled">

                    <el-form-item label="省" prop="province">

                        <!-- <el-form-item label="生源地" prop="hometown"> -->
                        <el-select v-model="form.province" placeholder="省" @change="form.city = ''">
                            <el-option v-for="(item, key) in userStore.provinceInfo" :key="key" :label="key" :value="key" />
                        </el-select>

                    </el-form-item>
                    <el-form-item label="市" prop="city">
                        <el-select v-model="form.city" placeholder="市">
                            <el-option v-for="(item, index) in userStore.provinceInfo[form.province]" :key="index"
                                :label="item" :value="item" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="学校名" prop="high_school">
                        <div style="width: 230px;"><el-input v-model="form.high_school" placeholder="请填写学校" />
                        </div>
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
                        <el-button type="primary" @click="submitForm(formEl)">保存信息</el-button>
                        <el-button @click="resetForm(formEl)">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<style scoped lang="scss">
::v-deep .avator_container .el-form-item__label {
    height: 60px;
    line-height: 60px;
}

.padding-left-20px {
    padding-left: 20px;
}

::v-deep .el-checkbox-button.is-disabled.is-checked .el-checkbox-button__inner {
    background-color: #F2F6FC;
}

::v-deep .el-input__wrapper {
    margin-right: 10px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.countain {
    width: 100%;
    padding-right: 30px;
}

.box-card {
    width: 100%;
    margin: 20px 0;
    padding: 10px 30px;


    .avator {
        margin-left: 20px;
        display: inline-block;
        width: 60px;
        height: 60px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
        }
    }
}

//注销账户弹出框
.el-button--text {
    margin-right: 15px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>