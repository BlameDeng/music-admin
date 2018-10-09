<template>
    <div class="sheet-detail">
        <Icon type="md-arrow-round-back" size="25" class="icon" @click="onBack" />
        <div class="sheet-info">
            <div class="cover">
                <img :src="editingSheet.cover" alt="cover">
            </div>
            <div class="info" v-if="editingSheet">
                <div class="title">
                    <span>歌单</span>
                    <h4>{{editingSheet.name}}</h4>
                </div>
                <div class="time">
                    <span>创建于 {{editingSheet.createdAt}}</span><span>最近更新 {{editingSheet.updatedAt}}</span>
                </div>
                <p class="tags">标签：<span>{{editingSheet.tag1}}</span> / <span>{{editingSheet.tag2}}</span> / <span>{{editingSheet.tag3}}</span></p>
                <p class="summary">{{editingSheet.summary}}</p>
            </div>
        </div>
        <div class="sheet-songs">
            <div class="header">
                <div class="index">&nbsp;</div>
                <div class="name">音乐标题</div>
                <div class="singer">歌手</div>
                <div class="play">试听</div>
            </div>
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
        <div class="play">
            <x-play :source="source" :name="songname" ref="play"></x-play>
        </div>
    </div>
</template>

<script>
    import xPlay from '@/components/common/play.vue'
    import { mapState } from 'vuex'
    export default {
        name: "SheetDetail",
        components: { xPlay },
        data() {
            return { songs: null, source: '', songname: '' }
        },
        computed: {
            ...mapState({
                editingSheet: state => state.sheet.editingSheet
            })
        },
        created() {
            if (this.editingSheet && this.editingSheet.songs && this.editingSheet.songs.length) {
                this.songs = this.$store.getters.getSheetSongs(this.editingSheet.songs);
            }
        },
        methods: {
            onClickPlay(song) {
                this.source = song.url;
                this.songname = song.name;
                this.$refs.play.play();
            },
            onBack(){this.$router.go(-1);},
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet-detail {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        position: relative;
        >.icon{
            position: absolute;
            top: 5px;
            left: 5px;
            color: lighten($sub,20%);
            cursor: pointer;
            &:hover{
                color: $p;
            }
        }
        >.sheet-info {
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
                        border: .5px solid $error;
                        font-size: 12px;
                        color: $error;
                        padding: 2px 4px;
                        border-radius: 6px;
                        margin-right: 6px;
                    }
                    font-size: 20px;
                    color: $title;
                }
                >.time {
                    margin: 15px 0;
                    >span {
                        font-size: 12px;
                        color: $sub;
                        margin-right: 10px;
                    }
                }
                >.tags {
                    margin-bottom: 15px;
                    >span {
                        color: $p;
                        cursor: pointer;
                    }
                }
                >.summary {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            }
        }
        >.sheet-songs {
            width: 80%;
            margin: 0 auto;
            height: 50%;
            color: $content;
            padding-top: 23px;
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
        >.play {
            padding: 10px 0;
        }
    }
</style>