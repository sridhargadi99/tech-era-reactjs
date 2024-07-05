import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const activeStatus = {
  initial: 'Initial',
  inProgress: 'In_Progress',
  success: 'Success',
  failure: 'Failure',
}

class Home extends Component {
  state = {
    courseIdDetails: {},
    courseIdApiStatus: activeStatus.success,
  }

  componentDidMount() {
    this.getCourseIdDetails()
  }

  onRetryCourseDetails = () => this.getCourseListDetails()

  getCourseIdDetails = async () => {
    this.setState({courseIdApiStatus: activeStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/te/courses/${id}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }

      this.setState({
        courseIdDetails: updatedData,
        courseIdApiStatus: activeStatus.success,
      })
    } else {
      this.setState({courseIdApiStatus: activeStatus.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderCourseIdApiSuccessView = () => {
    const {courseIdDetails} = this.state
    const {name, imageUrl, description} = courseIdDetails
    return (
      <div className="success-container">
        <div className="success-sub-container">
          <img className="success-image " src={imageUrl} alt={name} />
          <div className="success-content-container">
            <h1 className="name">{name}</h1>
            <p className="description ">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderCourseIdApiFailureView = () => (
    <FailureView onRetryCourseDetails={this.onRetryCourseDetails} />
  )

  renderCourseIdDetails = () => {
    const {courseIdApiStatus} = this.state
    switch (courseIdApiStatus) {
      case activeStatus.inProgress:
        return this.renderLoading()
      case activeStatus.success:
        return this.renderCourseIdApiSuccessView()
      case activeStatus.failure:
        return this.renderCourseIdApiFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        {this.renderCourseIdDetails()}
      </div>
    )
  }
}

export default Home
