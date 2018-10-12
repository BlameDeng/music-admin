<template>
    <div class="index-search">
        <div class="search-bar">
            <Input search enter-button style="width:300px;" @on-search="onSearch($event)" placeholder="搜索音乐、歌手、专辑、歌单" />
            <span v-if="keyword&&searchResults">
                搜索
                <span class="keyword"> “{{keyword}}” </span>
                找到
                <span :class="{active:searchResults.songs.length}">{{searchResults.songs.length}}</span>
                首单曲，
                <span :class="{active:searchResults.singers.length}">{{searchResults.singers.length}}</span>
                个歌手，
                <span :class="{active:searchResults.albums.length}">{{searchResults.albums.length}}</span>
                张专辑，
                <span :class="{active:searchResults.sheets.length}">{{searchResults.sheets.length}}</span>
                张歌单。
            </span>
        </div>
        <div class="results">
            <Tabs :value="tab" @on-click="onClickTab($event)">
                <TabPane label="单曲" name="songs">
                    <div class="song">
                        <Table size="small" stripe border :columns="columns" :data="searchResults.songs" ref="table" v-if="searchResults&&searchResults.songs"></Table>
                    </div>
                </TabPane>
                <TabPane label="歌手" name="singers">
                    <template v-if="searchResults&&searchResults.singers&&searchResults.singers.length">
                        <div class="singer" v-for="singer in searchResults.singers" :key="singer.id" @click="onSinger(singer)">
                            <img :src="singer.avatar" alt="avatar" class="avatar">
                            <span class="name">{{singer.name}}</span>
                            <span class="othernames">（{{singer.othernames}}）</span>
                            <img src="@/assets/person.png" class="person">
                        </div>
                    </template>
                </TabPane>
                <TabPane label="专辑" name="albums">
                    <template v-if="searchResults&&searchResults.albums&&searchResults.albums.length">
                        <div class="album" v-for="album in searchResults.albums" :key="album.id" @click="onAlbum(album)">
                            <img :src="album.cover" alt="cover">
                            <span class="name">{{album.name}}</span>
                            <span class="singer" @click.stop="onSinger(album.singer)">
                                {{album.singer}}
                                <img src="@/assets/person.png">
                            </span>
                        </div>
                    </template>
                </TabPane>
                <TabPane label="歌单" name="sheets">
                    <template v-if="searchResults&&searchResults.sheets&&searchResults.sheets.length">
                        <div class="sheet" v-for="sheet in searchResults.sheets" :key="sheet.id" @click="onSheet(sheet)">
                            <img :src="sheet.cover" alt="cover">
                            <span class="name">{{sheet.name}}</span>
                            <span class="length">{{sheet.songs.length}}首</span>
                            <p class="tags">
                                <span v-for="tag in sheet.tags.split('/')" :key="tag" class="tag">
                                    {{tag}}
                                    <span class="line"> / </span>
                                </span>
                            </p>
                        </div>
                    </template>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: "IndexSearch",
        data() {
            return {
                keyword: '',
                tab: '',
                columns: [{
                        type: 'index',
                        width: 80,
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
                allSheets: state => state.sheet.allSheets,
                searchResults: state => state.searchResults
            })
        },
        created() {
            if (this.$route.params && this.$route.params.tab) {
                this.$route.params.tab.match(/^tab=(\w+)$/);
                this.tab = RegExp.$1;
            }
        },
        methods: {
            ...mapMutations(['setSearchResults']),
            onSearch(value) {
                if (!value) { return }
                this.keyword = value;
                this.search(this.keyword);
                let tabs = ['songs', 'singers', 'albums', 'sheets'];
                for (let i = 0; i < tabs.length; i++) {
                    if (this.searchResults[tabs[i]].length) {
                        this.tab = tabs[i];
                        break;
                    }
                }
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
                this.setSearchResults({ songs, singers, albums, sheets });
            },
            onDetail(index) {
                let id = this.searchResults.songs[index].id;
                this.$router.push({ path: '/song/detail', query: { id } });
            },
            onEdit(index) {
                let id = this.searchResults.songs[index].id;
                this.$router.push({ path: '/song/edit', query: { id } });
            },
            onSinger(singer) {
                let id = '';
                if (typeof singer === 'object') { id = singer.id; }
                if (typeof singer === 'string') {
                    let temp = this.allSingers.find(item => item.name === singer);
                    id = temp.id;
                }
                this.$router.push({ path: '/singer/list/detail', query: { id } });
            },
            onAlbum(album) {
                this.$router.push({ path: '/album/list/detail', query: { id: album.id } });
            },
            onSheet(sheet) {
                this.$router.push({ path: '/sheet/list/detail', query: { id: sheet.id } });
            },
            onClickTab(tab) {
                this.tab = tab;
            }
        },
        watch: {
            tab(val) { this.$router.push(`/index/search/tab=${val}`) }
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
                >.keyword {
                    color: $p;
                }
                >.active {
                    color: $success;
                    font-weight: bold;
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
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    >img {
                        vertical-align: top;
                        width: 14px;
                        height: 14px;
                        margin-left: 5px;
                    }
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
                    color: $p;
                    >.tag {
                        padding: 2px 4px;
                        >.line {
                            color: $sub;
                        }
                        &:last-child {
                            >.line {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>