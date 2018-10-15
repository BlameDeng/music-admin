import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import store from '@/store'

const router = new Router({
    routes: [{
            path: '/',
            component: () =>
                import('@/views/login/login.vue')
        }, {
            path: '/index',
            component: () =>
                import('@/views/index/index.vue'),
            redirect: '/index/scan',
            meta: { requiresLogin: true },
            children: [{
                path: 'scan',
                component: () =>
                    import('@/views/index/scan.vue'),
                meta: { requiresLogin: true }
            }, {
                path: 'search/:tab?',
                component: () =>
                    import('@/views/index/search.vue'),
                meta: { requiresLogin: true }
            }, {
                path: 'message',
                component: () =>
                    import('@/views/index/message.vue'),
                meta: { requiresLogin: true }
            }]
        }, {
            path: '/song',
            component: () =>
                import('@/views/song/song.vue'),
            meta: { requiresLogin: true },
            children: [{
                    path: 'create',
                    component: () =>
                        import('@/views/song/create.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list/:page?',
                    component: () =>
                        import('@/views/song/list.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'edit',
                    component: () =>
                        import('@/views/song/song-edit.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'detail',
                    component: () =>
                        import('@/views/song/song-detail.vue'),
                    meta: { requiresLogin: true }
                }
            ]
        }, {
            path: '/singer',
            component: () =>
                import('@/views/singer/singer.vue'),
            meta: { requiresLogin: true },
            children: [{
                    path: 'list',
                    component: () =>
                        import('@/views/singer/list.vue'),
                    meta: { requiresLogin: true }
                }, {
                    path: 'create',
                    component: () =>
                        import('@/views/singer/create.vue'),
                    meta: { requiresLogin: true }
                }, {
                    path: 'list/detail',
                    component: () =>
                        import('@/views/singer/singer-detail.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list/edit',
                    component: () =>
                        import('@/views/singer/singer-edit.vue'),
                    meta: { requiresLogin: true }
                }
            ]
        },
        {
            path: '/album',
            component: () =>
                import('@/views/album/album.vue'),
            meta: { requiresLogin: true },
            children: [{
                    path: 'create',
                    component: () =>
                        import('@/views/album/create.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list',
                    component: () =>
                        import('@/views/album/list.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list/edit',
                    component: () =>
                        import('@/views/album/album-edit.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list/detail',
                    component: () =>
                        import('@/views/album/album-detail.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'songslist',
                    component: () =>
                        import('@/views/album/songs-list.vue'),
                    meta: { requiresLogin: true }
                }
            ]
        }, {
            path: '/sheet',
            component: () =>
                import('@/views/sheet/sheet.vue'),
            meta: { requiresLogin: true },
            children: [{
                    path: 'create',
                    component: () =>
                        import('@/views/sheet/create.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list',
                    component: () =>
                        import('@/views/sheet/list.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list/edit',
                    component: () =>
                        import('@/views/sheet/sheet-edit.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'list/detail',
                    component: () =>
                        import('@/views/sheet/sheet-detail.vue'),
                    meta: { requiresLogin: true }
                },
                {
                    path: 'songslist',
                    component: () =>
                        import('@/views/sheet/songs-list.vue'),
                    meta: { requiresLogin: true }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.state.isLogin) {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router