import cls from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import { translate as t } from 'browser/containers/Translator'
import UpsertCharacterForm from 'browser/components/UpsertCharacterForm'
import find from 'lodash/find'
import selectn from 'selectn'

class CharactersStep extends Component {
	render() {
		const {props} = this
		const className = cls(props.className, "CharactersStep")
		const characters = props.Characters.toJS()
		const hero = find(characters, ['role', 'hero'])
		const enemy = find(characters, ['role', 'enemy'])
		console.log('enemy: ', enemy);
		console.log('characters: ', characters);
		console.log('hero: ', hero);
		console.log('typeof hero: ', typeof hero);

		return 	<div className={className}>
					this is where fun stuff starts
					<h2>Then i need to work on main character</h2>
					<h2>Then on evil guy</h2>
					<h2>And then maybe add some characters</h2>
					<br/>
					<br/>
					<br/>
					<br/>
					<p>Before we go further and expand structure of our story it is good idea to develop your characters.</p>
					<p>Because every story is as good not as events occured but as good as deep and interesting characters are.</p>
					<Divider />
					{
						hero
						? null
						: 	<div>
								<p>For starters let's decide who is our main character</p>
								<UpsertCharacterForm role="hero" />
							</div>
					}
					{
						// hero is created and enemy field are not filled in
						typeof hero != 'undefined' && !selectn('backstory', enemy)
						? 	<div>
								<p>Now let's work on the enemy</p>
								<UpsertCharacterForm role="enemy" isUpdate character={enemy} />
							</div>
						: 	null
					}
				</div>
	}
}

CharactersStep.PropTypes = {
	Characters: PropTypes.object
}

export { CharactersStep }
export default connect(
	// stateToProps
	({project}, ownProps) => ({
		Characters: project.get('Characters'),
		...ownProps
	}),
	// dispatchToProps
    (dispatch, ownProps) => ({})
)(CharactersStep)