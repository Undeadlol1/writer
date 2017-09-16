import selectn from 'selectn'
import { stringify } from 'query-string'
import { createAction, createActions } from 'redux-actions'
import { checkStatus, parseJSON, headersAndBody } from'../actions/actionHelpers'

const projectsUrl = process.env.API_URL + 'projects/'

export const actions = createActions({
  UNLOAD_PROJECT: () => null,
  REMOVE_PROJECT: id => id,
  TOGGLE_DIALOG: () => null,
  RECIEVE_PROJECT: node => node,
  RECIEVE_PROJECTS: nodes => nodes,
  UPDATE_PROJECT: object => object,
  TOGGLE_PROJECT_FETCHING: boolean => boolean,
  FETCHING_ERROR: reason => reason,
  RECIEVE_SEARCHED_VIDEOS: videos => videos,
})

/**
 * create a project
 * @param {Object} payload content url
 */
export const insertProject = (payload, callback) => (dispatch, getState) => {
	return fetch(projectsUrl, headersAndBody(payload))
		.then(checkStatus)
		.then(parseJSON)
		.then(function(response) {
			dispatch(actions.toggleDialog())
			dispatch(actions.recieveProject(response))
			if (callback) return callback(response)
		})
}

/**
 * fetch project using project slug
 * @param {String} slug project slug (optional)
 */
export const fetchProject = slug => (dispatch, getState) => {
	const state = getState()
	const UserId = state.user.get('id')
	const projectSlug = slug || state.project.get('slug')

	// dispatch(actions.fetchingProject())

	return fetch(
		projectsUrl + 'project/' + UserId + '/' + projectSlug,
		{ credentials: 'same-origin' }
	)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => {
			return dispatch(actions.recieveProject((data)))
		})
		.catch(err => console.error('fetchproject failed!', err))
}

/**
 * fetch projects using project slug
 * @param {String} slug project slug (optional)
 */
export const fetchProjects = slug => (dispatch, getState) => {
	const state = getState()
	const UserId = state.user.get('id')
	const nodeId = state.node.id
	const projectSlug = slug || state.project.get('slug')

	// dispatch(actions.fetchingProject())

	return fetch(
		projectsUrl + UserId + '/' + projectSlug,
		{ credentials: 'same-origin' }
	)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => {
			return dispatch(actions.recieveProjects((data)))
		})
		.catch(err => console.error('fetchproject failed!', err))
}