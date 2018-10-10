import AV from 'leancloud-storage'
const APP_ID = 'GXqgHEfcB1PWvg0xx4FBnrAC-gzGzoHsz';
const APP_KEY = 'zMJKJISLtf61iaTTtz5eAl8R';
// AV.init({ appId: APP_ID, appKey: APP_KEY });

const Singer = {}
//新建一个对象
Singer.createSinger = function(obj) {
    if (typeof obj !== 'object') {
        return Promise.reject('create方法必须传一个非空对象作为参数！');
    }
    let entries = Object.entries(obj);
    if (entries.length === 0) {
        return Promise.reject('create方法必须传一个非空对象作为参数！');
    }
    let singer = new AV.Object('Singer');
    entries.forEach(array => {
        singer.set(array[0], array[1]);
    });
    return singer.save();
};
//获取所有歌曲
Singer.fetchAllSingers = function() {
    let query = new AV.Query('Singer');
    return query.find();
}
//根据条件查找对象
// Song.querySong = function(obj) {
//     if (typeof obj !== 'object') {
//         return Promise.reject('query方法必须传一个非空对象作为参数！');
//     }
//     let entries = Object.entries(obj);
//     if (entries.length === 0) {
//         return Promise.reject('query方法必须传一个非空对象作为参数！');
//     }
//     let query = new AV.Query('Song');
//     let array = entries[0];
//     query.equalTo(array[0], array[1]);
//     return query.find();
// };
//更新对象
Singer.updateSinger = function(obj, id) {
    if (typeof obj !== 'object') {
        return Promise.reject('update方法必须传一个非空对象作为参数！');
    }
    let entries = Object.entries(obj);
    if (entries.length === 0) {
        return Promise.reject('提交参数为空，未做更改');
    }
    if (!id) {
        return Promise.reject('必须提供id');
    }
    let singer = AV.Object.createWithoutData('Singer', id);
    // 修改属性
    entries.forEach(array => {
        singer.set(array[0], array[1]);
    });
    // 保存到云端
    return singer.save();
}
//删除对象
Singer.destroySinger = function(id) {
    let singer = AV.Object.createWithoutData('Singer', id);
    return singer.destroy();
}

export default Singer