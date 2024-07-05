import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseList from '../CourseList'
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
    courseList: [],
    courseApiStatus: activeStatus.success,
  }

  componentDidMount() {
    this.getCourseListDetails()
  }

  onRetryCourseDetails = () => this.getCourseListDetails()

  getCourseListDetails = async () => {
    this.setState({courseApiStatus: activeStatus.inProgress})
    const options = {
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/te/courses`, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        courseList: updatedData,
        courseApiStatus: activeStatus.success,
      })
    } else {
      this.setState({courseApiStatus: activeStatus.failure})
    }
  }

  renderLoading = () => (
    <div className="home-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderCourseApiSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="home-sub-container">
        <h1 className="home-heading">Courses</h1>
        <ul className="home-courses-list">
          {courseList.map(eachCourseList => (
            <CourseList
              key={eachCourseList.id}
              eachCourseList={eachCourseList}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderCourseApiFailureView = () => (
    <FailureView onRetryCourseDetails={this.onRetryCourseDetails} />
  )

  renderCourseDetails = () => {
    const {courseApiStatus} = this.state
    switch (courseApiStatus) {
      case activeStatus.inProgress:
        return this.renderLoading()
      case activeStatus.success:
        return this.renderCourseApiSuccessView()
      case activeStatus.failure:
        return this.renderCourseApiFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-main-container">
        <Header />
        {this.renderCourseDetails()}
      </div>
    )
  }
}

export default Home
