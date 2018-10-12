<template>
    <div class="index-scan">
        <div class="info">
            <div class="admin">
                <div class="user-wrapper">
                    <div class="user">
                        <img src="@/assets/avatar.jpg" alt="avatar">
                        <div class="user-info">
                            <p>admin</p>
                            <span>系统管理员</span>
                        </div>
                    </div>
                    <div class="time">
                        <div class="last">上次登录时间：2018-01-01</div>
                        <div class="pos">上次登录地点：北京</div>
                    </div>
                </div>
            </div>
            <div class="lang">
                <div class="title">语言详情</div>
                <div class="vue">
                    <p>Vue</p>
                    <div class="full">
                        <div class="pro" style="background:#2c3e50;" ref="v"></div>
                    </div>
                    <span>{{lang.v.toFixed(1)}}%</span>
                </div>
                <div class="js">
                    <p>JavaScript</p>
                    <div class="full">
                        <div class="pro" style="background:#f1e05a;" ref="j"></div>
                    </div>
                    <span>{{lang.j.toFixed(1)}}%</span>
                </div>
                <div class="other">
                    <p>Other</p>
                    <div class="full">
                        <div class="pro" style="background:#ededed;" ref="o"></div>
                    </div>
                    <span>{{lang.o.toFixed(1)}}%</span>
                </div>
            </div>
        </div>
        <div class="inventory">
            <div class="title">收录信息总览</div>
            <div class="detail">
                <div class="songs">
                    <Icon type="md-musical-notes" size="60" />
                    <div>
                        <p>歌曲</p>
                        <span>{{allSongs.length}}</span>
                    </div>
                </div>
                <div class="singers">
                    <Icon type="md-person" size="60" />
                    <div>
                        <p>歌手</p>
                        <span>{{allSingers.length}}</span>
                    </div>
                </div>
                <div class="albums">
                    <Icon type="md-disc" size="60" />
                    <div>
                        <p>专辑</p>
                        <span>{{allAlbums.length}}</span>
                    </div>
                </div>
                <div class="sheets">
                    <Icon type="ios-list-box" size="60" />
                    <div>
                        <p>歌单</p>
                        <span>{{allSheets.length}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import echarts from 'echarts'
    export default {
        name: "IndexScan",
        data() {
            return { lang: { v: 78.0, j: 21.7, o: 0.3 } };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
                allSingers: state => state.singer.allSingers,
                allAlbums: state => state.album.allAlbums,
                allSheets: state => state.sheet.allSheets,
                searchResults: state => state.searchResults
            })
        },
        mounted() {
            this.$nextTick(() => {
                ['v', 'j', 'o'].forEach(key => {
                    this.$refs[key].style.width = `${this.lang[key]}%`;
                })
            })
        },
        methods: {

        },
        watch: {

        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .index-scan {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        overflow: auto;
        >.info {
            height: 40%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >.admin {
                width: 50%;
                >.user-wrapper {
                    width: 300px;
                    margin: 0 auto;
                    >.user {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        >img {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            margin-right: 20px;
                        }
                        >.user-info {
                            >p {
                                font-size: 18px;
                                color: $title;
                                text-align: center;
                                line-height: 1.8em;
                            }
                            >span {
                                font-size: 12px;
                                color: $sub;
                                text-align: center;
                                line-height: 1.8em;
                            }
                        }
                    }
                    >.time {
                        margin-top: 20px;
                        padding-left: 55px;
                        font-size: 12px;
                        line-height: 1.8em;
                        color: $sub;
                    }
                }
            }
            >.lang {
                width: 50%;
                >.title {
                    font-size: 16px;
                    line-height: 1.8em;
                    border-bottom: .5px solid $border;
                    padding-bottom: 10px;
                }
                >div {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: center;
                    >p {
                        width: 100%;
                        font-size: 14px;
                        color: $title;
                        font-weight: bold;
                        line-height: 2em;
                    }
                    >div {
                        height: 10px;
                        background: $bg;
                        border-radius: 4px;
                        flex-shrink: 0;
                        width: 60%;
                        margin-right: 5px;
                        >div {
                            height: 10px;
                            width: 50%;
                            border-radius: 4px;
                        }
                    }
                    >span {
                        color: $sub;
                        font-size: 12px;
                    }
                }
            }
        }
        >.inventory {
            height: 60%;
            border-top: .5px solid $border;
            >.title {
                font-size: 20px;
                font-weight: bold;
                color: $title;
                line-height: 2em;
                padding: 10px 0;
                height: 25%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            >.detail {
                height: 75%;
                display: flex;
                justify-content: space-evenly;
                align-items: flex-start;
                >div {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    background: lighten($p, 10%);
                    color: #fff;
                    padding: 50px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all .3s linear;
                    >div {
                        text-align: center;
                        margin-left: 5px;
                        >p {
                            font-size: 16px;
                            line-height: 1.8em;
                        }
                        >span {
                            line-height: 1.8em;
                        }
                    }
                    &:hover {
                        transform: translateX(5px) translateY(-5px);
                        box-shadow: -5px 5px 15px rgba(45, 140, 240, 0.8);
                    }
                }
            }
        }
    }
</style>