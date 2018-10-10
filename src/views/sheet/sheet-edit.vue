<template>
    <div class="sheet-edit">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="sheet-info">
            <h3>编辑歌单</h3>
            <Form label-position="left" class="form" v-if="sheet">
                <FormItem label="歌单名">
                    <Input v-model.trim="sheet.name"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="sheet.tag1"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="sheet.tag2"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="sheet.tag3"></Input>
                </FormItem>
                <FormItem label="封面链接">
                    <Input v-model.trim="sheet.cover"></Input>
                </FormItem>
                <div style="text-align:end; margin-top:-20px;" id="sheet-cover-upload-container">
                    <Button size="small" type="default" @click="preview">预览封面</Button>
                    <Button size="small" type="default" id="sheet-cover-picker">上传新封面</Button>
                    <x-upload container-id="sheet-cover-upload-container" browse-id="sheet-cover-picker" bucket-name="sheetcovers" @uploaded="coverUploaded($event)"></x-upload>
                </div>
                <FormItem label="简介">
                    <Input v-model.trim="sheet.summary" type="textarea" :rows="4"></Input>
                </FormItem>
                <FormItem style="text-align:center;">
                    <Button style="margin-right: 18px" @click="onBack">取消</Button>
                    <Button type="primary" @click="onSave">保存</Button>
                </FormItem>
            </Form>
        </div>
        <div class="songs">
            <div class="sheet-songs">
                <Button type="error" class="button" @click="pathSheet('removeSong')">从歌单移除</Button>
                <div class="title">
                    已有歌曲列表
                </div>
                <div class="song" v-if="sheetSongs&&sheetSongs.length" v-for="(song,index) in sheetSongs" :key="song.id">
                    <p class="index">{{index+1}}</p>
                    <p class="song-name">{{song.name}}</p>
                    <p class="singer">{{song.singer}}</p>
                    <p :class="{selected:sheetSongId&&sheetSongId.indexOf(song.id)>-1}" @click="onClickSong('sheetSong',song.id)">
                        <Icon type="md-checkmark" class="icon" />
                    </p>
                </div>
            </div>
            <div class="all-songs" v-if="allSongs">
                <Button type="success" class="button" @click="pathSheet('addSong')">添加到歌单</Button>
                <div class="title">
                    歌曲库
                </div>
                <div class="song" v-for="(song,index) in allSongs" :key="song.id">
                    <p class="index">{{index+1}}</p>
                    <p class="song-name">{{song.name}}</p>
                    <p class="singer">{{song.singer}}</p>
                    <p :class="{selected:allId&&allId.indexOf(song.id)>-1}" @click="onClickSong('all',song.id)">
                        <Icon type="md-checkmark" class="icon" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    import xUpload from "@/components/upload/upload.vue";
    export default {
        name: "SheetEdit",
        components: { xUpload },
        data() {
            return {
                selectedSheetSongs: null,
                sheetSongs: null,
                allId: null,
                sheetSongId: null,
                sheet: null
            };
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs
            })
        },
        created() {
            this.$route.query && this.$route.query.id && this.getSheet(this.$route.query.id);
            this.sheet && this.sheet.songs && this.sheet.songs.length && this.getSheetSongs();
        },
        methods: {
            ...mapActions(["fetchAllSongs", "updateSheet"]),
            ...mapMutations(['updateCover']),
            getSheet(id) {
                this.sheet = this.$store.getters.getSheetById(id);
            },
            onBack() { this.$router.go(-1); },
            getSheetSongs() {
                this.sheetSongs = this.$store.getters.getSheetSongs(this.sheet.songs);
            },
            onSave() {
                this.updateSheet(this.sheet).then(res => {
                    this.$Message.success('保存成功');
                });
            },
            preview() {
                if (!this.sheet.cover) {
                    this.$Message.info('该歌单还没有上传封面！');
                    return
                }
                window.open(this.sheet.cover, '_blank');
            },
            coverUploaded(obj) {
                this.sheet.cover = obj.url + '?x-oss-process=style/avatar';
            },
            onClickSong(type, id) {
                if (type === "all") {
                    this.allId = this.allId || [];
                    let index = this.allId.indexOf(id);
                    index === -1 ? this.allId.push(id) : this.allId.splice(index, 1);
                }
                if (type === 'sheetSong') {
                    this.sheetSongId = this.sheetSongId || [];
                    let index = this.sheetSongId.indexOf(id);
                    index === -1 ? this.sheetSongId.push(id) : this.sheetSongId.splice(index, 1);
                }
            },
            pathSheet(type) {
                this.sheet.songs = this.sheet.songs || [];
                if (type === "addSong") {
                    this.allId.forEach(id => {
                        this.sheet.songs.indexOf(id) === -1 ? this.sheet.songs.push(id) : "";
                    });
                    this.updateSheet(this.sheet).then(res => {
                        this.allId = null;
                        this.getSheet(this.sheet.id);
                        this.getSheetSongs();
                    });
                }
                if (type === 'removeSong') {
                    this.sheetSongId.forEach(id => {
                        let index = this.sheet.songs.indexOf(id);
                        this.sheet.songs.splice(index, 1);
                    });
                    this.updateSheet(this.sheet).then(res => {
                        this.sheetSongId = null;
                        this.getSheet(this.sheet.id);
                        this.getSheetSongs();
                    });
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet-edit {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        position: relative;
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
        >.sheet-info {
            width: 40%;
            height: 100%;
            padding: 0 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: $content;
            >h3 {
                margin: 10px 0;
                text-align: center;
                font-size: 20px;
                color: $title;
            }
        }
        >.songs {
            width: 60%;
            height: 100%;
            color: $content;
            font-size: 12px;
            position: relative;
            >.sheet-songs {
                height: 30%;
                padding: 5px 20px;
                overflow: auto;
                >.title {
                    color: $p;
                }
                >.button {
                    position: absolute;
                    top: 30%;
                    margin-top: -25px;
                    right: 25px;
                    padding: 0 4px;
                }
                >.song {
                    display: inline-flex;
                    align-items: center;
                    width: 40%;
                    vertical-align: top;
                    padding: 3px 0 3px 3px;
                    &:hover {
                        background: $bg;
                    }
                    >p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-right: 5px;
                        &:first-child {
                            width: 10%;
                            color: lighten($content, 30%);
                        }
                        &.song-name {
                            width: 50%;
                        }
                        &.singer {
                            width: 30%;
                        }
                        &:last-child {
                            height: 14px;
                            width: 14px;
                            border: 1px solid $border;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-right: 20px;
                            >.icon {
                                display: none;
                            }
                        }
                        &.selected {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            >.icon {
                                display: inline;
                            }
                        }
                    }
                }
            }
            >.all-songs {
                height: 70%;
                padding: 5px 20px;
                overflow: auto;
                border-top: 1px solid $border;
                >.title {
                    color: $p;
                }
                >.button {
                    position: absolute;
                    bottom: 5px;
                    right: 25px;
                    padding: 0 4px;
                }
                >.song {
                    display: inline-flex;
                    align-items: center;
                    width: 40%;
                    vertical-align: top;
                    padding: 3px 0 3px 3px;
                    &:hover {
                        background: $bg;
                    }
                    >p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-right: 5px;
                        &:first-child {
                            width: 10%;
                            color: lighten($content, 30%);
                        }
                        &.song-name {
                            width: 50%;
                        }
                        &.singer {
                            width: 30%;
                        }
                        &:last-child {
                            height: 14px;
                            width: 14px;
                            border: 1px solid $border;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-right: 20px;
                            >.icon {
                                display: none;
                            }
                        }
                        &.selected {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            >.icon {
                                display: inline;
                            }
                        }
                    }
                }
            }
        }
    }
</style>