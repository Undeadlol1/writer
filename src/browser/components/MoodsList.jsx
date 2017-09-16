import { fetchMoods } from 'browser/redux/actions/MoodActions'
import Pagination from 'react-ultimate-pagination-material-ui'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { translate } from 'browser/containers/Translator'
import { Row, Col } from 'react-styled-flexboxgrid'
import Link from 'react-router/lib/Link'
import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, fromJS } from 'immutable'
import selectn from 'selectn'
import Loading from 'browser/components/Loading'

const itemStyles = {
	marginBottom: '1rem'
}

export class MoodsList extends Component {

	renderItems = () => {
		const { props } = this
		if(props.moods.size) {
			return props.moods.map( mood => {
					const nodeContent = mood.get('image')
					const src = nodeContent
								? nodeContent
								: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
					return	<Col className="MoodsList__item" style={itemStyles} xs={12} sm={6} md={4} lg={3} key={mood.get('id')}>
								<Paper zDepth={5}>
									<Link to={`/projects/${mood.get('slug')}`}>
										<Card>
											<CardMedia overlay={<CardTitle title={mood.get('title')} subtitle={mood.get('shortPitch')} />}>
												<img alt={mood.get('title') + translate('things_image')} src={src} />
											</CardMedia>
											{/* <CardTitle title={mood.get('title')} /> */}
										</Card>
									</Link>
								</Paper>
							</Col>
			})
		}
		else return	<Col xs={12} className={'MoodsList__empty'}>
						<b>
							<i>{translate('list_is_empty')}...</i>
						</b>
					</Col>
	}

	render() {
		const { props } = this
		if (props.loading) return <Loading />
		return  <section className="MoodsList">
					<Row>
						{this.renderItems()}
					</Row>
					<Row>
						<div className='MoodsList__pagination-wrapper'>
							{/*Created UltimatePagination component has the following interface:

								currentPage: number - current page number
								totalPages: number - total number of pages
								boundaryPagesRange: number, optional, default: 1 - number of always visible pages at the beginning and end
								siblingPagesRange: number, optional, default: 1 - number of always visible pages before and after the current one
								hideEllipsis: bool, optional, default: false - boolean flag to hide ellipsis
								hidePreviousAndNextPageLinks: bool, optional, default: false - boolean flag to hide previous and next page links
								hideFirstAndLastPageLink: bool, optional, default: false - boolean flag to hide first and last page links
								onChange: function - callback that will be called with new page when it should be changed by user interaction (optional)*/}
							{
								props.totalPages > 1
								? <Pagination
									style={{ margin: '0 auto' }}
									className='MoodsList__pagination'
									onChange={props.changePage}
									currentPage={props.currentPage}
									totalPages={props.totalPages}
									hidePreviousAndNextPageLinks={true}
									hideFirstAndLastPageLink={true} />
								: null
							}
						</div>
					</Row>
				</section>
	}
}

MoodsList.propTypes = {
  moods: PropTypes.object.isRequired,
  selector: PropTypes.string,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
}

MoodsList.defaultProps = {
	moods: List(),
	// moods: fromJS([
	// 	{
	// 		id: '1',
	// 		title: 'Евгеника',
	// 		image: 'https://i.pinimg.com/236x/9b/82/4a/9b824a0b002b842c8c2c4c216b034307.jpg',
	// 		shortPitch: 'blahblah фывлыфвлдфвфывлд',
	// 	},
	// 	{
	// 		id: '2',
	// 		title: 'Второй',
	// 		image: 'https://i.pinimg.com/236x/52/2e/d8/522ed8f7a34580bac8399278f4f7a4f3.jpg',
	// 		shortPitch: 'blahblah фывлыфвлдфвфывлд',
	// 	},
	// 	{
	// 		id: '3',
	// 		title: 'Третий',
	// 		image: 'https://i.pinimg.com/originals/76/2c/50/762c50ba587ffce8cbd319e865da0e4d.png',
	// 		shortPitch: 'blahblah фывлыфвлдфвфывлд',
	// 	},
	// ]),
	totalPages: 0,
	currentPage: 0,
}

export default connect(
	// stateToProps
	({mood}, ownProps) => ({
		loading: mood.get('loading'),
		...ownProps
	}),
	// dispatchToProps
    (dispatch, ownProps) => ({
		changePage(page) {
			dispatch(fetchMoods(ownProps.selector, page))
		}
    })
)(MoodsList)
