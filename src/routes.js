import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
//import LeagueList from './components/League/LeagueList.vue';
//import CreateLeague from './components/League/CreateLeague.vue';
//import EditLeague from './components/League/EditLeague.vue';
import TeamList from './components/Team/TeamList.vue';
import CreateTeam from './components/Team/CreateTeam.vue';
import EditTeam from './components/Team/EditTeam.vue';
import Admin from './components/Admin/Admin.vue';
import LeagueList from './components/Admin/League/LeagueList.vue';
import CreateLeague from './components/Admin/League/CreateLeague.vue';
import EditLeague from './components/Admin/League/EditLeague.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/logout', name: 'Logout', component: Logout },
    { 
        path: '/admin', 
        component: Admin,
        children: [
            {
                path: 'index',
                component: LeagueList
            },
            {
                path: 'league/create',
                component: CreateLeague
            },
            {
                path: 'league/edit/:id',
                component: EditLeague
            }
        ],
        meta: { requiresAuth: true}
    }
];

export default routes;
