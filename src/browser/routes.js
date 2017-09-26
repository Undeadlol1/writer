import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import MoodPage from './pages/MoodPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import store from 'browser/redux/store'
import { fetchUser } from 'browser/redux/actions/UserActions'
import { fetchMoods, fetchMood } from 'browser/redux/actions/MoodActions'
import { fetchProjects, fetchProject } from 'browser/redux/project/ProjectActions'
import { fetchNodes, actions as nodeActions } from 'browser/redux/actions/NodeActions'

/**
 * fetching is done in router config in order to properly prefetch data in SSR
 */

const routesConfig = {
  path: '/',
  component: Layout,
  indexRoute: {
    component: IndexPage,
    // fetch data
    onEnter({params}, replace, done) {
      // check if fetching is needed
      // if (newMoods.size) return done()
      store
      .dispatch(fetchProjects(store.getState().user.get('id')))
      .then(() => done())
    }
  },
  childRoutes: [
    {
      path: 'mood/(:moodSlug)',
      component: MoodPage,
      // fetch data
      onEnter({params}, replace, done) {
        Promise
        .all([
          store.dispatch(fetchMood(params.moodSlug)),
          store.dispatch(fetchNodes(params.moodSlug)),
        ])
        .then(() => done())
      }
    },
    {
      path: 'users/(:username)',
      component: UserPage,
      onEnter({params}, replace, done) {
        const fetchedUserId = store.getState().user.getIn(['fetchedUser', 'id'])
        // check if fetching is needed
        // TODO change username to userId
        if (fetchedUserId == params.username) return done()
        else {
          store
          .dispatch(fetchUser(params.username))
          .then(() => done())
        }
      }
    },
    { path: 'login', component: LoginPage },
    { path: 'search', component: SearchPage },
    { path: 'about', component: AboutPage },
    { path: 'projects/:ProjectId/conflicts', component: require('browser/pages/ConfilctsPage').default },
    { path: 'projects/:ProjectId/breaks', component: require('browser/pages/BreaksPage').default },
    { path: 'projects/:ProjectId/steps', component: require('browser/pages/StepsPage').default },
    { path: 'projects/:ProjectSlug',
      component: require('browser/pages/ProjectPage').default,
      // fetch project data
      onEnter({params}, replace, done) {
        const fetchedProjectSlug = store.getState().project.get('id')
        const UserId = store.getState().user.get('id')
        // check if fetching is needed
        if (fetchedProjectSlug == params.ProjectSlug) return done()
        else {
          store
          .dispatch(fetchProject(UserId, params.ProjectSlug))
          .then(() => done())
        }
      }
    },
// ⚠️ Hook for cli! Do not remove 💀
    // 404 page must go after everything else
    { path: '*', component: NotFound },
  ]
}

module.exports = routesConfig;