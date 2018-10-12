<template>
    <div class="header">
        <div class="logo">
            <x-icon name="logo" class="logo-icon"></x-icon>
            <span class="logo-text">后台管理系统</span>
        </div>
        <div class="user-bar">
            <Icon type="md-menu" size="25" style="cursor:pointer;" />
            <div class="user-info" @click="onUserInfo">
                <span class="user-name">admin</span>
                <img src="../../assets/avatar.jpg" alt="avatar" class="user-avatar">
                <transition name="fade">
                    <ul class="popover" v-show="popoverVisible">
                        <li>我的消息</li>
                        <li>个人设置</li>
                        <li>退出登录</li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from '../icon.vue'
    export default {
        name: 'Header',
        components: { xIcon },
        data() {
            return { popoverVisible: false }
        },
        methods: {
            onUserInfo() {
                this.popoverVisible = !this.popoverVisible;
            },
            listenDocument() {
                this.popoverVisible = false;
            }
        },
        watch: {
            popoverVisible(val) {
                val ? document.addEventListener('click', this.listenDocument) : document.removeEventListener('click', this.listenDocument);
            }
        },
        beforeDestroy() {
            document.removeEventListener('click', this.listenDocument);
        },
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
            justify-content: space-between;
            align-items: center;
            padding: 0 40px 0 20px;
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
                    margin-left: 10px;
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