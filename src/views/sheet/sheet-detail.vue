<template>
    <div class="sheet-detail">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="sheet-info" v-if="sheet">
            <div class="cover">
                <img :src="sheet.cover" alt="cover">
            </div>
            <div class="info">
                <div class="title">
                    <span>歌单</span>
                    <h4>{{sheet.name}}</h4>
                </div>
                <div class="time">
                    <span>创建于 {{sheet.createdAt}}</span><span>最近更新 {{sheet.updatedAt}}</span>
                </div>
                <div class="tags">
                    <span>标签：</span>
                    <span v-for="(tag,index) in sheet.tags.split('/')" :key="index" class="tag-wrapper">
                        <span class="tag" @click="onTag(tag)">{{tag}}</span>
                        <span class="line"> / </span>
                    </span>
                </div>
                <p class="summary">{{sheet.summary}}</p>
            </div>
            <div class="button">
                <Button type="primary" style="padding:2px 5px;" @click="onEditList">编辑歌曲列表</Button>
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
    export default {
        name: "SheetDetail",
        components: { xPlay },
        data() {
            return { songs: null, source: '', songname: '', sheet: null }
        },
        mounted() {
            this.$route.query && this.$route.query.id ? this.getSheet(this.$route.query.id) : '';
            this.sheet && this.sheet.songs && this.sheet.songs.length ?
                this.getSongs(this.sheet.songs) : '';
        },
        methods: {
            getSheet(id) {
                this.sheet = this.$store.getters.getSheetById(id);
            },
            getSongs(array) {
                this.songs = this.$store.getters.getSongsByArray(array);
            },
            onClickPlay(song) {
                this.source = song.url;
                this.songname = song.name;
                this.$refs.play.play();
            },
            onBack() { this.$router.go(-1); },
            onEditList() {
                this.$router.push({ path: '/sheet/songslist', query: { id: this.sheet.id } });
            },
            onTag(tag) {
                this.$router.push({ path: '/index/search', query: { tag: encodeURIComponent(encodeURIComponent(tag)) } });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet-detail {
        @include container;
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
        >.sheet-info {
            width: 80%;
            margin: 0 auto;
            height: 50%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            color: $content;
            position: relative;
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
                    font-size: 20px;
                    color: $title;
                    >span {
                        border: .5px solid $error;
                        font-size: 12px;
                        color: $error;
                        padding: 2px 4px;
                        border-radius: 6px;
                        margin-right: 6px;
                    }
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
                    font-size: 12px;
                    color: $sub;
                    .tag {
                        color: $p;
                        cursor: pointer;
                    }
                    >.tag-wrapper {
                        &:last-child {
                            >.line {
                                display: none;
                            }
                        }
                    }
                }
                >.summary {
                    font-size: 12px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            }
            >.button {
                position: absolute;
                bottom: 5px;
                right: 0;
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
                    background: darken($bg, 5%);
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