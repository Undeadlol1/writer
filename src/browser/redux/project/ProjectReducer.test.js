import chai, { expect } from 'chai'
import { Map, List } from 'immutable'
import chaiImmutable from 'chai-immutable'
import { actions } from 'browser/redux/project/ProjectActions'
import reducer, { initialState } from 'browser/redux/project/ProjectReducer'
chai.should()
chai.use(chaiImmutable)

describe('user reducer', async () => {

  const project = {
    id: 1,
    UserId: 2,
    ProjectId: 3,
    type: 'video',
    contentId: 123,
    url: 'google.com',
    rating: '1.32332300',
    provider: 'youtube',
    Decision: {},
  }

  const projects = [
    {id: 1},
    {id: 2},
    {id: 3},
  ]

  it('should have initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState)
  })

  it('should handle RECIEVE_PROJECT action on initial state', async () => {
    const action = actions.recieveProject(project)
    const newState = reducer(undefined, action)
    expect(newState).to.have.property('id', project.id)
    expect(newState).to.have.property('contentId', project.contentId)
    expect(newState).to.have.property('loading', false)
  })

  it('should handle RECIEVE_PROJECTS action on initial state', () => {
    const action = actions.recieveProjects(projects)
    const newState = reducer(undefined, action)
    expect(newState.get('projects').toJS()).to.deep.equal(projects)
  })

  it('should handle UPDATE_PROJECT action', async () => {
    expect(
      reducer(undefined, actions.updateProject(project))
    )
    .to.have.property('id', project.id)
  })

  it('should handle TOGGLE_DIALOG action on initial state', async () => {
    expect(
      reducer(undefined, actions.toggleDialog(true))
    )
    .to.have.property('dialogIsOpen', true)
  })

  it('should handle UNLOAD_PROJECT action', () => {
    const action = actions.unloadProject()
    const newState = reducer(undefined, action)
    expect(newState).to.equal(initialState)
  })

  it('should handle REMOVE_PROJECT action', () => {
    const action = actions.recieveProjects(projects)
    // state containing active project and projects list
    const initialState = reducer(undefined, action).merge(project)
    const newState = reducer(initialState, actions.removeProject(1))
    expect(newState.get('projects').toJS())
      .to.have.length(2)
      .and.not.contain({id: 1})
  })

  it('should handle RECIEVE_SEARCHED_VIDEOS action on initial state', () => {
    const action = actions.recieveSearchedVideos([])
    const newState = reducer(undefined, action)
    const expectedState = initialState.merge({
        searchedVideos: [],
        searchIsActive: false,
    })
    expect(newState).to.deep.eq(expectedState)
  })

})