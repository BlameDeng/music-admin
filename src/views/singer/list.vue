<template>
    <div class="singer-list">
        <div class="singer-nav">
            <div class="lang">
                <span>语种：</span>
                <span>全部</span>
                <span>华语</span>
                <span>欧美</span>
                <span class="active">日本</span>
                <span>韩国</span>
                <span>其他</span>
            </div>
            <div class="type">
                <span>分类：</span>
                <span>全部</span>
                <span>男歌手</span>
                <span class="active">女歌手</span>
                <span>乐队组合</span>
            </div>
            <div class="filter">
                <span>筛选：</span>
                <span class="hot">热门</span>
                <span v-for="n in letters" :key="n" class="active">{{n|upper}}</span>
            </div>
        </div>
        <div class="singers">
            <div class="singer">
                <img src="@/assets/avatar.jpg" alt="avatar">
                <p><span>xxx</span>
                <img src="@/assets/person.png">
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SingerList",
        data() {
            return { letters: 'abcdefghijklmnopqrstuvwxyz' }
        },
        filters: {
            upper(val) {
                return val.toUpperCase();
            }
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .singer-list {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        >.singer-nav {
            font-size: 12px;
            padding: 10px 0;
            border-bottom: .5px solid $border;
            >div {
                padding: 5px;
                line-height: 2em;
            }
            div.filter {
                >span {
                    &::after {
                        display: none;
                    }
                    &.hot {
                        &::after {
                            content: '';
                            display: block;
                            width: 0;
                            height: 100%;
                            border-right: 1px solid $border;
                            position: absolute;
                            top: 0;
                            right: -7px;
                        }
                    }
                }
            }
            span {
                padding: 3px 6px;
                position: relative;
                margin: 0 5px;
                cursor: pointer;
                border-radius: 3px;
                user-select: none;
                &.active {
                    background: $sub;
                    color: #fff;
                }
                &::after {
                    content: '';
                    display: block;
                    width: 0;
                    height: 100%;
                    border-right: 1px solid $border;
                    position: absolute;
                    top: 0;
                    right: -7px;
                }
                &:first-child {
                    &::after {
                        display: none;
                    }
                }
                &:last-child {
                    &::after {
                        display: none;
                    }
                }
            }
        }
    }
</style>