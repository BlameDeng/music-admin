<template>
    <div class="album-detail">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="album-info" v-if="album">
            <div class="cover">
                <img :src="album.cover" alt="cover">
            </div>
            <div class="info">
                <div class="title">
                    <span>专辑</span>
                    <h3>{{album.name}}</h3>
                </div>
                <div class="time">
                    <p>时间： {{album.time}}</p>
                    <p>歌手： {{album.singer}}</p>
                </div>
            </div>
        </div>
        <div class="detail">
            <Tabs>
                <TabPane label="歌曲列表" name="name1">
                    <div class="album-songs">
                        <template v-if="songs&&songs.length">
                            <div class="song" v-for="(song,index) in songs" :key="song.id">
                                <div class="index">{{index+1}}</div>
                                <div class="name">{{song.name}}</div>
                                <div class="singer">{{song.singer}}</div>
                                <div class="play">
                                    <Icon type="md-play" size="12" class="icon" style="cursor:pointer;" @click="onClickPlay(song)" />
                                </div>
                            </div>
                        </template>
                    </div>
                </TabPane>
                <TabPane label="专辑详情" name="name2">
                    <p class="summary" v-if="album">{{album.summary}}</p>
                </TabPane>
            </Tabs>
        </div>
        <div class="play">
            <x-play :source="source" :name="songname" ref="play"></x-play>
        </div>
    </div>
</template>
<script>
    import xPlay from "@/components/common/play.vue";
    export default {
        name: "AlbumDetail",
        components: { xPlay },
        data() {
            return {
                album: null,
                songs: null,
                source: "",
                songname: ""
            };
        },
        mounted() {
            this.$route.query && this.$route.query.id ?
                this.getAlbum(this.$route.query.id) :
                "";
            this.album && this.album.songs && this.album.songs.length ?
                this.getSongs(this.album.songs) :
                "";
        },
        methods: {
            getAlbum(id) {
                this.album = this.$store.getters.getAlbumById(id);
            },
            getSongs(array) {
                this.songs = this.$store.getters.getSongsByArray(array);
            },
            onClickPlay(song) {
                this.source = song.url;
                this.songname = song.name;
                this.$refs.play.play();
            },
            onBack() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .album-detail {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        position: relative;
        >.icon {
            position: absolute;
            top: 5px;
            right: 5px;
            color: lighten($sub, 20%);
            cursor: pointer;
            &:hover {
                color: $p;
            }
        }
        >.album-info {
            width: 80%;
            margin: 0 auto;
            height: 50%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            color: $content;
            >.cover {
                width: 180px;
                height: 180px;
                margin-right: 20px;
                >img {
                    width: 180px;
                    height: 180px;
                    vertical-align: top;
                    border-radius: 4px;
                }
            }
            >.info {
                height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                padding-top: 10px;
                padding-right: 50px;
                >.title {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    >span {
                        border: 0.5px solid $error;
                        font-size: 12px;
                        color: $error;
                        padding: 2px 4px;
                        border-radius: 6px;
                        margin-right: 6px;
                    }
                    >h3 {
                        font-size: 20px;
                        color: $title;
                        line-height: 1.8em;
                    }
                }
                >.time {
                    margin: 15px 0;
                    >p {
                        font-size: 12px;
                        line-height: 1.8em;
                        color: $sub;
                    }
                }
            }
        }
        >.detail {
            width: 80%;
            margin: 0 auto;
            height: 50%;
            color: $content;
            overflow: auto;
            .album-songs {
                width: 100%;
                // margin: 0 auto;
                // height: 50%;
                color: $content;
                overflow: auto;
                >.header {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: $sub;
                    font-size: 12px;
                    margin-top: -23px;
                    >.index {
                        width: 10%;
                        border: 1px solid $border;
                        padding: 2px 0 2px 20px;
                        border-right: none;
                        border-left-color: transparent;
                    }
                    >.name {
                        width: 40%;
                        border: 1px solid $border;
                        padding: 2px 0 2px 10px;
                        border-right: none;
                    }
                    >.singer {
                        width: 40%;
                        border: 1px solid $border;
                        padding: 2px 0 2px 10px;
                        border-right: none;
                    }
                    >.play {
                        width: 10%;
                        border: 1px solid $border;
                        padding: 2px 0 2px 10px;
                        border-right-color: transparent;
                    }
                }
                >.song {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: $content;
                    font-size: 12px;
                    &:nth-child(2n-1) {
                        background: $bg;
                    }
                    &:hover {
                        background: darken($bg, 10%);
                    }
                    >.index {
                        width: 10%;
                        padding: 3px 0 2px 20px;
                        border: 1px solid transparent;
                        border-right: none;
                    }
                    >.name {
                        width: 40%;
                        padding: 3px 0 2px 10px;
                        border: 1px solid transparent;
                        border-right: none;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    >.singer {
                        width: 40%;
                        padding: 3px 0 2px 10px;
                        border: 1px solid transparent;
                        border-right: none;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    >.play {
                        width: 10%;
                        padding: 3px 0 2px 20px;
                        color: lighten($sub, 20%);
                        border: 1px solid transparent;
                        &:hover {
                            color: $p;
                        }
                    }
                }
            }
            .summary {
                font-size: 14px;
                color: $content;
                text-indent: 2em;
            }
        }
        >.play {
            padding: 10px 0;
        }
    }
</style>