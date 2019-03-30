import ModelTask from './model-task';

const objectToArray = (object) => Object.keys(object).map((id) => object[id]);

export default class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  updateTask({id, data}) {
    if (this._isOnline()) {
      return this._api.updateTask({id, data})
        .then((task) => {
          this._store.setItem({key: task.id, item: task.toRAW()});
          return task;
        });
    } else {
      const task = data;
      this._needSync = true;
      this._store.setItem({key: task.id, item: task});
      return Promise.resolve(ModelTask.parseTask(task));
    }
  }

  createTask({dataTask}) {
    if (this._isOnline()) {
      return this._api.createTask({dataTask})
        .then((task) => {
          this._store.setItem({key: task.id, item: task.toRAW()});
          return task;
        });
    } else {
      dataTask.id = this._generateId();
      this._needSync = true;

      this._store.setItem({key: dataTask.id, item: dataTask});
      return Promise.resolve(ModelTask.parseTask(dataTask));
    }
  }

  deleteTask({id}) {
    if (this._isOnline()) {
      return this._api.deleteTask({id})
        .then(() => {
          this._store.removeItem({key: id});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  getTasks() {
    if (this._isOnline()) {
      return this._api.getTasks()
        .then((tasks) => {
          this._store.clear();
          tasks.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
          return tasks;
        });
    } else {
      const rawTasksMap = this._store.getAll();
      const rawTasks = objectToArray(rawTasksMap);
      const tasks = ModelTask.parseTasks(rawTasks);

      return Promise.resolve(tasks);
    }
  }

  syncTasks() {
    return this._api.syncTasks({tasks: objectToArray(this._store.getAll())});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
