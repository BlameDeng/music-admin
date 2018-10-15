<template>
    <div class="index">
        <transition name="router-transition">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Index" }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .index {
        @include router-transition;
    }
</style>