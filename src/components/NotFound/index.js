import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <Header />
    <div className="not-found-main-container1">
      <div className="not-found-sub-container">
        <img
          className="not-found-image"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png "
          alt="not found"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
