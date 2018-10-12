<template>
    <div class="index-search">
        <div class="search-bar">
            <Input search enter-button style="width:300px;" @on-search="onSearch($event)" placeholder="搜索音乐、歌手、专辑、歌单" />
            <span v-if="keyword&&results">
                搜索
                <span> “{{keyword}}” </span>
                找到 {{results.songs.length}} 首单曲，{{results.singers.length}} 个歌手，{{results.albums.length}} 张专辑，{{results.sheets.length}} 张歌单。
            </span>
        </div>
        <div class="results">
            <Tabs>
                <TabPane label="单曲" name="song">
                    <div class="song">
                        <Table size="small" stripe border :columns="columns" :data="results.songs" ref="table" v-if="results&&results.songs"></Table>
                    </div>
                </TabPane>
                <TabPane label="歌手" name="singer">
                    <template v-if="results&&results.singers&&results.singers.length">
                        <div class="singer" v-for="singer in results.singers" :key="singer.id">
                            <img :src="singer.avatar" alt="avatar" class="avatar">
                            <span class="name">{{singer.name}}</span>
                            <span class="othernames">（{{singer.othernames}}）</span>
                            <img src="@/assets/person.png" class="person">
                        </div>
                    </template>
                </TabPane>
                <TabPane label="专辑" name="album">
                    <template v-if="results&&results.albums&&results.albums.length">
                        <div class="album" v-for="album in results.albums" :key="album.id">
                            <img :src="album.cover" alt="cover">
                            <span class="name">{{album.name}}</span>
                            <span class="singer">{{album.singer}}</span>
                        </div>
                    </template>
                </TabPane>
                <TabPane label="歌单" name="sheet">
                    <template v-if="results&&results.sheets&&results.sheets.length">
                        <div class="sheet" v-for="sheet in results.sheets" :key="sheet.id">
                            <img :src="sheet.cover" alt="cover">
                            <span class="name">{{sheet.name}}</span>
                            <span class="length">{{sheet.songs.length}}首</span>
                            <span class="tags">{{sheet.tags}}</span>
                        </div>
                    </template>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "IndexSearch",
        data() {
            return {
                keyword: '',
                results: null,
                columns: [{
                        type: 'index',
                        width: 60,
                        align: 'center',
                        sortable: true
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
                                }, '编辑')
                            ]);
                        }
                    }
                ],
            };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
                allSingers: state => state.singer.allSingers,
                allAlbums: state => state.album.allAlbums,
                allSheets: state => state.sheet.allSheets
            })
        },
        methods: {
            onSearch(value) {
                if (!value) { return }
                this.keyword = value;
                this.search(this.keyword);
            },
            search(keyword) {
                let songs = [];
                let singers = [];
                let albums = [];
                let sheets = [];
                keyword = keyword.toLowerCase();
                songs = this.allSongs.filter(song => {
                    if (song.name.toLowerCase().includes(keyword) || song.singer.toLowerCase().includes(keyword)) {
                        return song;
                    }
                });
                singers = this.allSingers.filter(singer => {
                    if (singer.name.toLowerCase().includes(keyword) || singer.othernames.toLowerCase().includes(keyword)) {
                        return singer;
                    }
                })
                albums = this.allAlbums.filter(album => {
                    if (album.name.toLowerCase().includes(keyword) || album.singer.toLowerCase().includes(keyword)) {
                        return album;
                    }
                });
                sheets = this.allSheets.filter(sheet => {
                    if (sheet.name.toLowerCase().includes(keyword) || sheet.tags.toLowerCase().includes(keyword)) {
                        return sheet;
                    }
                });
                this.results = { songs, singers, albums, sheets };
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .index-search {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        overflow: auto;
        >.search-bar {
            padding: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: .5px solid $border;
            >span {
                font-size: 12px;
                color: $sub;
                margin-left: 10px;
                >span {
                    color: $p;
                }
            }
        }
        >.results {
            padding: 0 10px;
            /deep/ td {
                height: 30px;
            }
            .singer {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 5px 0;
                cursor: pointer;
                &:nth-child(2n) {
                    background: $bg;
                }
                &:hover {
                    background: darken($bg, 5%)
                }
                >.avatar {
                    vertical-align: top;
                    width: 50px;
                    height: 50px;
                    margin-left: 10px;
                    border-radius: 2px;
                }
                >.name {
                    font-size: 14px;
                    color: $content;
                    margin-left: 10px;
                }
                >.othernames {
                    font-size: 12px;
                    color: $sub;
                }
                >.person {
                    vertical-align: top;
                    width: 14px;
                    height: 14px;
                }
            }
            .album {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 5px 0;
                cursor: pointer;
                position: relative;
                font-size: 14px;
                color: $content;
                &:nth-child(2n) {
                    background: $bg;
                }
                &:hover {
                    background: darken($bg, 5%)
                }
                >img {
                    vertical-align: top;
                    width: 50px;
                    height: 50px;
                    margin-left: 10px;
                    border-radius: 2px;
                }
                >.name {
                    margin-left: 10px;
                }
                >.singer {
                    position: absolute;
                    padding: 2px 4px;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
            }
            .sheet {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 5px 0;
                cursor: pointer;
                position: relative;
                font-size: 14px;
                color: $content;
                &:nth-child(2n) {
                    background: $bg;
                }
                &:hover {
                    background: darken($bg, 5%)
                }
                >img {
                    vertical-align: top;
                    width: 50px;
                    height: 50px;
                    margin-left: 10px;
                    border-radius: 2px;
                }
                >.name {
                    margin-left: 10px;
                }
                >.length {
                    position: absolute;
                    padding: 2px 4px;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    font-size: 12px;
                    color: $sub;
                }
                >.tags {
                    position: absolute;
                    padding: 2px 4px;
                    top: 50%;
                    left: 70%;
                    transform: translateX(-50%) translateY(-50%);
                    font-size: 12px;
                }
            }
        }
    }
</style>