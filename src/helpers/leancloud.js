import AV from 'leancloud-storage'
const APP_ID = 'GXqgHEfcB1PWvg0xx4FBnrAC-gzGzoHsz';
const APP_KEY = 'zMJKJISLtf61iaTTtz5eAl8R';
AV.init({ appId: APP_ID, appKey: APP_KEY });

class Leancloud {
    constructor(className) {
        this.className = className;
    }

    //创建对象
    create(obj) {
        if (typeof obj !== 'object') {
            return Promise.reject('参数必须为非空对象');
        }
        let entries = Object.entries(obj);
        if (entries.length === 0) {
            return Promise.reject('参数必须为非空对象');
        }
        let instance = new AV.Object(this.className);
        entries.forEach(array => {
            instance.set(array[0], array[1]);
        });
        return instance.save();
    }

    //获取所有对象
    fetchAll() {
        let query = new AV.Query(this.className);
        return query.find();
    }

    //根据条件查找对象
    query(obj) {
        if (typeof obj !== 'object') {
            return Promise.reject('参数必须为非空对象');
        }
        let entries = Object.entries(obj);
        if (entries.length === 0) {
            return Promise.reject('参数必须为非空对象');
        }
        let query = new AV.Query(this.className);
        let array = entries[0];
        query.equalTo(array[0], array[1]);
        return query.find();
    }

    //更新对象
    update(obj, id) {
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
        let instance = AV.Object.createWithoutData(this.className, id);
        entries.forEach(array => {
            instance.set(array[0], array[1]);
        });
        return instance.save();
    }

    //删除对象
    destroy(id) {
        let instance = AV.Object.createWithoutData(this.className, id);
        return instance.destroy();
    }
}

export default Leancloud