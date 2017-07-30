import uuidv4 from 'uuid/v4';
import avatarUrl from '@/utils/avatarUrl';
import {merge} from 'lodash';
import Vue from 'vue'
import {clearStorage} from './index';

const mates = [
  'pedro1@runby.com',
  'silvio@runby.com',
  'adren@runby.com'
];

export default {
  start(state, email) {
    const id = uuidv4();

    state.user = {
      _id: id,
      username: email,
      avatar: avatarUrl(email)
    };

    Vue.set(state.teammates, id, {_id: id, username: email, avatar: avatarUrl(email)});

    mates.forEach((email) => {
      const id = uuidv4();

      Vue.set(state.teammates, id, {_id: id, username: email, avatar: avatarUrl(email)});
    })
  },

  logout(state) {
    Vue.set(state, 'user', {});
  },

  clear(state) {
    clearStorage();
    location.reload(); //@TODO find workaround
  },

  createWorkspace(state, params) {
    const id = uuidv4();

    params._id = id;

    Vue.set(state.workspaces, id, params);

    state.workspace = id;
  },

  changeWorkspace(state, id) {
    state.workspace = id;
  },

  createProject(state, params) {
    params.docs = params.docs ? params.docs : [];
    params.tasks = params.tasks ? params.tasks : [];

    Vue.set(state.projects, params._id, params);
  },

  updateProject(state, params) {
    const current = state.projects[params._id];

    Vue.set(state.projects, params._id, merge({}, current, params));
  },

  createTask(state, {task, project}) {
    task.comments = task.comments ? task.comments : [];
    task.done = task.done ? task.done : false;

    state.projects[project._id].tasks.push(task._id);

    Vue.set(state.tasks, task._id, task);
  },

  updateTask(state, {task}) {
    const current = state.tasks[task._id];

    Vue.set(state.tasks, task._id, merge({}, current, task));
  },

  createDoc(state, {doc, project}) {
    doc.comments = doc.comments ? doc.comments : [];

    state.projects[project._id].docs.push(doc._id);

    Vue.set(state.docs, doc._id, doc);
  },

  updateDoc(state, {doc}) {
    const current = state.docs[doc._id];

    Vue.set(state.docs, doc._id, merge({}, current, doc));
  },

  createComment(state, {comment, entity, type}) {
    state[type][entity._id].comments.push(comment._id);

    Vue.set(state.comments, comment._id, comment);
  },

  updateComment(state, {comment}) {
    const current = state.comments[comment._id];

    Vue.set(state.comments, comment._id, merge({}, current, comment));
  },

  logAction(state, params) {
    state.log.push(params);
  }
};
