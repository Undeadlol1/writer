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

class BreaksForm extends PureComponent {
    render() {
		const { props } = this
		const className = cls(props.className, 'BreaksForm')
		return 	<Row className='BreaksForm'>
					<Col xs={12}>
						<Form onSubmit={props.handleSubmit(props.insertProject)}>
							<p>{t('usually_story_consists_of_3_parts')}:</p>
							<ul>
								<li>{t('beginning')}</li>
								<li>{t('middle')}</li>
								<li>{t('end')}</li>
							</ul>
							<p>{t('transition_into_each_act_is_done_via_disasters')}</p>
							<p>{t("few_tips")}:</p>
							<ul>
								<li>{t('usually_it_is_good_idea_to_make_one_of_breaks_heroes_choice')}</li>
								<li>{t('all_breaks_must_go_from_lower_to_higher')}.</li>
								<li>{t('what_will_character_learn_in_the_end')}?</li>
								<li>{t('how_is_character_changed_by_the_end')}</li>
							</ul>
							<Field name="beginning" component={TextField} multiLine={true} rows={3} hintText={t("beginning")} autoFocus fullWidth />
							<Field name="middle" component={TextField} multiLine={true} rows={3} hintText={t("middle")} fullWidth />
							<Field name="end" component={TextField} multiLine={true} rows={3} hintText={t("end")} fullWidth />
							<center><RaisedButton type="submit" label={t('submit')} primary={true} disabled={!props.valid} /></center>
						</Form>
					</Col>
				</Row>
    }
}

BreaksForm.propTypes = {
	// prop: PropTypes.object,
}

export { BreaksForm }

export default
reduxForm({
	form: 'BreaksPage',
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
		if (!values.beginning) errors.beginning = t('please_fill_this_field')
		if (!values.middle) errors.middle = t('please_fill_this_field')
		if (!values.end) errors.end = t('please_fill_this_field')

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
        insertProject({beginning, middle, end}) {

			const first = {
				step: 4,
				isPlotPoint: true,
				description: beginning,
				name: 'bad_guys_close_in',
			}

			const second = {
				step: 6,
				isPlotPoint: true,
				description: middle,
				name: 'break_into_two',
			}

			const third = {
				step: 13,
				description: end,
				isPlotPoint: true,
				name: 'break_into_three',
			}


			dispatch(createScene(first))
			dispatch(createScene(second))
			dispatch(createScene(third))

			dispatch(
				updateProject(
					{progress: 2},
					() => ownProps.reset()
				)
			)
			// function insertSucces(response) {
			// 	ownProps.reset()
			// 	browserHistory.push(`/projects/${response.id}/steps`)
			// }
		},
    })
)(BreaksForm))