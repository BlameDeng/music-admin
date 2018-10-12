<template>
    <div class="index-search">
        <div class="search-bar">
            <Input search enter-button style="width:300px;" @on-search="onSearch($event)" />
            <span v-if="keyword&&results">
                搜索
                <span> “{{keyword}}” </span>
                找到 {{results.songs.length}} 首单曲，{{results.singers.length}} 个歌手，{{results.albums.length}} 张专辑，{{results.sheets.length}} 张歌单。
            </span>
        </div>
        <div class="results"></div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: "IndexSearch",
        data() { return { keyword: '', results: null }; },
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
                    if (song.singer.toLowerCase().includes(keyword) || song.name.toLowerCase().includes(keyword)) {
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
                console.log(this.results)
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
        >.search-bar {
            padding: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >span {
                font-size: 12px;
                color: $sub;
                margin-left: 10px;
                >span {
                    color: $p;
                }
            }
        }
    }
</style>