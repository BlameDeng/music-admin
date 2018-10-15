import AV from 'leancloud-storage'
import key from '../../leancloudkey.json'
AV.init({ appId: key.APP_ID, appKey: key.APP_KEY });

class Leancloud {
    constructor(className) {
        this.className = className;
    }

    //创建对象
    create(data) {
        if (typeof data !== 'object') {
            return Promise.reject('参数必须为非空对象');
        }
        let entries = Object.entries(data);
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

    //更新对象
    update(data, id) {
        if (typeof data !== 'object') {
            return Promise.reject('参数必须为非空对象');
        }
        let entries = Object.entries(data);
        if (entries.length === 0) {
            return Promise.reject('参数必须为非空对象');
        }
        if (!id) { return Promise.reject('必须提供id'); }
        let instance = AV.Object.createWithoutData(this.className, id);
        entries.forEach(array => {
            instance.set(array[0], array[1]);
        });
        return instance.save();
    }

    //删除对象
    destroy(id) {
        if (!id) { return Promise.reject('必须提供id'); }
        let instance = AV.Object.createWithoutData(this.className, id);
        return instance.destroy();
    }
}

export default Leancloud