<template>
    <div class="song-detail">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="title">
            <div class="title-inner">
                <h4 class="name">{{song.name}}</h4>
                <p class="singer">
                    <Icon type="md-microphone" class="icon" />
                    {{song.singer}}
                </p>
            </div>
            <p class="cover">
                <img :src="song.cover" alt="cover">
            </p>
        </div>
        <div class="source">
            <div class="info">
                <p class="url"><b>歌曲链接：</b><br>{{song.url}}</p>
                <p class="created-at">创建时间：{{formatDate(song.createdAt)}}</p>
                <p class="updated-at">更新时间：{{formatDate(song.updatedAt)}}</p>
            </div>
            <div class="lrc">
                <span>歌词：</span>
                <br>
                <pre class="lrc-content">{{song.lrc}}</pre>
            </div>
        </div>
        <div class="play">
            <x-play :source="song.url" :name="song.name"></x-play>
        </div>
    </div>
</template>
<script>
    import xPlay from '@/components/common/play.vue'
    import mixin from "@/mixin/mixin.js"
    export default {
        name: "SongDetail",
        components: { xPlay },
        data() {
            return { song: null }
        },
        mixins: [mixin],
        created() {
            this.$route.query && this.$route.query.id && this.getSong(this.$route.query.id);
        },
        methods: {
            onBack() {
                this.$router.go(-1);
            },
            getSong(id) {
                this.song = this.$store.getters.getSongById(id);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .song-detail {
        @include container;
        position: relative;
        >.icon {
            position: absolute;
            top: 5px;
            right: 5px;
            color: lighten($sub, 20%);
            cursor: pointer;
            z-index: 1;
            &:hover {
                color: $p;
            }
        }
        >.title {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 4%;
            padding-bottom: 20px;
            height: 200px;
            position: relative;
            >.title-inner {
                width: 50%;
                text-align: center;
                >.name {
                    font-size: 20px;
                    color: $title;
                    margin-bottom: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 2em;
                }
                >.singer {
                    font-size: 14px;
                    color: $content;
                    >.icon {
                        color: $content;
                    }
                }
            }
            >.cover {
                width: 50%;
                height: 150px;
                >img {
                    width: 150px;
                    height: 150px;
                    vertical-align: top;
                    border-radius: 4px;
                }
            }
        }
        >.source {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 10px 5% 0 5%;
            color: $content;
            height: calc(100% - 200px);
            >.info {
                width: 50%;
                padding-right: 20px;
                padding-top: 10px;
                >.url {
                    font-size: 12px;
                    word-break: break-all;
                }
                >p {
                    margin-bottom: 10px;
                }
            }
            >.lrc {
                width: 50%;
                border: 1px solid $border;
                border-radius: 4px;
                padding: 10px 10px 30px;
                background: $bg;
                height: calc(100% - 50px);
                >span {
                    font-weight: bold;
                }
                >.lrc-content {
                    font-size: 12px;
                    overflow: auto;
                    position: relative;
                    height: 100%;
                }
            }
        }
        >.play {
            width: 80%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>