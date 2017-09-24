import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { translate as t } from 'browser/containers/Translator'
import {
	Step,
	Stepper,
	StepLabel,
	StepContent,
} from 'material-ui/Stepper'
import BreaksForm from 'browser/components/BreaksForm'
import ConflictsForm from 'browser/components/ConflictsForm'
import PlotPointsForm from 'browser/components/PlotPointsForm'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import UpsertCharacterForm from 'browser/components/UpsertCharacterForm'
import CharactersStep from 'browser/components/CharactersStep'

const steps = [
	'add_some_conflicts',
	'major_breaks',
	'story_steps',
	// 'work_on_characters',
]

const forms = [
	<ConflictsForm />,
	<BreaksForm />,
	<PlotPointsForm />,
	// <CharactersStep />,
]

class ProgressStepper extends Component {
	render() {
		const {props} = this
		const className = cls(props.className, "ProgressStepper")
		return 	<div>
					<Stepper className={className} activeStep={props.progress}>
						{
							steps.map((step, index) => {
								return 	<Step key={index}>
											<StepLabel>{t(step)}</StepLabel>
										</Step>
							})
						}
					</Stepper>
					<ExpandTransition loading={false} open={true}>
						{forms[props.progress]}
					</ExpandTransition>
				</div>
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