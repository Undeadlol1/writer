// dependencies
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
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'
import { createScene, createCharacter, updateProject } from 'browser/redux/project/ProjectActions'

class StepsPage extends PureComponent {
    render() {
		const {props} = this
		const className = cls(props.className, "PlotPointsForm")
		return 	<PageWrapper
					className='StepsPage'
					loading={props.loading}
				>
					<Grid fluid>
						<Row>
							<Col xs={12}>
								<Form onSubmit={props.handleSubmit(props.insertProject)}>
									<p>Now try to fill out the 15 steps of the story according to "Save The Cat" technique.</p>
									<p>What kind of points would be interesting to see in your story? Don't stuck in writers block, have fun, lay it out. You can always come back and change things later.</p>
									<Field name="beginning" component={TextField} multiLine={true} rows={3} hintText={t("beginning")} autoFocus fullWidth />
									<Field name="middle" component={TextField} multiLine={true} rows={3} hintText={t("middle")} fullWidth />
									<Field name="end" component={TextField} multiLine={true} rows={3} hintText={t("end")} fullWidth />
									<center><RaisedButton type="submit" label={t('submit')} primary={true} /></center>
								</Form>
							</Col>
						</Row>
					</Grid>
				</PageWrapper>
    }
}

StepsPage.propTypes = {
	// prop: PropTypes.object,
}

export { StepsPage }

export default
reduxForm({
	form: 'StepsPage',
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
			const { ProjectId } = ownProps.params

			const first = {
				ProjectId,
				step: 4,
				isPlotPoint: true,
				description: beginning,
				name: 'bad_guys_close_in',
			}

			const second = {
				ProjectId,
				step: 6,
				isPlotPoint: true,
				description: middle,
				name: 'break_into_two',
			}

			const third = {
				ProjectId,
				step: 13,
				isPlotPoint: true,
				description: end,
				name: 'break_into_three',
			}

			dispatch(createScene(first))
			dispatch(createScene(second))
			dispatch(createScene(third, insertSucces))

			function insertSucces(response) {
				ownProps.reset()
				browserHistory.push(`/projects/${response.id}/steps`)
			}
		},
    })
)(StepsPage))