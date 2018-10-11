<template>
    <div class="sheet-list">
        <div class="list" v-if="allSheets&&allSheets.length">
            <Table size="small" stripe border :columns="columns" :data="allSheets" ref="table"></Table>
        </div>
        <div class="button-bar">
            <Button type="primary" size="large" @click="exportData(1)">
                <Icon type="ios-download-outline"></Icon>
                导出原始数据
            </Button>
            <Button type="primary" size="large" @click="exportData(2)">
                <Icon type="ios-download-outline"></Icon>
                导出排序后的数据
            </Button>
        </div>
    </div>
</template>
<script>
    import mixin from "@/mixin/mixin.js"
    import formatDate from '@/helpers/formatDate.js'
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "SheetList",
        mixins: [mixin],
        data() {
            return {
                columns: [{
                        type: 'index',
                        width: 60,
                        align: 'center'
                    }, {
                        title: '歌单',
                        key: 'name',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '标签1',
                        key: 'tag1',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '标签2',
                        key: 'tag2',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '标签3',
                        key: 'tag3',
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
                allSheets: state => state.sheet.allSheets,
            })
        },
        created() {
            this.allSheets ? '' : this.fetchAllSheets();
        },
        methods: {
            ...mapActions(['fetchAllSheets', 'destroySheet']),
            onDetail(index) {
                this.$router.push({ path: './list/detail', query: { id: this.allSheets[index].id } });
            },
            onEdit(index) {
                this.$router.push({ path: './list/edit', query: { id: this.allSheets[index].id } });
            },
            onRemove(index) {
                let id = this.allSheets[index].id;
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>该操作将永久删除该歌单，是否继续？</p>',
                    okText: '继续删除',
                    cancelText: '取消删除',
                    onOk: () => {
                        this.destroySheet(id).then(res => {
                            this.$Message.info('成功删除歌单');
                        });
                    },
                    onCancel: () => {
                        this.$Message.info('已取消删除');
                    }
                })
            },
            exportData(type) {
                let now = new Date();
                let str = this.formatDate(now);
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: `歌单列表-原始数据${str}`
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: `歌单列表-排序后数据${str}`,
                        original: false
                    });
                }
            },
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet-list {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        padding-bottom: 42px;
        >.list {
            width: 100%;
            height: 100%;
        }
        >.button-bar {
            text-align: end;
            height: 42px;
            padding: 2px 35px 4px 0;
        }
    }
</style>