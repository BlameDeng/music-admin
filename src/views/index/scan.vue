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
            <div class="todo">
                <div class="title">
                    <input type="text" class="todo-input" placeholder="待办事项" v-model.trim="content" @keyup.enter="onCreateTodo">
                    <Icon type="md-add" class="icon" size="20" @click="onCreateTodo" />
                </div>
                <ul class="todo-list">
                    <template v-if="allTodos&&allTodos.length">
                        <li v-for="todo in allTodos" :key="todo.id" class="list" :class="{done:todo.done}">
                            <span class="check" :class="{done:todo.done}" @click="onCheck(todo)">
                                <Icon type="md-checkmark" class="icon" style="cursor: pointer;" />
                            </span>
                            <span class="text">
                                {{todo.content}}
                            </span>
                            <span class="delete" @click="removeTodo(todo)">
                                <Icon type="md-close" class="icon" style="cursor: pointer;" />
                            </span>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="main">
            <div class="inventory">
                <div class="title">信息总览</div>
                <div class="detail">
                    <div class="songs">
                        <span class="icon-wrapper">
                            <Icon type="md-musical-notes" size="60" />
                        </span>
                        <div>
                            <p>歌曲</p>
                            <span v-if="allSongs">{{allSongs.length}}</span>
                        </div>
                    </div>
                    <div class="singers">
                        <span class="icon-wrapper">
                            <Icon type="md-person" size="60" />
                        </span>
                        <div>
                            <p>歌手</p>
                            <span v-if="allSingers">{{allSingers.length}}</span>
                        </div>
                    </div>
                    <div class="albums">
                        <span class="icon-wrapper">
                            <Icon type="md-disc" size="60" />
                        </span>
                        <div>
                            <p>专辑</p>
                            <span v-if="allAlbums">{{allAlbums.length}}</span>
                        </div>
                    </div>
                    <div class="sheets">
                        <span class="icon-wrapper">
                            <Icon type="ios-list-box" size="60" />
                        </span>
                        <div>
                            <p>歌单</p>
                            <span v-if="allSheets">{{allSheets.length}}</span>
                        </div>
                    </div>
                </div>
                <div class="chart" ref="chart"></div>
            </div>
            <div class="lang">
                <div class="lang-inner">
                    <div class="banner">
                        <img src="@/assets/banner.jpg">
                    </div>
                    <div class="title">
                        <div class="logo">
                            <x-icon name="logo" class="logo-icon"></x-icon>
                        </div>
                        <span>
                            vue - admin
                        </span>
                    </div>
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
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    import xIcon from "@/components/icon.vue";
    import Chart from "@/helpers/chart.js";
    export default {
        name: "IndexScan",
        components: { xIcon },
        data() {
            return {
                lang: { v: 78.9, j: 20.8, o: 0.3 },
                content: ""
            };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
                allSingers: state => state.singer.allSingers,
                allAlbums: state => state.album.allAlbums,
                allSheets: state => state.sheet.allSheets,
                searchResults: state => state.searchResults,
                allTodos: state => state.todo.allTodos
            })
        },
        mounted() {
            this.$nextTick(() => {
                ["v", "j", "o"].forEach(key => {
                    this.$refs[key].style.width = `${this.lang[key]}%`;
                });
                this.chart();
            });
        },
        methods: {
            ...mapActions(["fetchAllTodos", "createTodo", "destroyTodo", "updateTodo"]),
            onCreateTodo() {
                if (!this.content) { return }
                this.createTodo({ content: this.content, done: false }).then(res => {
                    this.content = "";
                });
            },
            onCheck(todo) {
                todo.done = !todo.done;
                this.updateTodo(todo);
            },
            removeTodo(todo) {
                this.destroyTodo(todo.id);
            },
            chart() {
                const chart = new Chart(this.$refs.chart);
                chart.axis();
            }
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
            height: 35%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >.admin {
                width: 30%;
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
            >.todo {
                width: 40%;
                height: 100%;
                padding: 10px;
                >.title {
                    color: $title;
                    font-size: 12px;
                    line-height: 2em;
                    border-bottom: 0.5px solid $border;
                    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    >.todo-input {
                        border: none;
                        padding-left: 0.5em;
                        width: 100%;
                        &:focus {
                            outline: none;
                        }
                    }
                    >.icon {
                        color: $sub;
                        cursor: pointer;
                    }
                }
                >.todo-list {
                    width: 100%;
                    height: calc(100% - 24.5px);
                    padding-top: 5px;
                    overflow: auto;
                    >.list {
                        width: 100%;
                        border-bottom: 0.5px solid $border;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding-left: 0.5em;
                        position: relative;
                        >.check {
                            display: inline-flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            border: 0.5px solid;
                            border-color: $border;
                            margin-right: 4px;
                            padding: 1px;
                            >.icon {
                                color: transparent;
                            }
                            &.done {
                                >.icon {
                                    color: $p;
                                }
                            }
                        }
                        >.text {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            color: $content;
                            line-height: 1.8em;
                            padding-right: 2em;
                            cursor: default;
                        }
                        >.delete {
                            display: none;
                            color: $error;
                            position: absolute;
                            top: 50%;
                            right: 5px;
                            transform: translateY(-50%);
                        }
                        &:hover {
                            >.delete {
                                display: inline;
                            }
                        }
                        &.done {
                            >.text {
                                color: $sub;
                                text-decoration: line-through;
                            }
                        }
                    }
                }
            }
        }
        >.main {
            height: 65%;
            border-top: 0.5px solid $border;
            display: flex;
            justify-content: space-between;
            align-items: center;
            >.inventory {
                height: 100%;
                width: 60%;
                flex-shrink: 0;
                >.title {
                    font-size: 18px;
                    font-weight: bold;
                    color: $title;
                    line-height: 2em;
                    height: 10%;
                    padding-left: .2em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                >.detail {
                    height: 40%;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    >div {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        color: $content;
                        background: $bg;
                        padding: 30px 20px;
                        border: 0.5px solid $border;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: all .3s linear;
                        user-select: none;
                        >.icon-wrapper {
                            padding: 5px;
                            border-radius: 5px;
                            color: lighten($p, 10%);
                            transition: all .3s linear;
                        }
                        >div {
                            text-align: center;
                            margin-left: 10px;
                            >p {
                                font-size: 16px;
                                line-height: 1.8em;
                                color: $sub;
                            }
                            >span {
                                line-height: 1.8em;
                            }
                        }
                        &:hover {
                            transform: translateX(5px) translateY(-5px);
                            box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.2);
                            >.icon-wrapper {
                                color: #fff;
                                background: lighten($p, 10%);
                                transition: all 0.3s linear;
                            }
                        }
                    }
                }
                >.chart {
                    width: 100%;
                    height: 50%;
                }
            }
            >.lang {
                width: 35%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding: 10px;
                flex-shrink: 0;
                >.lang-inner {
                    width: 100%;
                    padding-right: 10px;
                    >.banner {
                        width: 100%;
                        border-radius: 4px;
                        overflow: hidden;
                        >img {
                            width: 100%;
                            border-radius: 4px;
                            vertical-align: top;
                            transition: all 0.3s linear;
                            &:hover {
                                transform: scale(1.3);
                            }
                        }
                    }
                    >.title {
                        border-bottom: 0.5px solid $border;
                        font-weight: bold;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        margin-bottom: 10px;
                        position: relative;
                        >.logo {
                            position: absolute;
                            left: 20px;
                            top: -20px;
                            height: auto;
                            width: auto;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            padding: 5px;
                            background: #fff;
                            >.logo-icon {
                                color: $p;
                                width: 30px;
                                height: 30px;
                                transition: all 0.3s linear;
                            }
                            &:hover {
                                >.logo-icon {
                                    transform: rotateZ(-125deg);
                                    transform-origin: 100% 50%;
                                }
                            }
                        }
                        >span {
                            color: $p;
                            font-size: 20px;
                            line-height: 1.8em;
                            transition: all 1s linear;
                            cursor: default;
                            &:hover {
                                color: $success;
                            }
                        }
                    }
                    >div {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        align-items: center;
                        width: 100%;
                        padding-bottom: 2px;
                        >p {
                            width: 100%;
                            font-size: 12px;
                            color: $title;
                            font-weight: bold;
                            line-height: 1.4em;
                        }
                        >div {
                            height: 8px;
                            background: $bg;
                            border-radius: 4px;
                            flex-shrink: 0;
                            width: 80%;
                            margin-right: 5px;
                            >div {
                                height: 8px;
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
        }
    }
</style>