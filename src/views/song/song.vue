<template>
    <div class="song">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "Song",
        data() { return {}; },
        methods: {}
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .song {
        width: 100%;
        height: 100%;
    }
</style>