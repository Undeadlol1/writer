import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { translate as t } from 'browser/containers/Translator'
import {
	Step,
	Stepper,
	StepLabel,
} from 'material-ui/Stepper'

const steps = [
	'add_some_conflicts',
	'major_breaks',
	'story_steps',
]

class ProgressStepper extends Component {
	render() {
		const {props} = this
		const className = cls(props.className, "ProgressStepper")
		return 	<Stepper className={className} activeStep={props.progress}>
					{
						steps.map((step, index) => {
							return 	<Step key={index}>
										<StepLabel>{t(step)}</StepLabel>
									</Step>
						})
					}
				</Stepper>
	}
}

ProgressStepper.PropTypes = {
	progress: PropTypes.number.isRequired
}

export { ProgressStepper }
export default connect(
	// stateToProps
	(state, ownProps) => ({
		progress: state.project.get('progress'),
		...ownProps
	}),
	// dispatchToProps
    (dispatch, ownProps) => ({})
)(ProgressStepper)