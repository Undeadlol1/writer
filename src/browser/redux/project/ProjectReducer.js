import isEmpty from 'lodash/isEmpty'
import { Map, List } from 'immutable'

const projectStructure = 	Map({
							id: '',
							slug: '',
							title: '',
							UserId: '',
							shortPitch: '',
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
				.merge(payload)
				.updateIn(['projects'], arr => {
					return isEmpty(payload)
						? arr
						: arr.push(Map(payload))
				})
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
				.merge({projects: List()})
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
		default:
			return state
	}
}