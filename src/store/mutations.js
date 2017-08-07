import uuidv4 from 'uuid/v4';
import avatarUrl from '@/utils/avatarUrl';
import merge from 'lodash/merge';
import uniqBy from 'lodash/uniqBy';
import Vue from 'vue'

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
  },

  logout(state) {
    Vue.set(state, 'user', {});
  },

  updateUser(state, params) {
    const current = state.user;

    Vue.set(state, 'user', merge({}, current, params));
  },

  inviteTeamMate(state, email) {
    const id = uuidv4();

    Vue.set(state.teammates, id, {_id: id, username: email, avatar: avatarUrl(email)});
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
    task = task || {};
    task._id = uuidv4();
    task.title = task.title || '';
    task.comments = task.comments || [];
    task.followers = task.followers || [];
    task.performers = task.performers || [];
    task.done = task.done || false;
    task.isNew = true;

    state.projects[project._id].tasks.push(task._id);

    Vue.set(state.tasks, task._id, task);
  },

  updateTask(state, {task}) {
    const current = state.tasks[task._id];

    Vue.set(state.tasks, task._id, merge({}, current, task));
  },

  removeTask(state, {task, project}) {
    const tasks = state.projects[project._id].tasks;
    const taskIndex = tasks.indexOf(task._id);

    Vue.delete(state.tasks, task._id);

    tasks.splice(taskIndex, 1);
  },

  addFollowersToTask(state, {task, users}) {
    const tasks = state.tasks[task._id];
    const followers = uniqBy(tasks.followers.concat(users), '_id');

    Vue.set(tasks, 'followers', followers);
  },

  createDoc(state, {doc, project}) {
    doc = doc || {};
    doc._id = uuidv4();
    doc.title = doc.title || '';
    doc.comments = doc.comments || [];
    doc.followers = doc.followers || [];
    doc.isNew = true;

    state.projects[project._id].docs.push(doc._id);

    Vue.set(state.docs, doc._id, doc);
  },

  updateDoc(state, {doc}) {
    const current = state.docs[doc._id];

    Vue.set(state.docs, doc._id, merge({}, current, doc));
  },

  removeDoc(state, {doc, project}) {
    const docs = state.projects[project._id].docs;
    const docIndex = docs.indexOf(doc._id);

    Vue.delete(state.docs, doc._id);

    docs.splice(docIndex, 1);
  },

  addFollowersToDoc(state, {doc, users}) {
    const docs = state.docs[doc._id];
    const followers = users.lnegth ? uniqBy(docs.followers.concat(users), '_id') : [];

    Vue.set(docs, 'followers', followers);
  },

  createComment(state, {comment, entity, type}) {
    const id = uuidv4();

    comment._id = id;
    comment.created = new Date();

    state[type][entity._id].comments.push(id);

    Vue.set(state.comments, id, comment);
  },

  updateComment(state, {comment}) {
    const current = state.comments[comment._id];

    Vue.set(state.comments, comment._id, merge({}, current, comment));
  },

  logAction(state, params) {
    state.log.push(params);
  }
};
