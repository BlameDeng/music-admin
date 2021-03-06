<template>
    <div class="songs-list">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="all-songs">
            <div class="header">所有歌曲</div>
            <Table border size="small" ref="allSongs" :columns="columns1" :data="allSongs" v-if="allSongs" @on-selection-change="selectAll($event)"></Table>
        </div>
        <div class="action-bar">
            <div class="add" @click="add">
                <span>添加到专辑</span>
                <x-icon name="right" class="icon"></x-icon>
            </div>
            <div class="remove" @click="remove">
                <x-icon name="right" class="icon"></x-icon>
                <span>从专辑移除</span>
            </div>
        </div>
        <div class="songs">
            <div class="header">歌曲列表</div>
            <Table border size="small" ref="songs" :columns="columns2" :data="songs" v-if="songs" @on-selection-change="selectAlbum($event)"></Table>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import xIcon from '@/components/icon.vue'
    export default {
        name: 'SongsList',
        components: { xIcon },
        data() {
            return {
                album: null,
                songs: null,
                idsFromAll: null,
                idsFromAlbum: null,
                columns1: [{
                        title: '歌名',
                        key: 'name',
                        sortable: true
                    },
                    {
                        title: '歌手',
                        key: 'singer',
                        sortable: true
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }
                ],
                columns2: [{
                        title: '歌名',
                        key: 'name',
                        sortable: true
                    },
                    {
                        title: '歌手',
                        key: 'singer',
                        sortable: true
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }
                ],
            }
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs
            })
        },
        mounted() {
            this.$route.query && this.$route.query.id ? this.getAlbum(this.$route.query.id) : '';
            this.album && this.album.songs && this.album.songs.length ? this.getSongs() : '';
        },
        methods: {
            ...mapActions(['updateAlbum']),
            onBack() { this.$router.go(-1); },
            getAlbum(id) {
                this.album = this.$store.getters.getAlbumById(id);
            },
            getSongs() {
                this.songs = this.$store.getters.getSongsByArray(this.album.songs);
            },
            selectAll(arr) {
                let array = [];
                if (arr.length) {
                    arr.forEach(song => {
                        array.push(song.id);
                    })
                }
                this.idsFromAll = array;
            },
            selectAlbum(arr) {
                let array = [];
                if (arr.length) {
                    arr.forEach(song => {
                        array.push(song.id);
                    })
                }
                this.idsFromAlbum = array;
            },
            add() {
                if (!this.idsFromAll || !this.idsFromAll.length) { return }
                this.album.songs = this.album.songs || [];
                this.idsFromAll.forEach(id => {
                    this.album.songs.indexOf(id) === -1 ? this.album.songs.push(id) : '';
                });
                this.updateAlbum(this.album).then(res => {
                    this.getAlbum(this.$route.query.id);
                    this.getSongs();
                    this.idsFromAll = null;
                    this.$refs.allSongs.selectAll(false);
                    this.$Message.success('已添加至专辑！');
                })
            },
            remove() {
                if (!this.idsFromAlbum || !this.idsFromAlbum.length) { return }
                this.idsFromAlbum.forEach(id => {
                    let index = this.album.songs.indexOf(id);
                    this.album.songs.splice(index, 1);
                });
                this.updateAlbum(this.album).then(res => {
                    this.getAlbum(this.$route.query.id);
                    this.getSongs();
                    this.idsFromAlbum = null;
                    this.$refs.songs.selectAll(false);
                    this.$Message.success('操作成功！');
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .songs-list {
        /deep/ td {
            height: 25px;
        }
        @include container;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        >.icon {
            position: absolute;
            top: 5px;
            right: 15px;
            color: lighten($sub, 20%);
            cursor: pointer;
            z-index: 1;
            &:hover {
                color: $p;
            }
        }
        >.all-songs {
            width: 40%;
            height: 100%;
            overflow: auto;
            >.header {
                text-align: center;
                line-height: 1.8em;
                font-size: 16px;
            }
        }
        >.action-bar {
            width: 10%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            >div {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                padding: 5px 0;
                border-radius: 4px;
                cursor: pointer;
                user-select: none;
                &.add {
                    border: .5px solid $success;
                    margin-bottom: 20px;
                    >.icon {
                        margin-left: 5px;
                        color: $success;
                    }
                }
                &.remove {
                    border: .5px solid $error;
                    >.icon {
                        transform: rotateZ(180deg);
                        margin-right: 5px;
                        color: $error;
                    }
                }
            }
        }
        >.songs {
            width: 40%;
            height: 100%;
            overflow: auto;
            >.header {
                text-align: center;
                line-height: 1.8em;
                font-size: 16px;
            }
        }
    }
</style>