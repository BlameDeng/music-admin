<template>
    <div class="login">
        <div class="info">
            <h3>系统登录</h3>
            <div>
                <Input style="width: 100%;" v-model.trim="username">
                <Icon type="ios-contact" slot="prefix" />
                </Input>
            </div>
            <div>
                <Input placeholder="请输入密码" style="width: 100%;" type="password" v-model.trim="password">
                <Icon type="ios-lock" slot="prefix" />
                </Input>
            </div>
            <Button type="primary" @click="onLogin">登 录</Button>
            <div class="tips">
                <span>账号：admin</span><span>密码：任意</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    export default {
        name: "Login",
        data() {
            return { username: 'admin', password: '123456' }
        },
        methods: {
            ...mapMutations(['setLogin']),
            onLogin() {
                if (this.username !== 'admin') {
                    this.$Message.error('用户名不正确！');
                    return
                }
                this.setLogin();
                this.$router.push('/index');
            }

        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .login {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: darken($p, 30%);
        z-index: 1000;
        color: $bg;
        >.info {
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 450px;
            height: 300px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: stretch;
            >h3 {
                font-size: 22px;
                text-align: center;
                line-height: 1.4em;
            }
            >.tips {
                text-align: center;
                >span {
                    &:last-child {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
</style>