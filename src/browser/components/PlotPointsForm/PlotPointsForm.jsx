// dependencies
import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { TextField,  } from 'redux-form-material-ui'
import { Form, Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import browserHistory from 'react-router/lib/browserHistory'
// project files
import store from 'browser/redux/store'
import { translate as t } from 'browser/containers/Translator'
import { createScene, createCharacter, updateProject } from 'browser/redux/project/ProjectActions'

const points = [
	'opening_image',
	'set_up',
	'theme_stated',
	'catalyst',
	'debate',
	'break_into_two',
	'b_story',
	'fun_and_games',
	'midpoint',
	'bad_guys_close_in',
	'all_is_lost',
	'dark_night_of_the_soul',
	'break_into_three',
	'finale',
	'final_image',
]

class PlotPointsForm extends PureComponent {
    render() {
		const {props} = this
		const className = cls(props.className, "PlotPointsForm")
		return 	<Row className={className}>
					<Col xs={12}>
						<Form onSubmit={props.handleSubmit(props.insertProject)}>
							<p>{t('now_try_to_fill_out_steps')}</p>
							<p>{t('what_kind_of_points_would_be_interesting_to_see_in_your_story')}</p>
							<p>{t('dont_get_stuck_in_wirters_block_have_fun')}</p>
							{
								points.map(point => {
									return <Field key={point} name={point} component={TextField} multiLine={true} rows={3} floatingLabelText={t(point)} fullWidth />
								})
							}
							<center><RaisedButton type="submit" label={t('submit')} primary={true} disabled={!props.valid} /></center>
						</Form>
					</Col>
				</Row>
    }
}

PlotPointsForm.propTypes = {
	// prop: PropTypes.object,
}

export { PlotPointsForm }

export default
reduxForm({
	form: 'PlotPointsForm',
	// asyncValidate({enemy}) {
	// 	return
		// return fetch('/api/moods/mood/' + '?' + stringify({enemy}))
		// 		.then(parseJSON)
		// 		.then(result => {
		// 			if (result) throw { enemy: t('this_mood_already_exists') }
		// 			else return
		// 		})
    // },
	validate(values) {
		let errors = {}
		const user = store.getState().user.get('id')

		if (!user) errors.beginning = t('please_login')
		points.forEach(point => {
			if(!values[point]) errors[point] = t('please_fill_this_field')
		})

		return errors
	},
	// asyncBlurFields: [ 'enemy' ]
})
(connect(
	(state, ownProps) => ({
		// prop: mood.get('moods'),
		...ownProps
	}),
	(dispatch, ownProps) => ({
        insertProject(values) {
			console.log('values: ', values);
			// const { ProjectId } = ownProps.params

			// const first = {
			// 	ProjectId,
			// 	step: 4,
			// 	isPlotPoint: true,
			// 	description: beginning,
			// 	name: 'bad_guys_close_in',
			// }

			// const second = {
			// 	ProjectId,
			// 	step: 6,
			// 	isPlotPoint: true,
			// 	description: middle,
			// 	name: 'break_into_two',
			// }

			// const third = {
			// 	ProjectId,
			// 	step: 13,
			// 	isPlotPoint: true,
			// 	description: end,
			// 	name: 'break_into_three',
			// }

			// dispatch(createScene(first))
			// dispatch(createScene(second))
			// dispatch(createScene(third, insertSucces))

			// function insertSucces(response) {
			// 	ownProps.reset()
			// 	browserHistory.push(`/projects/${response.id}/steps`)
			// }
		},
    })
)(PlotPointsForm))