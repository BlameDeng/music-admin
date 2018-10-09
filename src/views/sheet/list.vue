<template>
    <div class="sheet-list">
        <div class="list" v-if="allSheets&&allSheets.length">
            <Table size="small" stripe border :columns="columns" :data="allSheets" ref="table"></Table>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    import formatDate from '@/helpers/formatDate.js'
    import { mapActions, mapState, mapMutations } from 'vuex'
    export default {
        name: "SheetList",
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
                        title: '简介',
                        key: 'summary',
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
                allSheets: state => state.sheet.allSheets
            })
        },
        created() {
            this.fetchAllSheets().then(res => {
                
            })
        },
        methods: {
            ...mapActions(['fetchAllSheets']),
            ...mapMutations(['setEditingSheet']),
            onDetail(index) {},
            onEdit(index) {
                this.setEditingSheet(index);
                this.$router.push({path:'./list/edit'});
            },
            onRemove(index) {},
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
    }
</style>