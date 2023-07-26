<script setup>
import { ref } from 'vue'

// do not use same name with ref
const form = ref({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const onSubmit = () => {
    console.log('submit!')
}

//表单编辑
const disabled = ref(true)

</script>
<template>
    <div class="countain">
        <div class="header">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>账号信息</span>
                        <el-button class="button" text>Operation button</el-button>
                    </div>
                </template>
                <ul>
                    <li class="card-item">头像</li>
                    <li class="card-item">昵称</li>
                    <li class="card-item">账号</li>
                    <li class="card-item">修改密码</li>
                    <li class="card-item">注销账号</li>
                </ul>
            </el-card>
        </div>
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>学生信息</span>
                        <el-button @click="disabled = false" class="button" text v-show="disabled"> <i class="iconfont icon-bianji-"></i>&nbsp; 编辑</el-button>
                        <el-button @click="disabled = true" class="button" text v-show="!disabled"> <i class="iconfont icon-quxiao"></i>&nbsp; 取消</el-button>
                    </div>
                </template>
                <el-form :model="form" label-width="120px" :disabled="disabled" ref="formEl"> 
                    <el-form-item label="身份信息">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="学生" />
                            <el-radio label="家长" />
                            <el-radio label="其他" />
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="生源地">
                        <el-select v-model="form.region" placeholder="省">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                        <el-select v-model="form.region" placeholder="市">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                        <el-select v-model="form.region" placeholder="区">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="学校名">
                        <el-select v-model="form.region" placeholder="请选择所在高中">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="年级">
                        <el-radio-group v-model="radio2">
                            <el-radio-button label="高一" />
                            <el-radio-button label="高二" />
                            <el-radio-button label="高三" />
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="选科">
                        <el-checkbox-group v-model="checkboxGroup2" :min="3" :max="3">
                            <el-checkbox-button>物理</el-checkbox-button>
                            <el-checkbox-button>化学</el-checkbox-button>
                            <el-checkbox-button>生物</el-checkbox-button>
                            <el-checkbox-button>政治</el-checkbox-button>
                            <el-checkbox-button>历史</el-checkbox-button>
                            <el-checkbox-button>地理</el-checkbox-button>
                        </el-checkbox-group>

                    </el-form-item>

                    <el-form-item label="分数">
                        <el-input-number v-model="num" class="mx-4" :min="1" :max="1000" controls-position="right"
                            @change="handleChange" />
                    </el-form-item>

                    <el-form-item label="位次">
                        <el-input-number v-model="num" class="mx-4" :min="1" :max="1000" controls-position="right"
                            @change="handleChange" />
                    </el-form-item>


                    <el-form-item label="考生类型">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="普通类" />
                            <el-radio label="艺术类" />
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<style scoped lang="scss">


::v-deep .el-input__wrapper{
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

    .card-item {
        margin: 30px;
    }
}
</style>