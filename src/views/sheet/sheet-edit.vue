<template>
    <div class="sheet-edit">
        <div class="sheet-info">
            <h3>编辑歌单</h3>
            <Form label-position="left" class="form">
                <FormItem label="歌单名">
                    <Input v-model.trim="editingSheet.name"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="editingSheet.tag1"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="editingSheet.tag2"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="editingSheet.tag3"></Input>
                </FormItem>
                <FormItem label="封面链接">
                    <Input v-model.trim="editingSheet.cover"></Input>
                </FormItem>
                <div style="text-align:end; margin-top:-20px;">
                    <Button size="small" type="default">预览封面</Button>
                    <Button size="small" type="default">上传新封面</Button>
                </div>
                <FormItem label="简介">
                    <Input v-model.trim="editingSheet.summary" type="textarea" :rows="3"></Input>
                </FormItem>
                <FormItem style="text-align:center;">
                    <Button style="margin-right: 18px">取消</Button>
                    <Button type="primary">保存</Button>
                </FormItem>
            </Form>
        </div>
        <div class="songs">
            <div class="sheet-songs">
                <div class="title">
                    歌曲列表
                </div>
                <div class="song" v-for="n in 14">
                    <span class="index">{{n}}</span>
                    <span class="song-name">22222</span>
                    <span class="singer">333</span>
                    <span class="">
                        <Icon type="md-checkmark" class="icon" /></span>
                </div>
            </div>
            <div class="all-songs">
                <div class="title">
                    歌曲库
                </div>
                <div class="song" v-for="n in 44">
                    <span class="index">{{n}}</span>
                    <span class="song-name">222333333333333333333333333333333555553333333355555553333333333333333333333322</span>
                    <span class="singer">333</span>
                    <span class="">
                        <Icon type="md-checkmark" class="icon" /></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "SheetEdit",
        data() {
            return {};
        },
        computed: {
            ...mapState({
                editingSheet: state => state.sheet.editingSheet
            })
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
        >.sheet-info {
            border: 1px solid red;
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
            border: 1px solid green;
            width: 60%;
            height: 100%;
            color: $content;
            font-size: 12px;
            >.sheet-songs {
                height: 30%;
                border: 1px solid red;
                padding: 5px 20px;
                overflow: auto;
                >.title {
                    color: $p;
                }
                >.song {
                    display: inline-flex;
                    align-items: center;
                    width: 40%;
                    vertical-align: top;
                    padding: 3px 0;
                    >span {
                        display: inline-flex;
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
                            height: 16px;
                            width: 16px;
                            border: 1px solid $border;
                            border-radius: 4px;
                            cursor: pointer;
                            >.icon {
                                display: none;
                            }
                        }
                        &.select {
                            >.icon {
                                display: inline;
                            }
                        }
                    }
                }
            }
            >.all-songs {
                height: 70%;
                border: 1px solid black;
                padding: 5px 20px;
                overflow: auto;
                >.title {
                    color: $p;
                }
                >.song {
                    display: inline-flex;
                    align-items: center;
                    width: 40%;
                    vertical-align: top;
                    padding: 3px 0;
                    >span {
                        display: inline-flex;
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
                            height: 16px;
                            width: 16px;
                            border: 1px solid $border;
                            border-radius: 4px;
                            cursor: pointer;
                            >.icon {
                                display: none;
                            }
                        }
                        &.select {
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