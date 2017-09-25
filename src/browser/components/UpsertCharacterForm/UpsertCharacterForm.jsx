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
import { createCharacter, updateCharacter } from 'browser/redux/project/ProjectActions'
import { checkStatus, parseJSON, headersAndBody } from'browser/redux/actions/actionHelpers'

class UpsertCharacterForm extends PureComponent {
    render() {
		const {props} = this
		const className = cls(props.className, 'UpsertCharacterForm')
		console.log('props.name: ', props.name);
		console.log('props.character: ', props.character);
		console.log('props.initialValues: ', props.initialValues);
		console.log('props.valid: ', props.valid);
		return 	<Row className={className}>
					<Col xs={12}>
						<Form onSubmit={props.handleSubmit(props.upsertCharacter)}>
							<Field
								autoFocus
								fullWidth
								name="name"
								hintText={t("name")}
								component={TextField}
								disabled={props.submitting}
							/>
							<Field
								fullWidth
								name="image"
								multiLine={true}
								component={TextField}
								disabled={props.submitting}
								hintText={t("image_url")}
							/>
							<Field
								rows={5}
								fullWidth
								multiLine={true}
								name="backstory"
								component={TextField}
								disabled={props.submitting}
								hintText={t("backstory")}
							/>
							<Field
								rows={3}
								fullWidth
								name="traits"
								multiLine={true}
								component={TextField}
								disabled={props.submitting}
								hintText={t("character_traits")}
							/>
							<Field
								rows={3}
								fullWidth
								multiLine={true}
								name="conflicts"
								component={TextField}
								disabled={props.submitting}
								hintText={t("conflicts_and_fears")}
							/>
							<center><RaisedButton type="submit" disabled={!props.valid || props.submitting} label={t('submit')} primary={true} /></center>
						</Form>
					</Col>
				</Row>
    }
}

UpsertCharacterForm.propTypes = {
	role: PropTypes.string,
	// name: PropTypes.string,
	// description: PropTypes.string,
	// step: PropTypes.bool,
	// isPlotPoint: PropTypes.bool,
	character: PropTypes.object,
	isUpdate: PropTypes.bool,
}

export { UpsertCharacterForm }

export default
(connect(
	(state, ownProps) => {
		return ({
			initialValues: {
				name: ownProps.name,
				// image: 'penises',
				// backstory: 'penises',
				// traits: 'penises',
				// conflicts: 'penises',
			},
			...ownProps,
			// initial form values
		// initialValues: {name: 'penises', image: '123'},
	})},
	(dispatch, ownProps) => ({
		upsertCharacter(values) {
			values.role = ownProps.role
			if (ownProps.isUdpate) dispatch(updateCharacter(values))
			else dispatch(createCharacter(values)) // , () => ownProps.reset()
		},
	})
)
(reduxForm({
	form: 'UpsertCharacterForm',
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
})(UpsertCharacterForm)))