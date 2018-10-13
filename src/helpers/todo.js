import AV from 'leancloud-storage'
const APP_ID = 'GXqgHEfcB1PWvg0xx4FBnrAC-gzGzoHsz';
const APP_KEY = 'zMJKJISLtf61iaTTtz5eAl8R';
// AV.init({ appId: APP_ID, appKey: APP_KEY });

const Todo = {}
//新建一个对象
Todo.createTodo = function(obj) {
    if (typeof obj !== 'object') {
        return Promise.reject('create方法必须传一个非空对象作为参数！');
    }
    let entries = Object.entries(obj);
    if (entries.length === 0) {
        return Promise.reject('create方法必须传一个非空对象作为参数！');
    }
    let todo = new AV.Object('Todo');
    entries.forEach(array => {
        todo.set(array[0], array[1]);
    });
    return todo.save();
};
//获取所有歌曲
Todo.fetchAllTodos = function() {
    let query = new AV.Query('Todo');
    return query.find();
}
//更新对象
Todo.updateTodo = function(obj, id) {
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
    let todo = AV.Object.createWithoutData('Todo', id);
    // 修改属性
    entries.forEach(array => {
        todo.set(array[0], array[1]);
    });
    // 保存到云端
    return todo.save();
}
//删除对象
Todo.destroyTodo = function(id) {
    let todo = AV.Object.createWithoutData('Todo', id);
    return todo.destroy();
}

export default Todo