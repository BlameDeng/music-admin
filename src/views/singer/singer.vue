<template>
    <div class="singer">
        <transition name="router-transition">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Singer" }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .singer {
        @include router-transition;
    }
</style>