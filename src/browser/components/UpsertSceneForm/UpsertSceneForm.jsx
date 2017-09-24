// dependencies
import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { stringify } from 'query-string'
import React, { PureComponent } from 'react'
import { TextField,  } from 'redux-form-material-ui'
import { Form, Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import browserHistory from 'react-router/lib/browserHistory'
// project files
import store from 'browser/redux/store'
import { translate as t } from 'browser/containers/Translator'
import { createScene, updateScene } from 'browser/redux/project/ProjectActions'
import { checkStatus, parseJSON, headersAndBody } from'browser/redux/actions/actionHelpers'

class UpsertSceneForm extends PureComponent {
    render() {
		const {props} = this
		const className = cls(props.className, 'UpsertSceneForm')
		return 	<Row className={className}>
					<Col xs={12}>
						<Form onSubmit={props.handleSubmit(props.upsertScene)}>
							<Field
								fullWidth
								name="name"
								multiLine={true}
								component={TextField}
								autoFocus={!props.isPlotPoint}
								disabled={props.isPlotPoint || props.submitting}
								hintText={props.isPlotPoint ? t(props.name) : t("name")}
							/>
							<Field
								rows={3}
								fullWidth
								multiLine={true}
								name="description"
								component={TextField}
								disabled={props.submitting}
								hintText={t("description")}
								autoFocus={props.isPlotPoint}
							/>
							<center><RaisedButton type="submit" disabled={!props.valid || props.submitting} label={t('submit')} primary={true} /></center>
						</Form>
					</Col>
				</Row>
    }
}

UpsertSceneForm.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	step: PropTypes.number,
	isPlotPoint: PropTypes.bool,
}

export { UpsertSceneForm }

export default
reduxForm({
	form: 'UpsertSceneForm',
	validate(values, ownProps) {
		let errors = {}
		const user = store.getState().user.get('id')

		if (!user) errors.name = t('please_login')
		if (ownProps.isPlotPoint) {
			if (!values.description) errors.description = t('please_fill_this_field')
		}
		else {
			if (!values.name) errors.name = t('please_fill_this_field')
		}

		return errors
	},
})
(connect(
	(state, ownProps) => ({
		// initial form values
		initialValues: {
			name: ownProps.name,
			description: ownProps.description,
		},
		...ownProps
	}),
	(dispatch, ownProps) => ({
		upsertScene(values) {
			dispatch(
				createScene(
					{
						isPlotPoint: true,
						step: ownProps.step,
						description: values.description,
						name: ownProps.name || values.name,
					},
					() => ownProps.reset()
				)
			)
		},
	})
)(UpsertSceneForm))