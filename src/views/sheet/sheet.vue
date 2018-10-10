<template>
    <div class="sheet">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'Sheet',
        components: {},
        data() {
            return {

            }
        },
    }
</script>
<style scoped lang="scss">
    .sheet {
        width: 100%;
        height: 100%;
    }
</style>