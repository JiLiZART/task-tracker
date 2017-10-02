import Vue from 'vue'
import Router from 'vue-router'

import CreateWorkspace from '@/views/CreateWorkspace'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Member from '@/views/Member'
import Search from '@/views/Search'
import Settings from '@/views/Settings'
import Team from '@/views/Team'
import TeamAddUsers from '@/views/TeamAddUsers'

Vue.use(Router);

export function createRouter() {
  return new Router({
    routes: [
      {
        path: '/create-workspace',
        name: 'create-workspace',
        component: CreateWorkspace
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/member/:id',
        name: 'member',
        component: Member
      },
      {
        path: '/team',
        name: 'team',
        component: Team
      },
      {
        path: '/team/add',
        name: 'team-add',
        component: TeamAddUsers
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      },
      {
        path: '/search/:query',
        name: 'search',
        component: Search
      },
      {
        path: '/',
        name: 'login',
        component: Login
      },
    ]
  });
}
