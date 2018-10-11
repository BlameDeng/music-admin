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
                import('@/views/song/song.vue'),
            children: [{
                    path: 'create',
                    component: () =>
                        import('@/views/song/create.vue')
                },
                {
                    path: 'list/:page?',
                    component: () =>
                        import('@/views/song/list.vue')
                },
                {
                    path: 'edit',
                    component: () =>
                        import('@/views/song/song-edit.vue')
                },
                {
                    path: 'detail',
                    component: () =>
                        import('@/views/song/song-detail.vue')
                }
            ]
        }, {
            path: '/singer',
            component: () =>
                import('@/views/singer/singer.vue'),
            children: [{
                    path: 'list',
                    component: () =>
                        import('@/views/singer/list.vue')
                }, {
                    path: 'create',
                    component: () =>
                        import('@/views/singer/create.vue')
                }, {
                    path: 'list/detail',
                    component: () =>
                        import('@/views/singer/singer-detail.vue')
                },
                {
                    path: 'list/edit',
                    component: () =>
                        import('@/views/singer/singer-edit.vue')
                }
            ]
        },
        {
            path: '/album',
            component: () =>
                import('@/views/album/album.vue'),
            children: [{
                    path: 'create',
                    component: () =>
                        import('@/views/album/create.vue')
                },
                {
                    path: 'list',
                    component: () =>
                        import('@/views/album/list.vue')
                },
                {
                    path: 'list/edit',
                    component: () =>
                        import('@/views/album/album-edit.vue')
                },
                {
                    path: 'list/detail',
                    component: () =>
                        import('@/views/album/album-detail.vue')
                },
                {
                    path: 'songslist',
                    component: () =>
                        import('@/views/album/songs-list.vue')
                }
            ]
        }, {
            path: '/sheet',
            component: () =>
                import('@/views/sheet/sheet.vue'),
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
                },
                {
                    path: 'list/detail',
                    component: () =>
                        import('@/views/sheet/sheet-detail.vue')
                },
                {
                    path: 'songslist',
                    component: () =>
                        import('@/views/sheet/songs-list.vue')
                }
            ]
        }
    ]
})