// dependencies
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
// project files
import PageWrapper from 'browser/components/PageWrapper'
import PlotPointsForm from 'browser/components/PlotPointsForm'
import { translate as t } from 'browser/containers/Translator'
import ProgressStepper from 'browser/components/ProgressStepper'

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
						<PlotPointsForm />
					</Grid>
				</PageWrapper>
    }
}

ProjectPage.propTypes = {
	// prop: PropTypes.object,
}

export { ProjectPage }

export default
connect(
	({project}, ownProps) => ({
		project,
		...ownProps
	}),
)(ProjectPage)