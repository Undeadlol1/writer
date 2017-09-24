// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import { translate as t } from 'browser/containers/Translator'
import ProgressStepper from 'browser/components/ProgressStepper'
import UpsertSceneForm from 'browser/components/UpsertSceneForm'

class ProjectPage extends PureComponent {
    render() {
		const { project, loading } = this.props
		return 	<PageWrapper
					loading={loading}
					className='ProjectPage'
				>
					<Grid fluid>
						<center><h1>{project.get('title')}</h1></center>
						<center><h2>{project.get('shortPitch')}</h2></center>
						<ProgressStepper />
					</Grid>
				</PageWrapper>
    }
}

ProjectPage.propTypes = {
	project: PropTypes.object.isRequired,
}

export { ProjectPage }

export default
connect(
	({project}, ownProps) => ({
		project,
		...ownProps
	}),
)(ProjectPage)