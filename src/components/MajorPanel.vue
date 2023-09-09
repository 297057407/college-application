<script setup>
const props = defineProps({
    item : Object
})
</script>

<template>
    <li class="li-panel">
        <div class="info">
            <div class="info-top"><span class="info-name">{{ props.item.major_name}}</span><slot name="people"></slot>
            </div>
            <div class="tags">
                <el-tag>
                    专业代码:{{ props.item.major_code }}
                </el-tag>
                <el-tag>
                    修业年限:{{ props.item.study_years }}
                </el-tag>
                <el-tag>
                    授予学位:{{ props.item.degree_granted }}
                </el-tag>
                <el-tag>
                    男女比例:{{ props.item.gender_ratio }}
                </el-tag>
            </div>
        </div>
        <div class="btn">    
         <i class="iconfont icon-qian"></i><span class="salary">平均薪资:￥<i>{{ props.item.average_salary }}</i></span>
            <slot name="btn"></slot>
            <!-- <el-button type="success">开设院校</el-button> -->
        </div>
    </li>
</template>

<style scoped lang="scss">
.salary {
    font-size: 12px;
    color: #666;
    margin: 0 15px 0 4px;
}
.li-panel {
    // width: 780px;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d2d1d1;
    .info {
        width: 700px;
        padding: 18px 10px;
        height: 100%;
        .tags {
            display: flex;
            width: 475px;
            flex-wrap: nowrap;
            overflow: hidden;
        }
        .tags:hover {
            overflow: visible;
        }
        .info-top {
            .info-name {
                font-size: 18px;
                line-height: 20px;
                font-weight: 600;
                cursor: pointer;
            }

            .info-location {
                margin-left: 30px;
                font-size: 12px;
                padding: 3px 10px;
                border: 1px solid rgb(220, 217, 217);
            }
        }

    }

    .btn {
        display: flex;
        justify-content: space-between;
        width: 320px;
        align-items: center;
    }

    .el-tag {
        margin: 15px 10px 0 0;
    }
}
</style>