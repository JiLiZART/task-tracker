import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import Settings from '@/views/Settings'
import Search from '@/views/Search'
import Member from '@/views/Member'
import Team from '@/views/Team'
import TeamAddUsers from '@/views/TeamAddUsers'
import CreateWorkspace from '@/views/CreateWorkspace'

Vue.use(Router);

export function createRouter() {
  return new Router({
    routes: [
      {
        path: '/create-workspace',
        component: CreateWorkspace
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      // {
      //   path: '/invite-teammates',
      //   component: InviteTeammates
      // },
      {
        path: '/member/:id',
        name: 'member',
        component: Member
      },
      // {
      //   path: '/task/:id',
      //   name: 'task',
      //   component: Task
      // },
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
