<template>
    <div class="singer">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'Singer',
        data() { return {} },
    }
</script>
<style scoped lang="scss">
    .singer {
        width: 100%;
        height: 100%;
    }
</style>