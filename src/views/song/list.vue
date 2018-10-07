<template>
    <div class="song-list">
        <div class="list" v-if="allSongs&&allSongs.length">
            <Table size="small" stripe border :columns="columns" :data="allSongs" ref="table"></Table>
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
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "SongList",
        components: { xUpload },
        mixins: [mixin],
        data() {
            return {
                columns: [{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
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
                        tooltip: true
                    },
                    {
                        title: '歌曲链接',
                        key: 'url',
                        tooltip: true
                    },
                    {
                        title: '封面链接',
                        key: 'cover',
                        tooltip: true
                    },
                    {
                        title: '创建时间',
                        key: 'createdAt',
                        sortable: true,
                        ellipsis: true
                    },
                    {
                        title: '修改时间',
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
                                            this.show(params.index)
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
                                            this.remove(params.index)
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
                allSongs: state => state.song.allSongs
            })
        },
        created() {
            this.fetchAllSongs().then(res => {
                console.log(res)
            })
        },
        methods: {
            ...mapActions(['fetchAllSongs']),
            show(index) {
                console.log(index);
            },
            remove(index) {
                console.log(index);

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
        padding-bottom: 40px;
        // display: flex;
        // justify-content: flex-start;
        >.list {
            height: 100%;
            overflow: auto;
        }
        >.button-bar {
            text-align: end;
            height: 40px;
            padding:2px 20px 2px 0;
        }


    }
</style>