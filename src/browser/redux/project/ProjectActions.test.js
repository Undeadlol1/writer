import nock from 'nock'
import isArray from 'lodash/isArray'
import thunk from 'redux-thunk'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import configureMockStore from 'redux-mock-store'
import { createAction, createActions } from 'redux-actions'
import { initialState } from 'browser/redux/project/ProjectReducer'
import { updateProject, toggleLoginDialog, logoutCurrentProject, fetchCurrentProject, fetchProject, actions } from 'browser/redux/project/ProjectActions'
chai.should();
chai.use(chaiImmutable);

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
// TODO add API_PREFIX instead of API_URL?
const { URL, API_URL } = process.env
const authApi = '/api/auth/'
const projectsApi = '/api/projects/'
const project = {projectname: 'misha', id: 1}
/**
 * test async action by intercepting http call
 * and cheking if expected redux actions have been called
 * @param {string} url request url
 * @param {function} action action to call
 * @param {any} param action param
 * @param {array} result expected actions
 * @param {string} [method='get'] request method
 * @returns
 */
function mockRequest(url, action, param, result, method = 'get') {
    // TODO rework this url (last character '/' was causing unmathing of url)
    // create request interceptor
    nock('http://127.0.0.1:3000')[method](url).reply(200, project)
    const store = mockStore()
    return store
      // call redux action
      .dispatch(action(param))
      // compare called actions with expected result
      .then(() => expect(store.getActions()).to.deep.equal(result))
}

describe('ProjectActions', () => {

  afterEach(() => nock.cleanAll())


  it('fetchCurrentProject calls fetchingProject and recieveCurrentProject', async () => {
    const expectedActions = [
                              actions.fetchingProject(),
                              actions.recieveCurrentProject(project)
                            ]
    await mockRequest(authApi + 'current_project', fetchCurrentProject, undefined, expectedActions)
  })

  it('logoutCurrentProject calls removeCurrentProject', async () => {
    const expectedActions = [actions.removeCurrentProject()]
    await mockRequest(authApi + 'logout', logoutCurrentProject, undefined, expectedActions)
  })

  it('fetchProject calls fetchingProject and recieveFetchedProject', async () => {
    const { projectname } = project
    const expectedActions = [
                              actions.fetchingProject(),
                              actions.recieveFetchedProject(project)
                            ]
    await mockRequest(projectsApi + 'project/' + projectname, fetchProject, projectname, expectedActions)
  })


  it('updateProject calls recieveCurrentProject', async () => {
    const { projectname } = project
    const expectedActions = [actions.recieveCurrentProject(project)]
    await mockRequest(
      projectsApi + 'project/' + projectname,
      updateProject,
      projectname,
      expectedActions,
      'put'
    )
  })

  describe('toggleLoginDialog', () => {
    it('toggles with argument', () => {
      const store = mockStore({project: initialState})
      const expectedActions = [actions.toggleLoginDialog(true)]
      store.dispatch(toggleLoginDialog(true))
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
    it('toggles without argument', () => {
      const store = mockStore({project: initialState})
      const expectedActions = [actions.toggleLoginDialog(true)]
      store.dispatch(toggleLoginDialog())
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})