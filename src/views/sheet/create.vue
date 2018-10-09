<template>
    <div class="create-sheet">
        <div class="sheet-info">
            <h3>新建歌单</h3>
            <Form label-position="left" class="form" v-if="formData">
                <FormItem label="歌单名" style="margin:0;">
                    <Input v-model.trim="formData.name"></Input>
                </FormItem>
                <FormItem label="标签" style="margin:0;">
                    <Input v-model.trim="formData.tags"></Input>
                    <span>最多可设置三个标签，以 / 分隔，例如：70后/80后/90后</span>
                </FormItem>
                <FormItem label="封面链接" style="margin:0;">
                    <Input v-model.trim="formData.cover"></Input>
                </FormItem>
                <div style="text-align:end;margin-top:3px;" id="sheet-cover-create-container">
                    <Button size="small" type="default" @click="preview">预览封面</Button>
                    <Button size="small" type="default" id="sheet-cover-create-picker">上传封面</Button>
                    <x-upload container-id="sheet-cover-create-container" browse-id="sheet-cover-create-picker" bucket-name="sheetcovers" @uploaded="coverUploaded($event)"></x-upload>
                </div>
                <FormItem label="简介" style="margin:0;">
                    <Input v-model.trim="formData.summary" type="textarea" :rows="3"></Input>
                </FormItem>
                <FormItem style="text-align:center;margin-top:10px;">
                    <Button style="margin-right: 18px">取消</Button>
                    <Button type="primary" @click="onSave">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    import { mapActions } from 'vuex'
    export default {
        name: 'CreateSheet',
        components: { xUpload },
        data() {
            return {
                formData: {
                    name: '',
                    tags: '',
                    cover: '',
                    summary: ''
                }
            }
        },
        created() {
            // Sheet.createSheet({name:'123',tag1:'xxx',summary:'yyy'}).then(res=>{
            //     console.log(res);
            // })
        },
        methods: {
            ...mapActions(['createSheet', 'fetchAllSheets']),
            onSave() {
                if (!this.formData.name) { this.$Message.warning('歌单名不能为空'); return; }
                let array = [];
                if (this.formData.tags) { array = this.formData.tags.split('/'); }
                this.createSheet({ name: this.formData.name, tag1: array[0] || '', tag2: array[1] || '', tag3: array[2] || '', summary: this.formData.summary, songs: [],cover:this.formData.cover }).then(res => {
                    this.$Message.success('成功创建歌单！');
                    this.fetchAllSheets().then(res => {
                        this.$router.push('/sheet/list');
                    })
                })
            },
            coverUploaded(obj) {
                this.formData.cover = obj.url;
            },
            preview() {
                if (!this.formData.cover) {
                    this.$Message.info('该歌曲还没有上传封面！');
                    return
                }
                window.open(this.formData.cover, '_blank');
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .create-sheet {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        >.sheet-info {
            width: 70%;
            height: 90%;
            padding: 0 30px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: $content;
            >h3 {
                text-align: center;
                font-size: 20px;
                color: $title;
            }
        }
    }
</style>