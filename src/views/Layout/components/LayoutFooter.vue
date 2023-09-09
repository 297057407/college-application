<template>
    <div class="footer">


        <div class="container">
            <div class="nav ">
                <h3>简介</h3>
                <ul>
                    <li><a title="媒体报道" target="_blank">媒体报道</a></li>
                    <li><a title="关于我们" target="_blank">关于我们</a></li>
                    <li><a title="联系我们" target="_blank">联系我们</a></li>
                    <li><a title="版本日志" target="_blank">版本日志</a></li>
                </ul>
            </div>

            <div class="nav ">
                <h3>新手帮助</h3>
                <ul>
                    <li><a title="院校查找" target="_blank">院校查找</a></li>
                    <li><a title="专业查找" target="_blank">专业查找</a></li>
                    <li><a title="学校排名" target="_blank">学校排名</a></li>
                    <li><a title="智能生成志愿" target="_blank">智能生成志愿</a></li>
                </ul>
            </div>

            <div class="nav ">
                <h3>常见问题</h3>
                <ul>
                    <li><a title="忘记登录密码" target="_blank">忘记登录密码</a></li>
                    <li><a title="在线支付问题" target="_blank">在线支付问题</a></li>
                    <li><a title="注册问题" target="_blank">注册问题</a></li>
                    <li><a title="VIP权限说明" target="_blank">VIP权限说明</a></li>
                </ul>
            </div>

            <div class="nav ">
                <h3>官方声明</h3>
                <ul>
                    <li><a title="意见反馈" target="_blank">意见反馈</a></li>
                    <li><a title="用户协议" target="_blank">用户协议</a></li>
                    <li><a title="免责声明" target="_blank">免责声明</a></li>
                    <li><a title="法律声明" target="_blank">法律声明</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.footer {
    height: 200px;
    background-color: #f2f2f2; /* 与主体背景颜色保持一致 */
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 在底部添加浅阴影效果 */

    .container {
        padding-top: 20px;
        width: 1200px;
        margin: auto;
        display: flex;
        justify-content: space-evenly;

        .nav {
            color: #666;

            h3 {
                margin-bottom: 10px;
            }

            ul {

                li {
                    height: 30px;
                    line-height: 30px;

                    a {
                        color: #8f8f8f;
                    }
                }
            }
        }
    }
}</style>
