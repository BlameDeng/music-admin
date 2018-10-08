<template>
    <div class="song-list">
        <div class="list" v-if="allSongs&&allSongs.length">
            <Table size="small" stripe border :columns="columns" :data="allSongs" ref="table"></Table>
        </div>
        <div class="button-bar" v-if="allSongs&&allSongs.length">
            <Button type="primary" size="large" @click="exportData(1)">
                <Icon type="ios-download-outline"></Icon>
                导出原始数据
            </Button>
            <Button type="primary" size="large" @click="exportData(2)">
                <Icon type="ios-download-outline"></Icon>
                导出排序后的数据
            </Button>
        </div>
        <transition name="fade">
            <div class="edit-layer" v-if="editingSong&&!detailVisible">
                <div class="edit">
                    <Icon type="md-close" class="icon" size="25" @click="onCancleSave" />
                    <h3>编辑歌曲</h3>
                    <Form label-position="right" :label-width="60" class="edit-form">
                        <FormItem label="歌名">
                            <Input v-model.trim="editingSong.name"></Input>
                        </FormItem>
                        <FormItem label="歌手">
                            <Input v-model.trim="editingSong.singer"></Input>
                        </FormItem>
                        <FormItem label="歌曲链接">
                            <Input v-model.trim="editingSong.url"></Input>
                        </FormItem>
                        <FormItem label="封面链接">
                            <Input v-model.trim="editingSong.cover" ref="cover"></Input>
                            <div style="text-align:end;" id="avatar-upload-container">
                                <Button size="small" type="default" @click="preview">预览封面</Button>
                                <Button size="small" type="default" id="avatar-picker">上传新封面</Button>
                            </div>
                            <x-upload container-id="avatar-upload-container" browse-id="avatar-picker" bucket-name="coversbucket" @uploaded="coverUploaded($event)"></x-upload>
                        </FormItem>
                        <FormItem label="歌词">
                            <Input type="textarea" v-model.trim="editingSong.lrc" :rows="3"></Input>
                        </FormItem>
                        <FormItem style="text-align:center;">
                            <Button style="margin-right: 28px" @click="onCancleSave">取消</Button>
                            <Button type="primary" @click="onSave">保存</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="detail-layer" v-if="editingSong&&detailVisible">
                <div class="detail">
                    <div class="title">
                        <Icon type="md-close" class="icon" size="25" @click="onCloseDetail" />
                        <div class="title-inner">
                            <h3 class="name">{{editingSong.name}}</h3>
                            <p class="singer">
                                <Icon type="md-microphone" class="icon" />
                                {{editingSong.singer}}
                            </p>
                        </div>
                        <p class="cover">
                            <img :src="editingSong.cover" alt="cover" title="点击查看原图">
                        </p>
                    </div>
                    <div class="source">
                        <div class="info">
                            <p class="url"><b>歌曲链接：</b><br>{{editingSong.url}}</p>
                            <p class="created-at">创建时间：{{formatDate(editingSong.createdAt)}}</p>
                            <p class="updated-at">更新时间：{{formatDate(editingSong.updatedAt)}}</p>
                        </div>
                        <div class="lrc">
                            <span>歌词：</span>
                            <br>
                            <div class="lrc-content">{{editingSong.lrc}}</div>
                        </div>
                    </div>
                    <div class="play">
                        <div class="controller">
                            <Icon type="md-play" size="25" class="icon" @click="onClickController('play')" />
                            <Icon type="md-pause" size="25" class="icon" @click="onClickController('pause')" />
                            <Icon type="md-square" size="25" class="icon" @click="onClickController('stop')" />
                            <audio :src="editingSong.url" ref="audio" @timeupdate="timeupdate"></audio>
                        </div>
                        <div class="full">
                            <div class="pro" ref="pro"></div>
                        </div>
                        <span>{{duration|formatSongTime}}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    import formatDate from '@/helpers/formatDate.js'
    import { mapActions, mapState, mapMutations } from 'vuex'
    export default {
        name: "SongList",
        components: { xUpload },
        mixins: [mixin],
        data() {
            return {
                columns: [{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '歌名',
                        key: 'name',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '歌手',
                        key: 'singer',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '歌词',
                        key: 'lrc',
                        ellipsis: true
                    },
                    {
                        title: '歌曲链接',
                        key: 'url',
                        ellipsis: true
                    },
                    {
                        title: '封面链接',
                        key: 'cover',
                        ellipsis: true
                    },
                    {
                        title: '创建时间',
                        key: 'createdAt',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '更新时间',
                        key: 'updatedAt',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.onDetail(params.index)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.onEdit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.onRemove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                detailVisible: false,
                duration: 0
            };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
                editingSong: state => state.song.editingSong
            })
        },
        created() {
            this.fetchAllSongs();
        },
        methods: {
            ...mapActions(['fetchAllSongs', 'updateSong', 'destroySong']),
            ...mapMutations(['setEditingSong', 'updateCover']),
            onEdit(index) {
                this.setEditingSong(index);
            },
            onRemove(index) {
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>该操作将永久删除该条歌曲信息，是否继续？</p>',
                    okText: '继续删除',
                    cancelText: '取消删除',
                    onOk: () => {
                        this.destroySong(this.allSongs[index].id).then(res => {
                            this.$Message.info('删除成功');
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('已取消删除');
                    }
                })
            },
            onDetail(index) {
                this.setEditingSong(index);
                this.detailVisible = true;
            },
            exportData(type) {
                let now = new Date();
                let str = this.formatDate(now);
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: `原始数据${str}`
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: `排序后数据${str}`,
                        original: false
                    });
                }
            },
            onSave() {
                this.updateSong(this.editingSong).then(res => {
                    this.$Message.success('保存成功！');
                    this.setEditingSong(-1);
                })
            },
            onCancleSave() {
                this.setEditingSong(-1);
            },
            preview() {
                if (!this.editingSong.cover) {
                    this.$Message.info('该歌曲还没有上传封面！');
                    return
                }
                window.open(this.editingSong.cover, '_blank');
            },
            coverUploaded(obj) {
                let payload = JSON.parse(JSON.stringify(this.editingSong));
                payload.cover = obj.url + '?x-oss-process=style/avatar';
                this.updateCover(payload);
            },
            onClickController(type) {
                let audio = this.$refs.audio;
                type === 'play' ? audio.play() : '';
                type === 'pause' ? audio.pause() : '';
                if (type === 'stop') {
                    audio.currentTime = 0;
                    audio.pause();
                }
            },
            timeupdate() {
                let audio = this.$refs.audio;
                if (!audio) { return }
                let current = audio.currentTime;
                let percent = (current / audio.duration) * 100;
                this.duration ? '' : this.duration = audio.duration;
                this.$refs.pro.style.transform = `translateX(${percent-100}%)`;
            },
            onCloseDetail() {
                this.detailVisible = false;
                this.duration = 0;
                this.setEditingSong(-1);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .song-list {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        padding-bottom: 42px;
        position: relative;
        >.list {
            height: 100%;
            overflow: auto;
        }
        >.button-bar {
            text-align: end;
            height: 42px;
            padding: 2px 35px 4px 0;
        }
        >.edit-layer {
            background: rgba(0, 0, 0, 0.2);
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            >.edit {
                background: #fff;
                width: 60%;
                height: 80%;
                padding: 20px;
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;
                >.icon {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    color: $disabled;
                    cursor: pointer;
                    &:hover {
                        color: $p;
                    }
                }
                >h3 {
                    text-align: center;
                    font-size: 20px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }
                >.edit-form {
                    width: 80%;
                    margin: 0 auto;
                }
            }
        }
        >.detail-layer {
            background: rgba(0, 0, 0, 0.2);
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            >.detail {
                background: #fff;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 60%;
                height: 80%;
                border-radius: 4px;
                position: relative;
                >.title {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-top: 4%;
                    padding-bottom: 20px;
                    height: 200px;
                    position: relative;
                    >.icon {
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        cursor: pointer;
                        &:hover {
                            color: $p;
                        }
                    }
                    >.title-inner {
                        width: 50%;
                        text-align: center;
                        >.name {
                            font-size: 25px;
                            color: $title;
                            margin-bottom: 20px;
                        }
                        >.singer {
                            font-size: 14px;
                            color: $content;
                            >.icon {
                                color: $content;
                            }
                        }
                    }
                    >.cover {
                        width: 50%;
                        height: 150px;
                        >img {
                            width: 150px;
                            height: 150px;
                            vertical-align: top;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                    }
                }
                >.source {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 0 5%;
                    color: $content;
                    height: calc(100% - 200px);
                    >.info {
                        width: 50%;
                        padding-right: 20px;
                        padding-top: 10px;
                        >.url {
                            font-size: 12px;
                            word-break: break-all;
                        }
                        >p {
                            margin-bottom: 10px;
                        }
                    }
                    >.lrc {
                        width: 50%;
                        border: 1px solid $border;
                        border-radius: 4px;
                        padding: 10px 10px 30px;
                        background: $bg;
                        height: calc(100% - 50px);
                        >span {
                            font-weight: bold;
                        }
                        >.lrc-content {
                            font-size: 12px;
                            overflow: auto;
                            position: relative;
                            height: 100%;
                        }
                    }
                }
                >.play {
                    width: 80%;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    >.controller {
                        margin-right: 20px;
                        cursor: pointer;
                        >.icon {
                            &:hover {
                                color: $p;
                            }
                        }
                    }
                    >.full {
                        height: 10px;
                        width: 60%;
                        border-radius: 1px;
                        border: 1px solid $border;
                        overflow: hidden;
                        >.pro {
                            width: 100%;
                            height: 10px;
                            background: lighten($p, 20%);
                            border-radius: 1px;
                            transition: transform .3s;
                            transform: translateX(-100%);
                        }
                    }
                    >span {
                        margin-left: 5px;
                    }
                }
            }
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