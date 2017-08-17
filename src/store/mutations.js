import uuidv4 from 'uuid/v4';
// import uniqBy from 'lodash/uniqBy';
import Vue from 'vue'

const createTeamMate = ({username}) => ({
  _id: uuidv4(),
  username,
  type: 'teammate'
});

const createWorkspace = ({title}) => ({
  _id: uuidv4(),
  title,
  projects: [],
  teammates: [],
  type: 'workspace'
});

const createProject = ({title, text}) => ({
  _id: uuidv4(),
  title,
  text,
  docs: [],
  tasks: [],
  type: 'project'
});

const createTask = ({title = '', text = '', created = new Date()}) => ({
  _id: uuidv4(),
  title,
  text,
  created,
  comments: [],
  followers: [],
  performers: [],
  done: false,
  isNew: true,
  type: 'task'
});

const createDoc = ({title = '', text = '', created = new Date()}) => ({
  _id: uuidv4(),
  title,
  text,
  created,
  comments: [],
  followers: [],
  isNew: true,
  type: 'doc'
});

const createComment = ({user, text, created = new Date()}) => ({
  _id: uuidv4(),
  user,
  text,
  created,
  type: 'comment'
});

export default {
  start(state, username) {
    const entity = createTeamMate({username});

    Vue.set(state.teammates, entity._id, entity);

    state.user = entity._id;
  },

  logout(state) {
    Vue.set(state, 'user', null);
  },

  updateUser(state, params) {
    const current = state.teammates[state.user];

    Vue.set(state.teammates, state.user, Object.assign({}, current, params));
  },

  inviteTeamMate(state, username) {
    const entity = createTeamMate({username});

    Vue.set(state.teammates, entity._id, entity);

    state.workspaces[state.workspace].teammates.push(entity._id);
  },

  createWorkspace(state, params) {
    const entity = createWorkspace(params);

    entity.teammates.push(state.user);

    Vue.set(state.workspaces, entity._id, entity);

    state.workspace = entity._id;
  },

  changeWorkspace(state, id) {
    state.workspace = id;
  },

  /**
   * Projects
   */

  createProject(state, params) {
    const entity = createProject(params);

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

  createTask(state, {task, project}) {
    const entity = createTask(task || {});

    Vue.set(state.tasks, entity._id, entity);

    state.projects[project._id].tasks.push(entity._id);
  },

  updateTask(state, {task}) {
    const current = state.tasks[task._id];

    Vue.set(state.tasks, task._id, Object.assign({}, current, task));
  },

  removeTask(state, {task, project}) {
    const tasks = state.projects[project._id].tasks,
      taskIndex = tasks.indexOf(task._id);

    Vue.delete(state.tasks, task._id);

    tasks.splice(taskIndex, 1);
  },

  // addFollowersToTask(state, {task, users}) {
  //   const tasks = state.tasks[task._id],
  //     followers = uniqBy(tasks.followers.concat(users), '_id');
  //
  //   Vue.set(tasks, 'followers', followers);
  // },

  /**
   * Documents
   */

  createDoc(state, {doc, project}) {
    const entity = createDoc(doc || {});

    Vue.set(state.docs, entity._id, entity);

    state.projects[project._id].docs.push(entity._id);
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

  // addFollowersToDoc(state, {doc, users}) {
  //   const docs = state.docs[doc._id];
  //   const followers = users.length ? uniqBy(docs.followers.concat(users), '_id') : [];
  //
  //   Vue.set(docs, 'followers', followers);
  // },

  /**
   * Comments
   */

  createComment(state, {comment, typeId, type}) {
    const entity = createComment(comment);

    Vue.set(state.comments, entity._id, entity);

    state[type][typeId].comments.push(entity._id);
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
