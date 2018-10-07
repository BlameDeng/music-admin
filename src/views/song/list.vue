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
        <transition name=fade>
            <div class="edit-layer" v-if="editingSong">
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
                            <Input v-model.trim="editingSong.cover"></Input>
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
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
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
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
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
            };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
                editingSong: state => state.song.editingSong
            })
        },
        created() {
            this.fetchAllSongs().then(res => {

            })
        },
        methods: {
            ...mapActions(['fetchAllSongs', 'updateSong', 'destroySong']),
            ...mapMutations(['setEditingSong']),
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
            exportData(type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
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
        // display: flex;
        // justify-content: flex-start;
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
                height: 75%;
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
                // align-items: center;
                >h3 {
                    text-align: center;
                    font-size: 20px;
                    margin-bottom: 20px;
                }
                >.edit-form {
                    width: 80%;
                    margin: 0 auto;
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