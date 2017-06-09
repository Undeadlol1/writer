import { handleActions } from 'redux-actions'
import { toastr } from 'react-redux-toastr'
import { recieveMood, recieveMoods, fetchingInProgress, fetchingError } from '../actions/MoodActions'
import { Map, List } from 'immutable'

const emptyMoodStructure = {
	id: '',
	name: '',
	slug: '',
	Nodes: List() // TODO do i need this?
}

const initialState = 	Map({
							...emptyMoodStructure,
							moods: List(),
							searchedMoods: Map({
								moods: List(),
								totalPages: 0,
								currentPage: 0,
							}), // TODO rework this
							Nodes: List(),
							totalPages: 0,
							currentPage: 0,
							loading: false,
						})

export default (state = initialState, {type, payload}) => {
	switch(type) {
		case 'RECIEVE_MOODS':
		// ... payload? or something else?
			return state.merge({
						...payload,
						loading: false,
					})
		case 'RECIEVE_MOOD':
			return state.merge({
						...payload,
						loading: false
					})
		case 'INSERT_MOOD_SUCCES':
			return state.merge({
						moods: [...state.get('moods'), payload.mood], // TODO rework this with immutable array method
						loading: false
					})
		case 'FETCHING_IN_PROGRESS':
			return state.set('loading', true)
		case 'RECIEVE_SEARCH_RESULT':
			return state.merge({
						loading: false,
						searchedMoods: payload,
					})
		case 'UNLOAD_MOOD':
			return state.merge(emptyMoodStructure)
		default:
			return state
	}
}