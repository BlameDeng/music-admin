<template>
    <div class="index">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "Index"
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .index {
        width: 100%;
        height: 100%;
    }
</style>