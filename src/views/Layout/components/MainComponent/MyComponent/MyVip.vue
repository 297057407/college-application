<script setup >
import { ElLoading, ElMessage } from 'element-plus'
import "element-plus/theme-chalk/el-loading.css";
import 'element-plus/es/components/message/style/css'
import { ref } from 'vue'
const radio2 = ref('2')
const loadEl = ref(null)
const buyvip = async () => {
    console.log(1);
    const loading = ElLoading.service({
        text: '支付中',
        target: loadEl.value
    })
    await new Promise((resolved) => {
        setTimeout(() => {
            resolved()
        }, 2000);
    })
    ElMessage.success('支付成功')
    dialogFormVisible.value = false
    loading.close()
}
const dialogFormVisible = ref(false)
const click_close = ref(false)
</script>
<template>
    <div class="contarin-box">
        <div class="left-box">
            <h3><i class="iconfont icon-dujia"></i> 志愿填报VIP卡权益</h3>
            <ul>
                <li> <i class="iconfont icon-zonghepingjia"></i> 一键智能填报</li>
                <li> <i class="iconfont icon-daochu"></i> 志愿表一键导出</li>
                <li> <i class="iconfont icon-chuangkexianzhi"></i> 不限次数生成志愿表</li>
                <li> <i class="iconfont icon-ziyuan"></i> 独家资源和信息</li>
                <li> <i class="iconfont icon-shequ"></i> VIP专属社区互动</li>
                <li> <i class="iconfont icon-kefu"></i> 优先客服支持</li>
            </ul>
        </div>
        <div class="right-box">
            <h1>我的志愿卡 <i class="iconfont icon-huiyuanka" style="font-size: 26px;color:#ff6b00"></i> </h1>
            <hr>
            <div class="vip-box">
                <div class="novip">
                    <h2>您未拥有VIP卡</h2>
                    <div class="card">
                        <h3>志愿填报</h3>
                        <h1 style="font-size: 100px;">VIP</h1>
                        <div class="vip-text">
                            有效期至: 2024-01-01
                        </div>
                    </div>
                    <div style="padding-top: 50px;padding-left: 40px;margin-bottom: 50px;">
                        <span style="color:#ff6b00;font-size: 16px;margin-right: 10px;">志愿填报VIP卡: </span>
                        <el-radio-group v-model="radio2">
                            <el-radio style="margin-right: 60px;" label="1" border>月卡: <span class="new">￥9.9</span> <span
                                    class="old">￥20</span> </el-radio>
                            <el-radio label="2" border><i class="iconfont icon-renqiredu" style="color: red;"></i> 年卡：<span
                                    class="new">￥99.9</span> <span class="old">￥200</span>
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <button class="custom-btn" @click="dialogFormVisible = true">立即购买</button>
                </div>
            </div>
        </div>
        <el-dialog :close-on-click-modal="click_close" v-model="dialogFormVisible" title="购买VIP卡" width="30%">
            <div ref="loadEl">
                <div style="margin-bottom: 20px;">请选择支付方式 : </div>
                <div class="zhifu">

                    <div class="erweima">
                        <div class="zhifuimg" @click="buyvip">点击模拟扫码</div>
                        <!-- <input type="radio" name="zhifu" id=""> -->
                        <div>微信支付</div>
                    </div>
                    <div class="erweima">
                        <div class="zhifuimg" @click="buyvip">点击模拟扫码</div>
                        <!-- <input type="radio" name="zhifu" id=""> -->
                        <div>支付宝支付</div>
                    </div>
                </div>
                <!-- <button>付款</button> -->
            </div>
        </el-dialog>
    </div>
</template>
<style scoped lang="scss">
.zhifu {
    display: flex;
    justify-content: space-evenly;

    .erweima {
        text-align: center;

        .zhifuimg {
            width: 100px;
            height: 100px;
            line-height: 100px;
            margin-bottom: 10px;
            border: 1px solid black;
        }
    }
}

.contarin-box {
    width: 100%;
    display: flex;
    padding: 15px;

    h2 {
        text-align: center;
        height: 60px;
        line-height: 90px;
    }

    .left-box {
        padding: 30px 10px;
        width: 200px;
        margin-right: 30px;

        h3 {
            color: #6a280c;
            text-align: center;
            margin-bottom: 20px;
        }

        ul {
            padding-left: 5px;

            li {
                padding-left: 20px;
                margin: 10px 0;
                height: 50px;
                line-height: 50px;
                background-color: #fffbf2;
                border-radius: 10px;
            }
        }
    }

    .right-box {
        flex: 1;

        h1 {
            font-size: 26px;
        }

        .vip {
            h2 {
                color: #ff6b00;
            }
        }


        .novip {

            .card {
                margin: auto;
                width: 500px;
                height: 250px;
                background: linear-gradient(to right, #ff6600, #e9509c);
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
                color: white;
                text-align: center;
                padding: 20px;
                font-size: 20px;
                font-weight: bold;
                text-transform: uppercase;
            }

            h2 {
                color: #d7d7d7;
            }

            width: 100%;
            height: 300px;
            border-radius: 20px;
            position: relative;

            .new {
                font-size: 16px;
                color: #ff6b00;
            }

            .old {
                color: #9f9f9f;
                text-decoration: line-through;
                font-size: 14px;
            }

            .custom-btn {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 200px;
                background-color: #ff6b00;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-bottom: 30px;
            }
        }

        // background-color: skyblue;
    }
}
</style>