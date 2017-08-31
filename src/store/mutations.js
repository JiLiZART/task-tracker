// import uniqBy from 'lodash/uniqBy';
import Vue from 'vue'

export default {
  login(state, entity) {
    state.user = entity._id;
  },

  logout(state) {
    Vue.set(state, 'user', null);
  },

  updateUser(state, params) {
    const current = state.teammates[state.user];

    Vue.set(state.teammates, state.user, Object.assign({}, current, params));
  },

  createTeamMate(state, entity) {
    Vue.set(state.teammates, entity._id, entity);

    state.workspaces[state.workspace].teammates.push(entity._id);
  },

  addTeamMateToWorkspace(state, {mate, workspace}) {
    state.workspaces[workspace._id].teammates.push(mate._id);
  },

  createWorkspace(state, entity) {
    Vue.set(state.workspaces, entity._id, entity);

    state.workspace = entity._id;
  },

  changeWorkspace(state, id) {
    state.workspace = id;
  },

  /**
   * Projects
   */

  createProject(state, entity) {
    Vue.set(state.projects, entity._id, entity);

    state.workspaces[state.workspace].projects.push(entity._id);
  },

  updateProject(state, {_id, title, text}) {
    const current = state.projects[_id];
    const entity = {title, text};

    Vue.set(state.projects, _id, Object.assign({}, current, entity));
  },

  /**
   * Tasks
   */

  createTask(state, entity) {
    Vue.set(state.tasks, entity._id, entity);
  },

  addTaskToProject(state, {task, project}) {
    state.projects[project._id].tasks.push(task._id);
  },

  moveTaskFromProject(state, {task, from, to}) {
    const tasks = state.projects[from._id].tasks,
      taskIndex = tasks.indexOf(task._id);

    tasks.splice(taskIndex, 1);

    state.projects[to._id].tasks.push(task._id);
  },

  updateTask(state, {task}) {
    const current = state.tasks[task._id];

    Vue.set(state.tasks, task._id, Object.assign({}, current, task));
  },

  removeTask(state, {task, project}) {
    if (project) {
      const tasks = state.projects[project._id].tasks,
        taskIndex = tasks.indexOf(task._id);

      tasks.splice(taskIndex, 1);
    }

    Vue.delete(state.tasks, task._id);
  },

  /**
   * Documents
   */

  createDoc(state, entity) {
    Vue.set(state.docs, entity._id, entity);
  },

  addDocToProject(state, {doc, project}) {
    state.projects[project._id].docs.push(doc._id);
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

  /**
   * Comments
   */

  createComment(state, entity) {
    Vue.set(state.comments, entity._id, entity);
  },

  addCommentToEntity(state, {comment, typeId, type}) {
    state[type][typeId].comments.push(comment._id);
  },

  updateComment(state, {comment}) {
    const current = state.comments[comment._id];

    Vue.set(state.comments, comment._id, Object.assign({}, current, comment));
  },

  removeComment(state, {comment, typeId, type}) {
    const comments = state[type][typeId].comments;
    const commentIndex = comments.indexOf(comment._id);

    comments.splice(commentIndex, 1);

    Vue.delete(state.comments, comment._id);
  },

  logAction(state, params) {
    params.created = params.created || new Date();
    params.workspace = state.workspace;

    state.log.push(params);
  }
};
