<template>
    <div class="album-create">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <h3>新建专辑</h3>
        <div class="form-wrapper">
            <Form label-position="left" class="form">
                <FormItem label="专辑名" style="margin:0;">
                    <Input v-model.trim="formData.name"></Input>
                </FormItem>
                <FormItem label="歌手" style="margin:0;">
                    <Input v-model.trim="formData.singer"></Input>
                </FormItem>
                <FormItem label="发行时间" style="margin:0;">
                    <Input v-model.trim="formData.time"></Input>
                </FormItem>
                <FormItem label="封面链接" style="margin:0;">
                    <Input v-model.trim="formData.cover"></Input>
                </FormItem>
                <div style="text-align:end;margin-top:3px;" id="album-cover-create-container">
                    <Button size="small" type="default" @click="preview">预览封面</Button>
                    <Button size="small" type="default" id="album-cover-create-picker">上传封面</Button>
                    <x-upload container-id="album-cover-create-container" browse-id="album-cover-create-picker" bucket-name="albumcovers" @uploaded="coverUploaded($event)"></x-upload>
                </div>
                <FormItem label="简介" style="margin:0;">
                    <Input v-model.trim="formData.summary" type="textarea" :rows="3"></Input>
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
    import xUpload from "@/components/upload/upload.vue"
    import { mapActions } from 'vuex'
    export default {
        name: "AlbumCreate",
        components: { xUpload },
        data() {
            return {
                formData: {
                    name: '',
                    singer: '',
                    time: '',
                    cover: '',
                    summary: '',
                    songs: []
                }
            }
        },
        methods: {
            ...mapActions(['createAlbum', 'fetchAllAlbums']),
            onSave() {
                if (!this.formData.name) { this.$Message.warning('专辑名不能为空'); return; }
                this.createAlbum({ ...this.formData }).then(res => {
                    this.$Message.success('成功创建专辑！');
                    this.fetchAllAlbums().then(res => {
                        this.$router.push('/album/list');
                    })
                })
            },
            coverUploaded(obj) {
                this.formData.cover = obj.url + '?x-oss-process=style/avatar';
            },
            preview() {
                if (!this.formData.cover) {
                    this.$Message.info('该专辑还没有上传封面！');
                    return
                }
                window.open(this.formData.cover, '_blank');
            },
            onBack() { this.$router.go(-1); }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .album-create {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        padding-top: 60px;
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
        >h3 {
            text-align: center;
            font-size: 20px;
            padding: 10px 0;
            line-height: 2em;
            color: $title;
            margin-top: -60px;
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
            }
        }
    }
</style>