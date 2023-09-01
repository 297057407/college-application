<script setup>
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
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
//控制弹出框
const dialogFormVisible = ref(true)
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


onMounted(async () => {
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
            类型: `${form.value.exam_type}类`
        }
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

            <!-- 
            <el-form-item label="学校名" prop="high_school">
                <div style="width: 230px;"><el-input v-model="form.high_school" placeholder="请填写学校" />
                </div>
            </el-form-item> -->

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
    </el-dialog>
    <div class="container">
        <div class="left-box">
            <ul class="operation-info">
                <li>一键生成</li>
                <li>智能推荐</li>
                <li>我的志愿表</li>
            </ul>
            <div class="current-info">
                <h4 style="text-align: center;">当前信息</h4>
                <ul class="info-body">
                    <li class="info-li" v-for="(v, k, i) in current_info" :key="i">
                        {{ k }} : {{ v }}
                    </li>
                </ul>
                <el-button type="primary" style="margin-left: 55px;" @click="changeinfo">修改信息</el-button>
            </div>

        </div>
        <div class="right-box">
            <ul class="header-box">
                <li>录取概率</li>
                <li>招生院校专业组</li>
                <li>院校代码</li>
                <li>分数</li>
                <li>操作</li>
            </ul>
            <ul class="body-box">
                <li>
                    <div class="div">
                        <span class="chance">50% 稳</span>
                    </div>
                    <div class="div">
                        <h4>清华大学</h4>
                        <div><span>公办</span></div>
                    </div>
                    <div class="div">A003</div>
                    <div class="div">699</div>
                    <div class="div"><el-button style="color: #1d7efe;border-color: #1d7efe;">查看可选专业</el-button></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    width: 100%;

    .left-box {
        padding: 15px;
        width: 230px;
        margin-right: 20px;
        height: 500px;
        background-color: pink;

        .current-info {
            padding: 10px 0;
            border: 1px solid #666;
            border-radius: 10px;
            margin-top: 10px;
        }

        .operation-info {
            border: 1px solid #666;
            border-radius: 10px;
            padding: 10px 0;
            li {
                padding-left: 30px;
            }
        }

        .info-li {
            padding-left: 30px;
            margin: 10px 0;
        }
    }

    .right-box {
        padding: 15px;
        flex: 1;
        height: 500px;
        background-color: green;

        .header-box {
            display: flex;
            height: 60px;
            line-height: 60px;
            background-color: pink;

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
                flex: 3;
            }
        }

        .body-box {
            display: flex;
            background-color: #fff;

            li {
                width: 100%;
                display: flex;
                height: 80px;
                line-height: 80px;

                .div:nth-child(1) {
                    flex: 1;

                    .chance {
                        padding: 5px 10px;
                        background-color: #e2f0ff;
                        border-radius: 5px;
                        color: #1d7efe;
                    }
                }

                .div:nth-child(2) {
                    flex: 3;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    div {
                        line-height: 1;
                    }

                    h4 {
                        line-height: 1;
                        margin-bottom: 10px;
                    }
                }

                .div:nth-child(3) {
                    flex: 2;
                }

                .div:nth-child(4) {
                    flex: 2;
                }

                .div:nth-child(5) {
                    flex: 3;
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
</style>