<template>
    <div class="singer-list">
        <div class="singer-nav">
            <div class="lang">
                <span>语种：</span>
                <span :class="{active:filterArray[0]==='all'}" @click="onClickFilter('lang','all')">全部</span>
                <span :class="{active:filterArray[0]==='华语'}" @click="onClickFilter('lang','华语')">华语</span>
                <span :class="{active:filterArray[0]==='欧美'}" @click="onClickFilter('lang','欧美')">欧美</span>
                <span :class="{active:filterArray[0]==='日本'}" @click="onClickFilter('lang','日本')">日本</span>
                <span :class="{active:filterArray[0]==='韩国'}" @click="onClickFilter('lang','韩国')">韩国</span>
                <span :class="{active:filterArray[0]==='其他'}" @click="onClickFilter('lang','其他')">其他</span>
            </div>
            <div class="type">
                <span>分类：</span>
                <span :class="{active:filterArray[1]==='all'}" @click="onClickFilter('type','all')">全部</span>
                <span :class="{active:filterArray[1]==='male'}" @click="onClickFilter('type','male')">男歌手</span>
                <span :class="{active:filterArray[1]==='female'}" @click="onClickFilter('type','female')">女歌手</span>
                <span :class="{active:filterArray[1]==='group'}" @click="onClickFilter('type','group')">乐队组合</span>
            </div>
            <div class="filter">
                <span>筛选：</span>
                <span class="all" @click="onClickFilter('letter','all')" :class="{active:filterArray[2]==='all'}">全部</span>
                <span v-for="letter in letters" :key="letter" :class="{active:filterArray[2]===letter.toUpperCase()}" @click="onClickFilter('letter',letter.toUpperCase())">{{letter.toUpperCase()}}</span>
                <span @click="onClickFilter('letter','#')" :class="{active:filterArray[2]==='#'}">#</span>
            </div>
        </div>
        <div class="singers">
            <template v-if="singerList&&singerList.length">
                <div class="singer" v-for="singer in singerList" :key="singer.id" @click="onClickSinger(singer)">
                    <div class="avatar">
                        <img :src="singer.avatar" alt="avatar">
                    </div>
                    <p class="name">
                        <span>{{singer.name||singer.othernames}}</span>
                        <img src="@/assets/person.png">
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "SingerList",
        data() {
            return { letters: "abcdefghijklmnopqrstuvwxyz", filterArray: ['all', 'all', 'all'] };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
                allSheets: state => state.sheet.allSheets,
                allSingers: state => state.singer.allSingers
            }),
            singerList() {
                let copy = JSON.parse(JSON.stringify(this.allSingers));
                this.filterArray[0] === 'all' ? '' : copy = copy.filter(song => song.lang === this.filterArray[0]);
                this.filterArray[1] === 'all' ? '' : copy = copy.filter(song => song.type === this.filterArray[1]);
                this.filterArray[2] === 'all' ? '' : copy = copy.filter(song => song.firstLetter === this.filterArray[2]);
                return copy;
            }
        },
        methods: {
            onClickFilter(tab, name) {
                tab === 'lang' ? this.$set(this.filterArray, 0, name) : '';
                tab === 'type' ? this.$set(this.filterArray, 1, name) : '';
                tab === 'letter' ? this.$set(this.filterArray, 2, name) : '';
            },
            onClickSinger(singer) {
                this.$router.push({
                    path: './list/detail',
                    query: { id: singer.id }
                })
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .singer-list {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        padding-top: 122.5px;
        >.singer-nav {
            font-size: 12px;
            padding: 10px 0;
            border-bottom: 0.5px solid $border;
            margin-top: -122.5px;
            >div {
                padding: 5px;
                line-height: 2em;
            }
            div.filter {
                >span {
                    &::after {
                        display: none;
                    }
                    &.all {
                        &::after {
                            content: "";
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
                    content: "";
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
        >.singers {
            padding: 10px;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            align-content: flex-start;
            >.singer {
                width: 100px;
                color: $content;
                flex-shrink: 0;
                margin-right: 10px;
                cursor: pointer;
                >.avatar {
                    width: 100px;
                    height: 100px;
                    >img {
                        width: 100px;
                        height: 100px;
                        vertical-align: top;
                        border-radius: 2px;
                    }
                }
                >.name {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 2px;
                    >span {
                        font-size: 12px;
                        margin: 5px 0;
                    }
                    >img {
                        width: 15px;
                        height: 15px;
                    }
                }
            }
        }
    }
</style>