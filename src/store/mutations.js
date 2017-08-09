import uuidv4 from 'uuid/v4';
import uniqBy from 'lodash/uniqBy';
import Vue from 'vue'

export default {
  start(state, email) {
    const id = uuidv4();

    state.user = {
      _id: id,
      username: email
    };

    Vue.set(state.teammates, id, {_id: id, username: email});
  },

  logout(state) {
    Vue.set(state, 'user', {});
  },

  updateUser(state, params) {
    const current = state.user;

    Vue.set(state, 'user', Object.assign({}, current, params));
  },

  inviteTeamMate(state, email) {
    const id = uuidv4();

    Vue.set(state.teammates, id, {_id: id, username: email});
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

    Vue.set(state.projects, params._id, Object.assign({}, current, params));
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
    task.created = task.created || new Date();

    state.projects[project._id].tasks.push(task._id);

    Vue.set(state.tasks, task._id, task);
  },

  updateTask(state, {task}) {
    const current = state.tasks[task._id];

    Vue.set(state.tasks, task._id, Object.assign({}, current, task));

    console.log('updated task', state.tasks[task._id]);
  },

  removeTask(state, {task, project}) {
    const tasks = state.projects[project._id].tasks,
      taskIndex = tasks.indexOf(task._id);

    Vue.delete(state.tasks, task._id);

    tasks.splice(taskIndex, 1);
  },

  addFollowersToTask(state, {task, users}) {
    const tasks = state.tasks[task._id],
      followers = uniqBy(tasks.followers.concat(users), '_id');

    Vue.set(tasks, 'followers', followers);
  },

  createDoc(state, {doc, project}) {
    doc = doc || {};
    doc._id = uuidv4();
    doc.title = doc.title || '';
    doc.comments = doc.comments || [];
    doc.followers = doc.followers || [];
    doc.isNew = true;
    doc.created = doc.created || new Date();

    state.projects[project._id].docs.push(doc._id);

    Vue.set(state.docs, doc._id, doc);
  },

  updateDoc(state, {doc}) {
    const current = state.docs[doc._id];

    Vue.set(state.docs, doc._id, Object.assign({}, current, doc));
  },

  removeDoc(state, {doc, project}) {
    const docs = state.projects[project._id].docs,
      docIndex = docs.indexOf(doc._id);

    Vue.delete(state.docs, doc._id);

    docs.splice(docIndex, 1);
  },

  addFollowersToDoc(state, {doc, users}) {
    const docs = state.docs[doc._id];
    const followers = users.length ? uniqBy(docs.followers.concat(users), '_id') : [];

    Vue.set(docs, 'followers', followers);
  },

  createComment(state, {comment, entity, type}) {
    const id = uuidv4();

    comment._id = id;
    comment.created = comment.created || new Date();

    state[type][entity._id].comments.push(id);

    Vue.set(state.comments, id, comment);
  },

  updateComment(state, {comment}) {
    const current = state.comments[comment._id];

    Vue.set(state.comments, comment._id, Object.assign({}, current, comment));
  },

  removeComment(state, {comment, entity, type}) {
    const comments = state[type][entity._id].comments;
    const commentIndex = comments.indexOf(comment._id);

    comments.splice(commentIndex, 1);

    Vue.delete(state.comments, comment._id);
  },

  logAction(state, params) {
    params.created = params.created || new Date();

    state.log.push(params);
  }
};
