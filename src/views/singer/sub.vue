<template>
    <div class="sub">
        <div class="album-info">
            <div class="cover">
                <img :src="album.cover" alt="cover">
            </div>
            <p class="time">
                {{album.time}}
            </p>
        </div>
        <div class="album-songs">
            <div class="album-name">{{album.name}}</div>
            <template v-if="songs&&songs.length">
                <div class="song-wrapper">
                    <div class="song" v-for="(song,index) in songs" :key="song.id">
                        <div class="index">{{index+1}}</div>
                        <div class="name">{{song.name}}</div>
                        <div class="singer">{{song.singer}}</div>
                        <div class="play">
                            <Icon type="md-play" size="12" class="icon" style="cursor:pointer;" @click="onClickPlay(song)" />
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    export default {
        name: "Sub",
        props: { album: { type: Object } },
        mounted() {
            this.album &&
                this.album.songs &&
                this.album.songs.length &&
                this.getSongs();
        },
        data() {
            return { songs: null };
        },
        computed: {},
        methods: {
            getSongs() {
                this.songs = this.$store.getters.getSongsByArray(this.album.songs);
            },
            onClickPlay(song) {
                this.$emit('click-album-song', song);
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sub {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 40px;
        >.album-info {
            width: 150px;
            margin-right: 20px;
            >.cover {
                >img {
                    vertical-align: top;
                    width: 150px;
                    height: 150px;
                    cursor: pointer;
                }
            }
            >.time {
                text-align: start;
                line-height: 2em;
                color: $content;
            }
        }
        >.album-songs {
            width: calc(100% - 150px);
            >.album-name {
                font-size: 16px;
                color: $title;
                line-height: 1.8em;
            }
            >.song-wrapper {
                width: 100%;
                >.song {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: $content;
                    font-size: 12px;
                    border-left: 0.5px solid $border;
                    border-right: 0.5px solid $border;
                    &:first-child {
                        border-top: 0.5px solid $border;
                    }
                    &:last-child {
                        border-bottom: 0.5px solid $border;
                    }
                    &:nth-child(2n) {
                        background: $bg;
                    }
                    &:hover {
                        background: darken($bg, 5%);
                    }
                    >.index {
                        width: 10%;
                        padding: 3px 0 2px 10px;
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
        }
    }
</style>