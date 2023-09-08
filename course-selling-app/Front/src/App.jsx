import { useState } from 'react'
import Signup from './components/Signup'
import SignupU from './components/SignupU'
import Landing from './components/Landing'
import Adlog from './components/Adminlogin'
import AddCourse from './components/AddCourse'
import CoursePage  from './components/CoursesPage'
import Courseone  from './components/OneCourse'
import Userlog  from './components/Userlog'
import UserCourse  from './components/UserCoursepage'
import './app.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignupA from './components/SignupA'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <div className='landing' >
          
    <Router>
      <Routes>
        {/* admin routes */}
        <Route path="/addcourses" element={<AddCourse/>}/>
        <Route path="/coursespage" element={<CoursePage/>}/>
        <Route path="/course/:courseId" element={<Courseone/>}/>
        <Route path="/adminsignup" element={<SignupA/>}/>
        <Route path="/adminlogin" element={<Adlog/>}/>
        {/* user routes */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/usersignup" element={<SignupU/>}/>
        <Route path="/userlogin" element={<Userlog/>}/>
        <Route path="/u-courses" element={<UserCourse/>}/>
        
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </Router>
    </div>

    </>
  )
}

export default App
