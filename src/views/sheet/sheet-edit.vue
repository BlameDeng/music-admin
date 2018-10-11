<template>
    <div class="sheet-edit">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="form-wrapper">
            <Form label-position="left" class="form" v-if="sheet">
                <FormItem style="margin:0;">
                    <h3>编辑歌单</h3>
                </FormItem>
                <FormItem label="歌单名" style="margin:0;">
                    <Input v-model.trim="sheet.name"></Input>
                </FormItem>
                <FormItem label="标签" style="margin:0;">
                    <Input v-model.trim="sheet.tags"></Input>
                </FormItem>
                <FormItem label="封面链接" style="margin:0;">
                    <Input v-model.trim="sheet.cover"></Input>
                </FormItem>
                <div style="text-align:end;margin-top:3px;" id="sheet-cover-upload-container">
                    <Button size="small" type="default" @click="preview">预览封面</Button>
                    <Button size="small" type="default" id="sheet-cover-picker">上传新封面</Button>
                    <x-upload container-id="sheet-cover-upload-container" browse-id="sheet-cover-picker" bucket-name="sheetcovers" @uploaded="coverUploaded($event)"></x-upload>
                </div>
                <FormItem label="简介">
                    <Input v-model.trim="sheet.summary" type="textarea" :rows="3"></Input>
                </FormItem>
                <FormItem style="text-align:center;">
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
        name: "SheetEdit",
        components: { xUpload },
        data() { return { sheet: null }; },
        mounted() {
            this.$route.query && this.$route.query.id && this.getSheet(this.$route.query.id);
        },
        methods: {
            ...mapActions(["updateSheet"]),
            onBack() { this.$router.go(-1); },
            getSheet(id) {
                this.sheet = this.$store.getters.getSheetById(id);
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
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet-edit {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
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