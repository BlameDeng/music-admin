<template>
    <div class="sheet-detail">
        <x-play source="http://songsbucket.oss-cn-shenzhen.aliyuncs.com/Pianoboy%E9%AB%98%E8%87%B3%E8%B1%AA%20-%20The%C2%A0truth%C2%A0that%C2%A0you%C2%A0leave.mp3"></x-play>
    </div>
</template>

<script>
    import xPlay from '@/components/common/play.vue'
    import { mapState } from 'vuex'
    export default {
        name: "SheetDetail",
        components: { xPlay },
        data() {
            return {}
        },
        computed: {
            ...mapState({
                editingSheet: state => state.sheet.editingSheet
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet-detail {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    }
</style>