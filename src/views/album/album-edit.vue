<template>
    <div class="album-edit">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="form-wrapper">
            <Form label-position="left" class="form" v-if="album">
                <FormItem style="margin:0;">
                    <h3>编辑专辑</h3>
                </FormItem>
                <FormItem label="专辑名" style="margin:0;">
                    <Input v-model.trim="album.name"></Input>
                </FormItem>
                <FormItem label="歌手" style="margin:0;">
                    <Input v-model.trim="album.singer"></Input>
                </FormItem>
                <FormItem label="发行时间" style="margin:0;">
                    <Input v-model.trim="album.time"></Input>
                </FormItem>
                <FormItem label="封面链接" style="margin:0;">
                    <Input v-model.trim="album.cover"></Input>
                </FormItem>
                <div style="text-align:end;margin-top:3px;" id="album-cover-edit-container">
                    <Button size="small" type="default" @click="preview">预览封面</Button>
                    <Button size="small" type="default" id="album-cover-edit-picker">上传封面</Button>
                    <x-upload container-id="album-cover-edit-container" browse-id="album-cover-edit-picker" bucket-name="albumcovers" @uploaded="coverUploaded($event)"></x-upload>
                </div>
                <FormItem label="简介" style="margin:0;">
                    <Input v-model.trim="album.summary" type="textarea" :rows="3"></Input>
                </FormItem>
                <FormItem style="text-align:center;margin-top:10px;">
                    <Button style="margin-right: 18px" @click="onBack">取消</Button>
                    <Button type="primary" @click="onSave">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import xUpload from "@/components/upload/upload.vue";
    export default {
        name: "AlbumEdit",
        components: { xUpload },
        data() {
            return { album: null };
        },
        mounted() {
            this.$route.query && this.$route.query.id && this.getAlbum(this.$route.query.id);
        },
        methods: {
            ...mapActions(['updateAlbum']),
            onBack() { this.$router.go(-1); },
            getAlbum(id) {
                this.album = this.$store.getters.getAlbumById(id);
            },
            onSave() {
                if (!this.album.name) {
                    this.$Message.warning("专辑名不能为空");
                    return;
                }
                this.updateAlbum(this.album).then(res => {
                    this.$Message.success('修改成功！');
                })
            },
            coverUploaded(obj) {
                this.album.cover = obj.url + "?x-oss-process=style/avatar";
            },
            preview() {
                if (!this.album.cover) {
                    this.$Message.info("该专辑还没有上传封面！");
                    return;
                }
                window.open(this.album.cover, "_blank");
            },
            onBack() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .album-edit {
        @include container;
        display: flex;
        justify-content: center;
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
        >.form-wrapper {
            width: 80%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            color: $content;
            >.form {
                width: 100%;
                h3 {
                    text-align: center;
                    font-size: 20px;
                    padding: 10px 0;
                    line-height: 1.8em;
                    color: $title;
                }
            }
        }
    }
</style>