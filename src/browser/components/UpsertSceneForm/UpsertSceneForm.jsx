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

	initialState = {
		name: this.props.name || '',
		nameError: '',
		description: this.props.description || '',
		descriptionError: '',
		pristine: this.props.description ? false : true,
	}

	state = this.initialState

	onNameChange = (event, name) => {
		this.setState({
			name,
			nameError: '',
			pristine: false,
		})
		const user = store.getState().user.get('id')
		if (!user) errors.name = t('please_login')
		if (!name) this.setState({nameError: t('please_fill_this_field')})
	}

	onDescriptionChange = (event, description) => {
		this.setState({
			description,
			pristine: false,
			descriptionError: '',
		})
		const user = store.getState().user.get('id')
		if (!user) errors.description = t('please_login')
		if (!description) this.setState({descriptionError: t('please_fill_this_field')})
	}

	onSubmit = event => {
		event.preventDefault()
		this.setState(this.initialState)
		this.props.upsertScene(this.state)
	}

    render() {
		const {props, state} = this
		const className = cls(props.className, 'UpsertSceneForm')
		const buttonDisabled = Boolean(state.pristine || state.nameError || state.descriptionError)

		return 	<Row className={className}>
					<Col xs={12}>
						{props.children}
						<form onSubmit={this.onSubmit}>
							{!props.isPlotPoint &&
							<TextField
								fullWidth
								name="name"
								multiLine={true}
								value={props.name}
								// component={TextField}
								errorText={state.nameError}
								onChange={this.onNameChange}
								autoFocus={!props.isPlotPoint}
								disabled={props.isPlotPoint || props.submitting}
								hintText={props.isPlotPoint ? t(props.name) : t("name")}
							/>}
							<TextField
								rows={3}
								fullWidth
								multiLine={true}
								name="description"
								// component={TextField}
								value={state.description}
								disabled={props.submitting}
								hintText={t("description")}
								autoFocus={props.isPlotPoint}
								errorText={state.descriptionError}
								onChange={this.onDescriptionChange}
							/>
							<center><RaisedButton type="submit" disabled={buttonDisabled} label={t('submit')} primary={true} /></center>
						</form>
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

export default connect(
	(state, ownProps) => ({
		// initial form values
		initialValues: {
			name: ownProps.name,
			description: ownProps.description,
		},
		...ownProps,
	}),
	(dispatch, ownProps) => ({
		upsertScene(values) {
			dispatch(
				createScene({
					step: ownProps.step,
					isPlotPoint: ownProps.isPlotPoint,
					name: ownProps.name || values.name,
					description: ownProps.description || values.description,
				})
			)
		},
	})
)(UpsertSceneForm)