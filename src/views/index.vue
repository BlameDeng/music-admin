<template>
    <div class="index">
        <div class="container">
            <canvas id="xxx"></canvas>
        </div>
    </div>
</template>
<script>
    import Canvas from '@/helpers/canvas.js'
    export default {
        name: 'Index',
        components: {},
        data() {
            return {};
        },
        mounted() {
            let canvas1 = new Canvas('#xxx');
            canvas1.drawRectangular([10, 10, 40, 40], 'fill', 'black');
            canvas1.drawRectangular([60, 10, 40, 40], 'stroke', 'black');
            canvas1.drawRectangular([10, 10, 20, 20], 'clear');
            canvas1.draw([
                [200, 0],
                [150, 50],
                [250, 50]
            ], 'fill', 'red');
            canvas1.draw([
                [200, 100],
                [150, 150],
                [250, 150]
            ]);
        },
    };
</script>
<style scoped lang="scss">
    .container {
        border: 1px solid #ddd;
        display: inline-flex;
    }
</style>