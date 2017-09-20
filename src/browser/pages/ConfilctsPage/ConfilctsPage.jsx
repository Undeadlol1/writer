// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { TextField } from 'redux-form-material-ui'
import { Form, Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import browserHistory from 'react-router/lib/browserHistory'
// project files
import store from 'browser/redux/store'
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'
import { createCharacter, updateProject } from 'browser/redux/project/ProjectActions'

class ConfilctsPage extends PureComponent {
    render() {
		const { props } = this
		return 	<PageWrapper
					className='ConfilctsPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={12}>
								<Form onSubmit={props.handleSubmit(props.insertProject)}>
									<p>{t('without_a_conflict_there_is_no_story')}.</p>
									<Field name="enemy" component={TextField} hidden={props.asyncValidating} hintText={t("enemy")} autoFocus fullWidth />
									<p>{t('best_stories_are_about_conflicts')}.</p>
									<p>{t('what_is_heroes_enterlan_struggle')}?</p>
									<Field name="dilemma" component={TextField} hidden={props.asyncValidating} hintText={t("enternal_conflict")} fullWidth />
									<center><RaisedButton type="submit" label={t('submit')} primary={true} /></center>
								</Form>
							</Col>
						</Row>
					</Grid>
				</PageWrapper>
    }
}

ConfilctsPage.propTypes = {
	// prop: PropTypes.object,
}

export { ConfilctsPage }

export default
reduxForm({
	form: 'ConflictsPage',
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

		if (!user) errors.enemy = t('please_login')
		if (!values.enemy) errors.enemy = t('please_fill_this_field')
		if (!values.dilemma) errors.dilemma = t('please_fill_this_field')

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
        insertProject({enemy, dilemma}) {
			const { ProjectId } = ownProps.params

            dispatch(createCharacter({
				ProjectId,
				name: enemy,
				role: 'enemy',
			}))
			dispatch(updateProject({dilemma, ProjectId, progress: 1}, insertSucces))

			function insertSucces(response) {
				ownProps.reset()
				browserHistory.push(`/project/${response.id}/breaks`)
			}
		},
    })
)(ConfilctsPage))