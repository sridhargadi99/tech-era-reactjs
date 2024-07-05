import {Link} from 'react-router-dom'
import './index.css'

const CourseList = props => {
  const {eachCourseList} = props
  const {id, logoUrl, name} = eachCourseList
  return (
    <Link to={`/courses/${id}`} className="link-style">
      <li className="course-each-list">
        <img className="course-image" src={logoUrl} alt={name} />
        <h1 className="course-name">{name}</h1>
      </li>
    </Link>
  )
}

export default CourseList
