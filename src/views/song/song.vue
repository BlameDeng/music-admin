<template>
    <div class="song">
        <transition name="router-transition">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Song" }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .song {
        @include router-transition;
    }
</style>