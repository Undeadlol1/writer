import isEmpty from 'lodash/isEmpty'
import { Map, List } from 'immutable'

const projectStructure = 	Map({
							id: '',
							slug: '',
							title: '',
							UserId: '',
							shortPitch: '',
							Scenes: List(),
							Characters: List(),
						})

export const initialState = Map({
							error: '',
							loading: false,
							projects: List(),
							finishedLoading: true,
							dialogIsOpen: false,
							contentNotFound: false,
							searchIsActive: false, // TODO do i need this?
							searchedVideos: List(),
							...projectStructure.toJS()
						})

/**
 * get index of object in list
 *
 * @param {object} state
 * @param {string} listName propery name of a list
 * @param {object} listItem actual
 * @returns index number
 */
function getIndex(state, listName, listItem) {
	return 	state
			.get(listName)
			.findIndex(item => item.id === listItem.id)
}

export default (state = initialState, {type, payload}) => {
	switch(type) {
		// case 'FETCHING_PROJECT':
		// 	return state.merge({
		// 		loading: true,
		// 		finishedLoading: false,
		// 		contentNotFound: false,
		// 	})
		case 'RECIEVE_PROJECT':
			return state
				.mergeDeep(payload)
				.merge({
					loading: false,
					// finishedLoading: true,
					contentNotFound: isEmpty(payload),
				})
		case 'RECIEVE_PROJECTS':
			return state
				.mergeDeep({
					...payload,
					loading: false,
					// finishedLoading: true,
					contentNotFound: isEmpty(payload),
				})
		case 'UPDATE_PROJECT':
			return state.mergeDeep(payload)
		case 'TOGGLE_DIALOG':
			return state.set('dialogIsOpen', !state.get('dialogIsOpen'))
		case 'UNLOAD_PROJECT':
			return state
				.merge(projectStructure)
				.merge({Scenes: List()})
				.merge({Characters: List()})
				.mergeDeep({
					loading: false,
					// finishedLoading: false,
					contentNotFound: false,
				})
		// remove project from projects list
		case 'REMOVE_PROJECT':
			return state
				.merge({
					projects: state
							.get('projects')
							.filter(project => project.get('id') !== payload)
				})
		case 'RECIEVE_SEARCHED_VIDEOS':
			return state.merge({
				searchIsActive: false,
				searchedVideos: payload
			})
		case 'ADD_SCENE':
			return state.updateIn(['Scenes'], arr => arr.push(payload))
		case 'ADD_CHARACTER':
			return state.updateIn(['Characters'], arr => arr.push(payload))
		case 'UPDATE_SCENE':
			return 	state.updateIn(
						['Scenes', getIndex(state, 'Scenes', payload)],
						() => payload
					)
		case 'UPDATE_CHARACTER':
			return 	state.updateIn(
						['Characters', getIndex(state, 'Scenes', payload)],
						() => payload
					)
		default:
			return state
	}
}