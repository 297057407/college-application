<script setup>
const props = defineProps({
    name: String,
    location: String,
    tags: Array,
})
</script>

<template>
    <li class="li-panel">
        <div class="rank">
            <!-- <v-slot></v-slot> -->
        </div>
        <div class="img"><img src="@/assets/images/140.jpg" alt=""></div>
        <div class="info">
            <div class="info-top"><span class="info-name">{{ props.name }}</span><span class="info-location">{{
                props.location }}</span></div>
            <div class="flex flex-wrap gap-2 my-2">
                <el-tag v-for="item in props.tags" :key="item" class="mx-1" effect="dark" round>
                    {{ item }}
                </el-tag>
            </div>
        </div>
        <div class="btn">
           <slot name="btn"></slot>
        </div>
    </li>
</template>

<style scoped lang="scss">
.li-panel {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d2d1d1;

    .rank {
        width: 30px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin-right: 30px;
    }

    .img {
        border-radius: 50%;
        overflow: hidden;
        width: 60px;
        height: 60px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .info {
        padding: 18px 50px;
        padding-right: 0;
        flex: 1;
        height: 100%;

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
        width: 300px;
    }

    .el-tag {
        margin: 15px 10px 0 0;
    }
}
</style>