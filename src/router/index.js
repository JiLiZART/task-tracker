import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/Login'
import CreateProject from '@/containers/CreateProject'
import CreateWorkspace from '@/containers/CreateWorkspace'
import Dashboard from '@/containers/Dashboard'
import DocumentView from '@/containers/DocumentView'
import InviteTeammates from '@/containers/InviteTeammates'
import SettingsView from '@/containers/SettingsView'
import SearchView from '@/containers/SearchView'
import MemberView from '@/containers/MemberView'
import ProjectView from '@/containers/ProjectView'
import TaskView from '@/containers/TaskView'
import TeamLoadView from '@/containers/TeamLoadView'

Vue.use(Router);

export function createRouter() {
  return new Router({
    routes: [
      {
        path: '/create-project',
        component: CreateProject
      },
      {
        path: '/create-workspace',
        component: CreateWorkspace
      },
      {
        path: '/dashboard',
        component: Dashboard
      },
      {
        path: '/doc/:id',
        component: DocumentView
      },
      {
        path: '/invite-teammates',
        component: InviteTeammates
      },
      {
        path: '/member/:id',
        name: 'member',
        component: MemberView
      },
      {
        path: '/project/:id',
        name: 'project',
        component: ProjectView
      },
      {
        path: '/task/:id',
        name: 'task',
        component: TaskView
      },
      {
        path: '/team-load',
        component: TeamLoadView
      },
      {
        path: '/settings',
        component: SettingsView
      },
      {
        path: '/search/:query',
        component: SearchView
      },
      {
        path: '/',
        component: Login
      },
    ]
  });
}
