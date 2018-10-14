<template>
    <div class="header">
        <div class="logo">
            <x-icon name="logo" class="logo-icon"></x-icon>
            <span class="logo-text">后台管理系统</span>
        </div>
        <div class="user-bar">
            <span class="message" @click="onMessage">
                <x-icon name="message" class="icon"></x-icon>
                <span class="count"></span>
            </span>
            <div class="user-info" @click="onUserInfo">
                <img src="../../assets/avatar.jpg" alt="avatar" class="user-avatar">
                <span class="user-name">admin</span>
                <transition name="fade">
                    <ul class="popover" v-show="popoverVisible">
                        <li>项目简介</li>
                        <li @click="onLogout">退出登录</li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from '../icon.vue'
    import { mapMutations } from 'vuex'
    export default {
        name: 'Header',
        components: { xIcon },
        data() {
            return { popoverVisible: false }
        },
        methods: {
            ...mapMutations(['logout']),
            onUserInfo() {
                this.popoverVisible = !this.popoverVisible;
            },
            listenDocument() {
                this.popoverVisible = false;
            },
            onLogout() {
                this.logout();
                this.$router.push('/');
            },
            onMessage() {
                this.$router.push('/index/message');
            }
        },
        watch: {
            popoverVisible(val) {
                val ? document.addEventListener('click', this.listenDocument) : document.removeEventListener('click', this.listenDocument);
            }
        },
        beforeDestroy() {
            document.removeEventListener('click', this.listenDocument);
        }
    }
</script>
<style scoped lang="scss">
    @import '@/assets/base.scss';
    .header {
        background: $p;
        width: 100%;
        height: 100%;
        color: #fff;
        display: flex;
        >.logo {
            width: 150px;
            height: 100%;
            border-right: .5px solid $border;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 5px;
            flex-shrink: 0;
            transition: all .3s;
            >.logo-icon {
                animation: circle 6s linear infinite;
            }
            >.logo-text {
                margin-left: 5px;
            }
        }
        >.user-bar {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 40px 0 20px;
            >.message {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                position: relative;
                margin-right: 10px;
                cursor: pointer;
                >.icon {
                    width: 22px;
                    height: 22px;
                }
                >.count {
                    position: absolute;
                    top: 0;
                    right: -5px;
                    padding: 4px;
                    background: $error;
                    border-radius: 50%;
                }
            }
            >.user-info {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                cursor: pointer;
                position: relative;
                >.user-name {
                    font-size: 15px;
                }
                >.user-avatar {
                    width: 40px;
                    height: 40px;
                    vertical-align: top;
                    border-radius: 50%;
                    margin: 0 5px;
                }
                >.popover {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    z-index: 5;
                    background: #fff;
                    margin-top: 15px;
                    width: calc(100% + 10px);
                    margin-left: -10px;
                    border: 1px solid $border;
                    color: $content;
                    border-radius: 4px;
                    user-select: none;
                    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
                    >li {
                        padding: 5px 0 5px 10px;
                        font-size: 12px;
                        &:hover {
                            background: $bg;
                        }
                        &:first-child {
                            border-top-left-radius: 4px;
                            border-top-right-radius: 4px;
                        }
                        &:last-child {
                            border-bottom-left-radius: 4px;
                            border-bottom-right-radius: 4px;
                        }
                    }
                }
            }
        }
    }
    @keyframes circle {
        from {
            transform: rotateZ(0);
        }
        to {
            transform: rotateZ(360deg);
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-to, .fade-leave {
        opacity: 1;
    }
</style>