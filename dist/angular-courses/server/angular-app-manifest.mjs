
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/Logout"
  },
  {
    "renderMode": 2,
    "route": "/Login"
  },
  {
    "renderMode": 2,
    "route": "/Register"
  },
  {
    "renderMode": 2,
    "route": "/Courses"
  },
  {
    "renderMode": 2,
    "route": "/Courses/ListCourses"
  },
  {
    "renderMode": 2,
    "route": "/Courses/MyCourses"
  },
  {
    "renderMode": 2,
    "route": "/Courses/ManageCourses"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23619, hash: '9df0dd71d24b2e10aaa0a950e8c6c6d1c2156f349ca30dc7adc4e848d1feb8ae', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17193, hash: 'fc7ac483bc4040dffe885eb4d4928c5e586753e789e0c104e3e6e5cc46eead72', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'Login/index.html': {size: 89012, hash: 'f1e4f78c9c72bece5e8ac569d27ec9b18ac98451bd64276a3b2fc91778c16ad3', text: () => import('./assets-chunks/Login_index_html.mjs').then(m => m.default)},
    'Courses/ListCourses/index.html': {size: 23975, hash: '426e2a32f93d3ee17343293a86deed4828074d00aa8835c14f9afe7b7d980977', text: () => import('./assets-chunks/Courses_ListCourses_index_html.mjs').then(m => m.default)},
    'Courses/MyCourses/index.html': {size: 23975, hash: '426e2a32f93d3ee17343293a86deed4828074d00aa8835c14f9afe7b7d980977', text: () => import('./assets-chunks/Courses_MyCourses_index_html.mjs').then(m => m.default)},
    'index.html': {size: 49637, hash: 'b0af3a648e2a48120b70565acdc98b12b80374bf9ba4818dc09dac44bc45fa3d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'Courses/ManageCourses/index.html': {size: 23975, hash: '426e2a32f93d3ee17343293a86deed4828074d00aa8835c14f9afe7b7d980977', text: () => import('./assets-chunks/Courses_ManageCourses_index_html.mjs').then(m => m.default)},
    'Register/index.html': {size: 103666, hash: '1f34b0a238ee1ec778579238de3cfe735d685b2b9255e84f7f9588a82f4d543c', text: () => import('./assets-chunks/Register_index_html.mjs').then(m => m.default)},
    'Courses/index.html': {size: 51748, hash: 'bd10910f75e4fc57cd3c3f8c91c7a42327e70e41936f8c8c5cd53908db14953e', text: () => import('./assets-chunks/Courses_index_html.mjs').then(m => m.default)},
    'styles-SIMXPKYJ.css': {size: 6979, hash: 'ZmtAN+hhhec', text: () => import('./assets-chunks/styles-SIMXPKYJ_css.mjs').then(m => m.default)}
  },
};
