// dependencies
import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
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
	'set_up', // beginning
	'theme_stated',
	'catalyst',
	'debate',
	'break_into_two', // middle
	'b_story',
	'fun_and_games',
	'midpoint',
	'bad_guys_close_in',
	'all_is_lost',
	'dark_night_of_the_soul',
	'break_into_three', // end
	'finale',
	'final_image',
]

const explanations = [
	'A visual that represents the struggle & tone of the story. A snapshot of the main character’s problem, before the adventure begins.',
	'Expand on the “before” snapshot. Present the main character’s world as it is, and what is missing in their life.',
	'(happens during the Set-up) What your story is about; the message, the truth. Usually, it is spoken to the main character or in their presence, but they don’t understand the truth…not until they have some personal experience and context to support it.',
	'The moment where life as it is changes. It is the telegram, the act of catching your loved-one cheating, allowing a monster onboard the ship, meeting the true love of your life, etc. The “before” world is no more, change is underway.',
	'But change is scary and for a moment, or a brief number of moments, the main character doubts the journey they must take. Can I face this challenge? Do I have what it takes? Should I go at all? It is the last chance for the hero to chicken out.',
	'The main character makes a choice and the journey begins. We leave the “Thesis” world and enter the upside-down, opposite world of Act Two.',
	'This is when there’s a discussion about the Theme – the nugget of truth. Usually, this discussion is between the main character and the love interest. So, the B Story is usually called the “love story”.',
	'This is when Craig Thompson’s relationship with Raina blooms, when Indiana Jones tries to beat the Nazis to the Lost Ark, when the detective finds the most clues and dodges the most bullets. This is when the main character explores the new world and the audience is entertained by the premise they have been promised.',
	'Dependent upon the story, this moment is when everything is “great” or everything is “awful”. The main character either gets everything they think they want (“great”) or doesn’t get what they think they want at all (“awful”). But not everything we think we want is what we actually need in the end.',
	'Doubt, jealousy, fear, foes both physical and emotional regroup to defeat the main character’s goal, and the main character’s “great”/“awful” situation disintegrates.',
	'The opposite moment from the Midpoint: “awful”/“great”. The moment that the main character realizes they’ve lost everything they gained, or everything they now have has no meaning. The initial goal now looks even more impossible than before. And here, something or someone dies. It can be physical or emotional, but the death of something old makes way for something new to be born.',
	'The main character hits bottom, and wallows in hopelessness. The Why hast thou forsaken me, Lord? moment. Mourning the loss of what has “died” – the dream, the goal, the mentor character, the love of your life, etc. But, you must fall completely before you can pick yourself back up and try again.',
	'Thanks to a fresh idea, new inspiration, or last-minute Thematic advice from the B Story (usually the love interest), the main character chooses to try again.',
	'This time around, the main character incorporates the Theme – the nugget of truth that now makes sense to them – into their fight for the goal because they have experience from the A Story and context from the B Story. Act Three is about Synthesis!',
	'Opposite of Opening Image, proving, visually, that a change has occurred within the character.',
]

class PlotPointsForm extends PureComponent {
    render() {
		const 	{props} = this,
				step = props.Scenes.size - 1,
				scenes = props.Scenes.toJS(),
				scene = points[step],
				className = cls(props.className, "PlotPointsForm"),
				existingScene = scenes.find(s => s.name == scene)

				console.log('scenes: ', scenes);
		if (step == points.length) props.nextStep()
		return 	<Row className={className}>
					<Col xs={12}>
						<p>{t('now_try_to_fill_out_steps')}</p>
						<p>{t('what_kind_of_points_would_be_interesting_to_see_in_your_story')}</p>
						<p>{t('dont_get_stuck_in_wirters_block_have_fun')}</p>
						<Divider />
						<UpsertSceneForm
							key={step}
							step={step}
							name={scene}
							isPlotPoint={true}
							scene={existingScene}
							isUpdate={Boolean(existingScene)}
							description={existingScene && existingScene.description}
						>
							<p><b>{t(scene)}</b> - {explanations[step]}</p>
						</UpsertSceneForm>
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
			dispatch(updateProject({progress: 3}))
		},
    })
)(PlotPointsForm)