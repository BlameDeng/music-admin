<template>
    <div class="create-sheet">
        <button @click="onClick">123</button>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    import { mapActions } from 'vuex'
    export default {
        name: 'CreateSheet',
        components: {},
        data() {
            return {}
        },
        created() {
            // Sheet.createSheet({name:'123',tag1:'xxx',summary:'yyy'}).then(res=>{
            //     console.log(res);
            // })
            this.fetchAllSheets().then(res=>{
                console.log(res)
            })
        },
        methods: {
            ...mapActions(['createSheet','fetchAllSheets']),
            onClick() {
                this.createSheet({ name: '123', tag1: 'xxx', tag2: 'xxx', tag3: 'xxx', summary: 'yyy' }).then(res=>{
                    console.log(res)
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .create-sheet {}
</style>