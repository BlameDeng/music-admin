import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Index
    }, {
        path: '/song',
        component: () =>
            import('@/views/song.vue'),
        children: [{
                path: 'create',
                component: () =>
                    import('@/views/song/create.vue')
            },
            {
                path: 'list',
                component: () =>
                    import('@/views/song/list.vue')
            }
        ]
    }, {
        path: '/sheet',
        component: () =>
            import('@/views/sheet.vue'),
        children: [{
                path: 'create',
                component: () =>
                    import('@/views/sheet/create.vue')
            },
            {
                path: 'list',
                component: () =>
                    import('@/views/sheet/list.vue')
            },
            {
                path: 'list/edit',
                component: () =>
                    import('@/views/sheet/sheet-edit.vue')
            }
        ]
    }]
})