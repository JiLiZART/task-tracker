import uuidv4 from 'uuid/v4';

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
const createProject = ({title = '', text = '', created = new Date()}) => ({
  _id: uuidv4(),
  title,
  text,
  created,
  isNew: true,
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

  createTeamMate({commit}, params) {
    const entity = createTeamMate(params);

    commit('createTeamMate', entity);

    return entity;
  },

  createWorkspace({commit}, params) {
    const entity = createWorkspace(params);

    commit('createWorkspace', entity);

    return entity;
  },

  createProject({commit}, params) {
    const entity = createProject(params);

    commit('createProject', entity);

    return entity
  },

  createTask({commit}, params) {
    const entity = createTask(params);

    commit('createTask', entity);

    return entity
  },

  createDoc({commit}, params) {
    const entity = createDoc(params);

    commit('createDoc', entity);

    return entity;
  },

  createComment({commit}, params) {
    const entity = createComment(params);

    commit('createComment', entity);

    return entity;
  }
};
