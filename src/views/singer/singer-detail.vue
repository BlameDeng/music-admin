<template>
    <div class="singer-detail">
        <div class="play">
            <x-play :source="source" :name="songname" ref="play"></x-play>
        </div>
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="singer-info" v-if="singer">
            <div class="button">
                <Button style="padding:2px 5px;" @click="onDelete">删除歌手</Button>
                <Button type="primary" style="padding:2px 5px;" @click="onEdit">编辑歌手信息</Button>
            </div>
            <div class="avatar">
                <img :src="singer.avatar" alt="avatar">
            </div>
            <div class="info">
                <div class="names">
                    <p><span>歌手</span><span>{{singer.name}}</span></p>
                    <span>{{singer.othernames}}</span>
                </div>
                <div class="counts">
                    <div class="single">
                        <Icon type="ios-musical-notes" size="16" /><span style="margin-left:5px;">单曲数：{{songs.length||'0'}}</span>
                    </div>
                    <div class="album">
                        <Icon type="ios-disc-outline" size="16" /><span style="margin-left:5px;">专辑数：{{albums.length||'0'}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="singer-detail">
            <div class="nav">
                <Tabs value="name1" style="border:none;" v-if="singer">
                    <TabPane label="单曲" name="song">
                        <div class="song-wrapper" style="padding:0 20px 20px 20px;">
                            <template v-if="songs&&songs.length">
                                <div class="song" v-for="(song,index) in songs" :key="song.id">
                                    <span class="index">{{index|num}}</span>
                                    <span class="songname">{{song.name}}</span>
                                    <span class="play" @click="onClickPlay(song)">
                                        <Icon type="md-play" size="4" class="icon" style="cursor:pointer;" />
                                    </span>
                                </div>
                            </template>
                        </div>
                    </TabPane>
                    <TabPane label="专辑" name="album">
                        <template v-if="albums&&albums.length">
                            <x-sub v-for="album in albums" :key="album.id" :album="album" @click-album-song="onAlbumSong($event)"></x-sub>
                        </template>
                    </TabPane>
                    <TabPane label="歌手详情" name="detail">
                        <p style="padding-left:20px;text-indent:2em;">{{singer.summary}}</p>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    import xPlay from "@/components/common/play.vue";
    import xSub from './sub.vue'
    export default {
        name: "SingerDetail",
        components: { xPlay, xSub },
        data() {
            return {
                singer: null,
                source: "",
                songname: ""
            };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs
            }),
            songs() {
                return this.allSongs.filter(song => song.singer === this.singer.name);
            },
            albums() {
                return this.$store.state.album.allAlbums && this.$store.state.album.allAlbums.filter(album => album.singer === this.singer.name);
            }
        },
        filters: {
            num(val) {
                let str = "";
                val + 1 <= 9 ? (str = `0${val + 1}`) : (str = `${val + 1}`);
                return str;
            }
        },
        mounted() {
            this.$route.query &&
                this.$route.query.id &&
                this.getSinger(this.$route.query.id);
        },
        methods: {
            ...mapActions(["destroySinger"]),
            getSinger(id) {
                this.singer = this.$store.getters.getSingerById(id);
            },
            onBack() {
                this.$router.go(-1);
            },
            onClickPlay(song) {
                this.source = song.url;
                this.songname = song.name;
                this.$refs.play.play();
            },
            onEdit() {
                this.$router.push({
                    path: "/singer/list/edit",
                    query: { id: this.singer.id }
                });
            },
            onDelete() {
                this.$Modal.confirm({
                    title: "警告",
                    content: "<p>该操作将永久删除该歌手信息，是否继续？</p>",
                    okText: "继续删除",
                    cancelText: "取消删除",
                    onOk: () => {
                        this.destroySinger(this.singer.id).then(res => {
                            this.$Message.info("成功删除歌手");
                            this.onBack();
                        });
                    },
                    onCancel: () => {
                        this.$Message.info("已取消删除");
                    }
                });
            },
            onAlbumSong(song) {
                this.source = song.url;
                this.songname = song.name;
                this.$refs.play.play();
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .singer-detail {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        position: relative;
        padding: 0 20px;
        >.play {
            width: calc(100% + 42px);
            position: absolute;
            right: 0;
            bottom: -20px;
            background: #fff;
            border-top: 0.5px solid $border;
            z-index: 1;
            padding: 5px 0;
            transform: translateX(20px);
        }
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
        >.singer-info {
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            min-height: 180px;
            position: relative;
            >.button {
                position: absolute;
                bottom: 20px;
                right: 0;
            }
            >.avatar {
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
                height: 150px;
                >.names {
                    >p {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-bottom: 5px;
                        >span {
                            font-size: 18px;
                            color: $title;
                            &:first-child {
                                background: $error;
                                color: #fff;
                                font-size: 12px;
                                padding: 4px 6px;
                                border-radius: 4px;
                                margin-right: 8px;
                            }
                        }
                    }
                    >span {
                        margin-left: 44.67px;
                    }
                }
                >.counts {
                    font-size: 12px;
                    color: $content;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    margin-top: 5px;
                    line-height: 1.8em;
                }
            }
        }
        >.singer-detail {
            width: 100%;
            height: 60%;
            font-size: 12px;
            color: $content;
            overflow: auto;
            position: relative;
            .song {
                color: $sub;
                display: flex;
                align-items: center;
                line-height: 2em;
                padding-left: 20px;
                border: 0.5px solid $border;
                border-bottom: none;
                border-top: none;
                cursor: default;
                &:nth-child(2n) {
                    background: $bg;
                }
                &:hover {
                    background: darken($border, 10%);
                }
                &:first-child {
                    border-top: 0.5px solid $border;
                }
                &:last-child {
                    border-bottom: 0.5px solid $border;
                }
                >.index {
                    margin-right: 20px;
                }
                >.play {
                    margin-left: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 0.5px solid $error;
                    color: $error;
                    padding: 2px;
                    border-radius: 2px;
                }
            }
        }
    }
</style>