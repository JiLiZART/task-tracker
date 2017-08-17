const typesAsArray = (items) => Object.keys(items).map((id) => items[id]);

const selectUser = ({teammates, user}) => teammates[user];
const selectWorkspace = ({workspaces, workspace}) => workspaces[workspace];
const selectProjects = ({projects}, {workspace = {}}) => (workspace.projects || []).map((id) => projects[id]);
const selectTeamMates = ({teammates}, {workspace = {}}) => (workspace.teammates || []).map((id) => teammates[id]);
const selectTasks = ({tasks}, {projects}) => projects.reduce((a, b) => a.concat(b.tasks), []).map((id) => tasks[id]);
const selectDocs = ({docs}, {projects}) => projects.reduce((a, b) => a.concat(b.docs), []).map((id) => docs[id]);

export default {
  user(state) {
    return selectUser(state);
  },

  isLoggedIn(state) {
    return Boolean(state.user);
  },

  workspace(state) {
    return selectWorkspace(state);
  },

  workspaces(state, getters) {
    return typesAsArray(state.workspaces);
  },

  haveWorkspaces(state, getters) {
    return Boolean(getters.workspaces.length > 0);
  },

  projects(state, getters) {
    return selectProjects(state, getters);
  },

  haveProjects(state, getters) {
    return Boolean(getters.projects.length > 0);
  },

  teammates(state, getters) {
    return selectTeamMates(state, getters);
  },

  tasks(state, getters) {
    return selectTasks(state, getters);
  },

  docs(state, getters) {
    return selectDocs(state, getters);
  },

  lastUpdates(state) {
    return state.log
      .filter((item) => item.workspace === state.workspace)
      .concat()
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .slice(0, 10);
  }
};
