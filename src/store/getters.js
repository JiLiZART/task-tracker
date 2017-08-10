const markType = (item, type) => {
  item.type = type;
  return item;
};

const typesAsArray = (items, type) =>
  Object.keys(items).map((id) => markType(items[id], type));

export default {
  workspace(state) {
    return state.workspaces[state.workspace];
  },

  teammates(state) {
    return typesAsArray(state.teammates, 'teammate');
  },

  projects(state) {
    return typesAsArray(state.projects, 'project');
  },

  tasks(state) {
    return typesAsArray(state.tasks, 'task');
  },

  docs(state) {
    return typesAsArray(state.docs, 'doc');
  },

  lastUpdates(state) {
    return state.log.concat().sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    }).slice(0, 10);
  }
};
