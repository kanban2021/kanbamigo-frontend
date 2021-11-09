import modules from "../assets/modules/index.json";
import user from "../assets/temp/user.json";

import { createStore } from "vuex";

export default createStore({
  state: {
    modules,
    user,
    workspace: {
      module: -1,
      space: -1,
      view: -1,
    },
  },
  getters: {
    userInfo(state) {
      return {
        name: state.user.name,
        alias: state.user.alias,
        avatar: state.user.avatar,
      };
    },
    workspace: (state) => (a) => {
      const modules = state.modules;
      if (
        state.workspace.module < 0 ||
        typeof state.workspace.module !== "number"
      ) {
        return false;
      }
      const module = modules.find(
        (mod) => mod.index === state.workspace.module
      );

      if (a === "module") {
        const spaces = [];
        for (let i = 0; i < module.spaces.length; i++) {
          if (module.spaces[i].uRs.some((uR) => state.user.uRs.includes(uR))) {
            spaces.push({
              index: module.spaces[i].index,
              name: module.spaces[i].name,
            });
          }
        }

        return {
          index: module.index,
          name: module.name,
          alias: module.alias,
          category: module.category,
          spaces,
        };
      }

      if (
        state.workspace.space < 0 ||
        typeof state.workspace.space !== "number"
      ) {
        return false;
      }
      const space = module.spaces.find(
        (spc) => spc.index === state.workspace.space
      );

      if (a === "space") {
        const views = [];
        for (let i = 0; i < space.views.length; i++) {
          views.push({
            index: space.views[i].index,
            name: space.views[i].name,
          });
        }

        return {
          index: space.index,
          name: space.name,
          views,
        };
      }

      if (
        state.workspace.view < 0 ||
        typeof state.workspace.view !== "number"
      ) {
        return false;
      }

      const view = space.views.find(
        (view) => view.index === state.workspace.view
      );

      if (a === "view") {
        return {
          index: view.index,
          type: view.type,
          meta: view.meta,
        };
      }

      return false;
    },
    modules(state) {
      let modules = JSON.parse(JSON.stringify(state.modules));
      const modulesList = [];

      if (!state.user.uRs.includes("admin")) {
        modules = modules.filter((mod) =>
          mod.uRs.some((uR) => state.user.uRs.includes(uR))
        );
      }

      for (let i = 0; i < modules.length; i++) {
        modulesList.push({
          index: modules[i].index,
          name: modules[i].name,
          alias: modules[i].alias,
          category: modules[i].category,
        });
      }

      return modulesList;
    },
  },
  mutations: {
    selectItem(state, { a, b }) {
      switch (a) {
        case "module": {
          state.workspace.view = -1;
          state.workspace.space = -1;

          if (state.workspace.module === b) {
            state.workspace.module = -1;
          } else {
            state.workspace.module = b;
            state.workspace.space = 0;
            state.workspace.view = 0;
          }

          break;
        }
        case "space": {
          state.workspace.view = -1;

          if (state.workspace.space === b) {
            state.workspace.space = -1;
          } else {
            state.workspace.space = b;
            state.workspace.view = 0;
          }

          break;
        }
        case "view": {
          if (state.workspace.view === b) {
            state.workspace.view = -1;
          } else {
            state.workspace.view = b;
          }

          break;
        }
        default: {
          return "you typed 'a' *wrong* you IDIOT";
        }
      }
    },
  },
});
