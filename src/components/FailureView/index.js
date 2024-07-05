import './index.css'

const FailureView = props => {
  const {onRetryCourseDetails} = props
  const onClickRetryButton = onRetryCourseDetails()
  return (
    <div className="failure-main-container">
      <div className="failure-sub-container">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="failure-button"
          type="button"
          onClick={onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default FailureView
