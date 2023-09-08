
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Read data from file, or initialize to empty array if file does not exist
try {
    ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
    USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'));
} catch {
    ADMINS = [];
    USERS = [];
    COURSES = [];
}
console.log(ADMINS);

const SECRET = 'my-secret-key';

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;
  const admin = ADMINS.find(a => a.username === username);
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newAdmin = { username, password };
    ADMINS.push(newAdmin);
    fs.writeFileSync('admins.json', JSON.stringify(ADMINS));
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login',  (req, res) => {
        const { username, password } =  req.body;
        const admin =  ADMINS.find(a => a.username === username && a.password === password);
        if (admin) {
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
            console.log("logged in")
        } else {
            res.status(403).json({ message: 'Invalid username or password' });
        }
});

// app.post('/admin/login',  (req,res)=>{
//         const {username, password} = req.headers;
//         const admin =  Admin.findOne({username, password});
//         if(admin){
//             const token = jwt.sign({username, role:'admin'}, SECRET, {expiresIn:'1h'});
//             res.json({message:'logged in successfully', token});
//         }else{
//             res.status(403).json({message:'Invalid username or passowrd'});
//         }
//     });

app.post('/admin/courses', authenticateJwt, (req, res) => {
  const course = req.body;
  function generateRandomId() {
    return Math.random().toString(36).substring(2, 10); // Generates an 8-character random string
  }

  const cId = generateRandomId();
  course.courseId = cId;
  // course.id = COURSES.length + 1;
  COURSES.push(course);
  fs.writeFileSync('courses.json', JSON.stringify(COURSES));
  res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.courseId === req.params.courseId);
  if (course) {
    Object.assign(course, req.body);
    fs.writeFileSync('courses.json', JSON.stringify(COURSES));
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

// app.delete('/admin/course/:courseId',authenticateJwt, (req, res) => {
//   const course = COURSES.find(c => c.courseId === req.params.courseId);
//   if (course) {
//     fs.remove('courses.json', JSON.stringify(COURSES));
//     res.json({ message: 'Course deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// });

// Asynchronous Way!!??
// =>
// app.delete('/admin/courses/:courseId',authenticateJwt, (req, res) => {
//   const course = COURSES.find(c => c.courseId === req.params.courseId);
//   if (course)
//   Object.assign(course, req.body); 
// fs.readFile('courses.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading JSON file:', err);
//     return;
//   }

//   try {
//     const jsonData = JSON.parse(data);
//     const objectIdToRemove = req.params.courseId;

//     const updatedData = jsonData.filter(obj => obj.courseId !== objectIdToRemove);

//     fs.writeFile('courses.json', JSON.stringify(updatedData, null), 'utf8', err => {
//       if (err) {
//         console.error('Error writing updated JSON file:', err);
//       } else {
//         console.log('Object removed from JSON file.');
//         res.json({ courses: COURSES });
//       }
//     });
//   } catch (parseError) {
//     console.error('Error parsing JSON:', parseError);
//   }
// });
// });



// app.delete('/admin/courses/:courseId', authenticateJwt, (req, res) => {
//   const course = COURSES.find(c => c.courseId === req.params.courseId);
//   if (course)
//     Object.assign(course, req.body);

//   try {
//     const data = fs.readFileSync('courses.json', 'utf8');
//     const jsonData = JSON.parse(data);
//     const objectIdToRemove = req.params.courseId;

//     const updatedData = jsonData.filter(obj => obj.courseId !== objectIdToRemove);

//     fs.writeFileSync('courses.json', JSON.stringify(updatedData, null), 'utf8');
//     console.log('Object removed from JSON file.');
//     res.json({ courses: COURSES });
//   } catch (err) {
//     console.error('Error:', err);
//   }
// });

// chat gpt Sol:

app.delete('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  const courseIdToDelete = req.params.courseId;

  // Update the in-memory COURSES array (if necessary)
  const courseIndex = COURSES.findIndex(course => course.courseId === courseIdToDelete);
  if (courseIndex !== -1) {
    COURSES.splice(courseIndex, 1);
  }

  try {
    // Read courses from the JSON file
    const data = fs.readFileSync('courses.json', 'utf8');
    const jsonData = JSON.parse(data);

    // Filter out the course to be deleted
    const updatedData = jsonData.filter(course => course.courseId !== courseIdToDelete);

    // Write the updated data back to the JSON file
    fs.writeFile('courses.json', JSON.stringify(updatedData, null, 2), 'utf8', err => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Object removed from JSON file.');
        res.json({ courses: COURSES }); // Respond with the updated list (optional)
      }
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// User routes
app.post('/users/signup', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login',  (req, res) => {
  const { username, password } = req.body;
  const user =  USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' }); 
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync('users.json', JSON.stringify(USERS));
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));