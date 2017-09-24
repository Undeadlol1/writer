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
import UpsertSceneForm from 'browser/components/UpsertSceneForm'
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
		const 	{props} = this,
				step = props.Scenes.size - 1,
				scene = points[step],
				className = cls(props.className, "PlotPointsForm")

		if (step == points.length) props.nextStep()

		return 	<Row className={className}>
					<Col xs={12}>
						<p>{t('now_try_to_fill_out_steps')}</p>
						<p>{t('what_kind_of_points_would_be_interesting_to_see_in_your_story')}</p>
						<p>{t('dont_get_stuck_in_wirters_block_have_fun')}</p>
						<UpsertSceneForm name={scene} step isPlotPoint={true} />
					</Col>
				</Row>
    }
}

PlotPointsForm.propTypes = {
	Scenes: PropTypes.object,
}

export { PlotPointsForm }

export default
connect(
	({project}, ownProps) => ({
		Scenes: project.get('Scenes'),
		...ownProps
	}),
	(dispatch, ownProps) => ({
        nextStep() {
			dispatch(
				updateProject({progress: 3})
			)
		},
    })
)(PlotPointsForm)