import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from 'browser/redux/store'
import Dialog from 'material-ui/Dialog'
import { stringify } from 'query-string'
import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { TextField } from 'redux-form-material-ui'
import { Form, Field, reduxForm } from 'redux-form'
import { translate } from 'browser/containers/Translator'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import ContentAdd from 'material-ui/svg-icons/content/add'
import browserHistory from 'react-router/lib/browserHistory'
import { actions } from 'browser/redux/actions/GlobalActions'
import { parseJSON } from'browser/redux/actions/actionHelpers'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { insertMood, toggleDialog } from 'browser/redux/actions/MoodActions'
import { insertProject } from 'browser/redux/project/ProjectActions'

export class MoodsInsert extends Component {
	render() {
		const { props } = this
		const { insertProject, handleSubmit, dialogIsOpen, toggleDialog, asyncValidating, className } = props
		const classNames = cls(className, "MoodsInsert")
		const isDisabled = props.asyncValidating == 'name' || props.submitting
		const actions = [
					<FlatButton
						primary={false}
						onTouchTap={toggleDialog}
						label={translate("cancel")}
						disabled={isDisabled}
					/>,
				]
	    return  <div className={classNames}>
					{/* BUTTON */}
                    <FloatingActionButton
                        secondary={true}
                        onClick={toggleDialog}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
					{/* DIALOG */}
					<Dialog
                        modal={false}
                        actions={actions}
                        open={dialogIsOpen}
                        title={translate("add_your_own_mood")}
                        autoScrollBodyContent={true}
                        onRequestClose={toggleDialog}
                    >
						<Form onSubmit={handleSubmit(insertProject)}>
							<Row>
								<Col xs={12}>
									<Field name="title" component={TextField} hidden={asyncValidating} hintText={translate("add_something")} autoFocus fullWidth />
									<Field name="shortPitch" component={TextField} hidden={asyncValidating} hintText={translate("add_short_pitch")} fullWidth />
									<button type="submit" hidden={true}>Submit</button>
								</Col>
							</Row>
						</Form>
					</Dialog>
				</div>

	}
}
// TODO reorganize this for better testing
export default reduxForm({
	form: 'MoodsInsert',
	// asyncValidate({title}) {
	// 	return
		// return fetch('/api/moods/mood/' + '?' + stringify({title}))
		// 		.then(parseJSON)
		// 		.then(result => {
		// 			if (result) throw { title: translate('this_mood_already_exists') }
		// 			else return
		// 		})
    // },
	validate(values) {
		let errors = {}
		const user = store.getState().user.get('id')

		if (!user) errors.title = translate('please_login')
		if (!values.title) errors.title = translate('title_cant_be_empty')
		if (!values.shortPitch) errors.shortPitch = translate('short_pitch_cant_be_empty')

		return errors
	},
	// asyncBlurFields: [ 'title' ]
})
(connect(
	(state, ownProps) => ({
		dialogIsOpen: state.mood.get('dialogIsOpen'),
		...ownProps
	}),
    (dispatch, ownProps) => ({
        insertProject(values) {
			function insertSucces(response) {
				ownProps.reset()
				browserHistory.push('/project/' + response.slug);
			}
            dispatch(toggleDialog())
            dispatch(insertProject(values, insertSucces))
		},
		toggleDialog() {
			dispatch(actions.toggleControls())
            dispatch(toggleDialog())
        },
    })
)(MoodsInsert))