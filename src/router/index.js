import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import CreateProject from '@/views/CreateProject'
import CreateWorkspace from '@/views/CreateWorkspace'
import Dashboard from '@/views/Dashboard'
import Document from '@/views/Document'
import InviteTeammates from '@/views/InviteTeammates'
import Settings from '@/views/Settings'
import Search from '@/views/Search'
import Member from '@/views/Member'
import Project from '@/views/Project'
import Task from '@/views/Task'
import TeamLoad from '@/views/TeamLoad'

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
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/doc/:id',
        component: Document
      },
      {
        path: '/invite-teammates',
        component: InviteTeammates
      },
      {
        path: '/member/:id',
        name: 'member',
        component: Member
      },
      {
        path: '/project/:id',
        name: 'project',
        component: Project
      },
      {
        path: '/task/:id',
        name: 'task',
        component: Task
      },
      {
        path: '/team-load',
        component: TeamLoad
      },
      {
        path: '/settings',
        component: Settings
      },
      {
        path: '/search/:query',
        name: 'search',
        component: Search
      },
      {
        path: '/',
        component: Login
      },
    ]
  });
}
