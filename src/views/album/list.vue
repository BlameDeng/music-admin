<template>
    <div class="album-list">
        <div class="list">
            <Table size="small" stripe border :columns="columns" :data="allAlbums" ref="table" v-if="allAlbums"></Table>
        </div>
        <div class="button-bar">
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
</template>
<script>
    import mixin from "@/mixin/mixin.js"
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "AlbumList",
        mixins: [mixin],
        data() {
            return {
                columns: [{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    }, {
                        title: '专辑',
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
                        title: '发行时间',
                        key: 'time',
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
                    }, {
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
            }
        },
        computed: {
            ...mapState({
                allAlbums: state => state.album.allAlbums
            })
        },
        methods: {
            ...mapActions(['destroyAlbum']),
            exportData(type) {
                let now = new Date();
                let str = this.formatDate(now);
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: `专辑列表-原始数据${str}`
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: `专辑列表-排序后数据${str}`,
                        original: false
                    });
                }
            },
            onDetail(index) {
                this.$router.push({ path: './list/detail', query: { id: this.allAlbums[index].id } });
            },
            onEdit(index) {
                this.$router.push({ path: './list/edit', query: { id: this.allAlbums[index].id } });
            },
            onRemove(index) {
                let id = this.allAlbums[index].id;
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>该操作将永久删除该专辑，是否继续？</p>',
                    okText: '继续删除',
                    cancelText: '取消删除',
                    onOk: () => {
                        this.destroyAlbum(id).then(res => {
                            this.$Message.info('成功删除专辑');
                        });
                    },
                    onCancel: () => {
                        this.$Message.info('已取消删除');
                    }
                })
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .album-list {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        padding-bottom: 35px;
        >.list {
            width: 100%;
            height: 100%;
        }
        >.button-bar {
            text-align: end;
            height: 35px;
            padding: 2px 35px 4px 0;
        }
    }
</style>