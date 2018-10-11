<template>
    <div class="song-list">
        <div class="list" v-if="allSongs&&allSongs.length">
            <Table size="small" stripe border :columns="columns" :data="currentArray" ref="table"></Table>
        </div>
        <div class="button-bar" v-if="allSongs&&allSongs.length">
            <Page :total="total" :current.sync="current" :page-size="pageSize" style="margin-left:40px;" size="small" />
            <div style="margin-right:40px;">
                <Button type="primary" size="small" @click="exportData(1)">
                    <Icon type="ios-download-outline"></Icon>
                    导出原始数据
                </Button>
                <Button type="primary" size="small" @click="exportData(2)">
                    <Icon type="ios-download-outline"></Icon>
                    导出排序后的数据
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import xPlay from '@/components/common/play.vue'
    import mixin from "@/mixin/mixin.js"
    import formatDate from '@/helpers/formatDate.js'
    import { mapActions, mapState, mapMutations } from 'vuex'
    export default {
        name: "SongList",
        components: { xUpload, xPlay },
        mixins: [mixin],
        data() {
            return {
                columns: [{
                        type: 'index2',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.current - 1) * this.pageSize + 1);
                        }
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
                                            this.onDetail(params.index + (this.current - 1) * this.pageSize)
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
                                            this.onEdit(params.index + (this.current - 1) * this.pageSize)
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
                                            this.onRemove(params.index + (this.current - 1) * this.pageSize)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                duration: 0,
                current: 1,
                pageSize: 20
            };
        },
        created() {
            if (this.$route.params && this.$route.params.page) {
                this.$route.params.page.match(/^page=([0-9]+)$/);
                this.current = +RegExp.$1;
            }
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs
            }),
            total() {
                return this.allSongs.length;
            },
            currentArray() {
                return this.allSongs.slice(this.pageSize * (this.current - 1), this.pageSize * this.current);
            }
        },
        methods: {
            ...mapActions(['destroySong']),
            onEdit(index) {
                this.$router.push({ path: '/song/edit', query: { id: this.allSongs[index].id } });
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
                this.$router.push({ path: '/song/detail', query: { id: this.allSongs[index].id } });
            },
            exportData(type) {
                let now = new Date();
                let str = this.formatDate(now);
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: `歌曲列表-原始数据${str}`
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: `歌曲列表-排序后数据${str}`,
                        original: false
                    });
                }
            }
        },
        watch: {
            current(val) { this.$router.push(`/song/list/page=${val}`) }
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
            height: 42px;
            padding: 2px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>