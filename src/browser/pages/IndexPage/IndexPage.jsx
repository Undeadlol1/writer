// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Grid, Row } from 'react-styled-flexboxgrid'
// project files
import store from 'browser/redux/store'
import Loading from 'browser/components/Loading'
import MoodTabs from 'browser/components/MoodTabs'
import MoodsFind from 'browser/components/MoodsFind'
import MoodsList from 'browser/components/MoodsList'
import MoodsInsert from 'browser/components/MoodsInsert'
import PageWrapper from 'browser/components/PageWrapper'
import WelcomeCard from 'browser/components/WelcomeCard'

class IndexPage extends PureComponent {
    render() {
		const { props } = this
		return 	<PageWrapper
					className='IndexPage'
					loading={props.loading}
				>
					<Grid fluid>
						{/* <WelcomeCard /> */}
						<MoodsInsert />
						{/* <MoodTabs /> */}
						<MoodsList moods={props.projects} />
					</Grid>
				</PageWrapper>
    }
}

IndexPage.propTypes = {
	moods: PropTypes.object,
	totalPages: PropTypes.number,
	currentPage: PropTypes.number,
	loading: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
}

export { IndexPage }

export default
connect(
	({mood, project}) => ({
		projects: project.get('projects'),
		moods: mood.get('moods'),
		loading: mood.get('loading'),
		totalPages: mood.get('totalPages'),
		currentPage: mood.get('currentPage'),
	}),
)(IndexPage)