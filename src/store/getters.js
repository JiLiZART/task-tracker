export default {
  workspace(state) {
    const id = state.workspace;
    return state.workspaces[id];
  },

  teammates(state) {
    const mates = state.teammates;
    return Object.keys(mates).map((id) => mates[id]);
  },

  projects(state) {
    const projects = state.projects;
    return Object.keys(projects).map((id) => projects[id]);
  },

  tasks(state) {
    const tasks = state.tasks;
    return Object.keys(tasks).map((id) => tasks[id]);
  },

  docs(state) {
    const docs = state.docs;
    return Object.keys(docs).map((id) => docs[id]);
  },
};
