<template>
    <div class="song-edit">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="form-wrapper">
            <Form label-position="left" class="form" v-if="song">
                <FormItem style="margin:0;">
                    <h3>编辑歌曲</h3>
                </FormItem>
                <FormItem label="歌名" style="margin:0;">
                    <Input v-model.trim="song.name"></Input>
                </FormItem>
                <FormItem label="歌手" style="margin:0;">
                    <Input v-model.trim="song.singer"></Input>
                </FormItem>
                <FormItem label="歌曲链接" style="margin:0;">
                    <Input v-model.trim="song.url"></Input>
                </FormItem>
                <FormItem label="封面链接" style="margin:0;">
                    <Input v-model.trim="song.cover" ref="cover"></Input>
                    <div style="text-align:end;" id="avatar-upload-container">
                        <Button size="small" type="default" @click="preview">预览封面</Button>
                        <Button size="small" type="default" id="avatar-picker">上传新封面</Button>
                    </div>
                    <x-upload container-id="avatar-upload-container" browse-id="avatar-picker" bucket-name="songcovers" @uploaded="coverUploaded($event)"></x-upload>
                </FormItem>
                <FormItem label="歌词" style="margin:0;">
                    <Input type="textarea" v-model.trim="song.lrc" :rows="3"></Input>
                </FormItem>
                <FormItem style="text-align:center;margin-top:10px;">
                    <Button style="margin-right: 28px" @click="onBack">取消</Button>
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
        name: "SongEdit",
        components: { xUpload },
        data() {
            return { song: null }
        },
        created() {
            this.$route.query && this.$route.query.id && this.getSong(this.$route.query.id);
        },
        methods: {
            ...mapActions(['updateSong', 'destroySong']),
            onBack() {
                this.$router.go(-1);
            },
            getSong(id) {
                this.song = this.$store.getters.getSongById(id);
            },
            onSave() {
                this.updateSong(this.song).then(res => {
                    this.$Message.success('保存成功！');
                })
            },
            preview() {
                if (!this.song.cover) {
                    this.$Message.info('该歌曲还没有上传封面！');
                    return
                }
                window.open(this.song.cover, '_blank');
            },
            coverUploaded(obj) {
                this.song.cover = obj.url + '?x-oss-process=style/avatar';
            },
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .song-edit {
        @include container;
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