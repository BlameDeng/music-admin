<template>
    <div class="album">
        <transition name="router-transition">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Album" }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .album {
        @include router-transition;
    }
</style>