//loginRegister.js 
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

// Registration routes



// router.get('/register', (req, res) => {
//   res.send('GET /register');
// });


//^changed this to the following code 

router.get('/register', (req, res) => {
  const { username, password } = req.query;
  // Now you have the username and password
  console.log(`Username: ${username}, Password: ${password}`);
  
  // Make sure you do not send password back in the response.
  // This is just for demonstration.
  res.send(`Username: ${username}, Password: ${password}`);
});


//USED THE FOLLOWING LINK
//http://localhost:3000/register?username=test&password=test




router.post('/register', async (req, res) => {

  try {
    const { first_name, email, password, last_name, username, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);


    let newUserString = 'INSERT INTO users (first_name, email, password, last_name, username, user_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email';
    let newUserParams =  [first_name, email, hashedPassword, last_name, username, userType]

    // if (userType==="seller"){
    //   newUserString = 'INSERT INTO companies (user_id, company_name, rating, location) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email';
    //   newUserParams =  [first_name, email, hashedPassword, last_name, username]
    // }

    const newUser = await pool.query(
      newUserString, 
      newUserParams
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login routes
// router.get('/login', (req, res) => {
//   res.send('GET /login');
// });
//^improved that with follwing code

router.get('/login', async (req, res) => {
  const { username, password } = req.query;

  // In a real-world application, you would typically hash the password and compare it against
  // the hashed password in your database. In this case, you're simply checking if the username
  // and password match the string "test".

  if (username === 'test' && password === 'test') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});



//USED THE FOLLOWING LINK
//http://localhost:3000/login?username=test&password=test





router.post('/login', async (req, res) => {

console.log (req.body)

  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (!user.rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // res.status(200).json({ message: 'Login successful' });
    delete user.rows[0].password;
    res.status(200).json(user.rows[0])
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;







// const express = require('express');
// const bcrypt = require('bcrypt');
// const pool = require('../db');

// const router = express.Router();

// // Registration routes
// router.get('/register', (req, res) => {
//   // This route would usually show a registration form in a real-world application
//   res.send('GET /register');
// });

// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
//       [username, email, hashedPassword]
//     );

//     res.status(201).json(newUser.rows[0]);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login routes
// router.get('/login', (req, res) => {
//   // This route would usually show a login form in a real-world application
//   res.send('GET /login');
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (!user.rows.length) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;






// const express = require('express');
// const bcrypt = require('bcrypt');
// const pool = require('../db');

// const router = express.Router();

// // Registration routes
// router.get('/Register', async (req, res) => {
//   try {
//     const { username, email, password } = req.query;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
//       [username, email, hashedPassword]
//     );

//     res.status(200).json(newUser.rows[0]);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/Register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
//       [username, email, hashedPassword]
//     );

//     res.status(201).json(newUser.rows[0]);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login routes
// router.get('/login', async (req, res) => {
//   try {
//     const { email, password } = req.query;

//     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (!user.rows.length) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (!user.rows.length) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;






// const express = require('express');
// const bcrypt = require('bcrypt');
// const pool = require('../db');

// const router = express.Router();

// // Registration get route

// router.get('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.query;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
//       [username, email, hashedPassword]
//     );

//     res.status(200).json(newUser.rows[0]);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // post route for registration
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
//       [username, email, hashedPassword]
//     );

//     res.status(201).json(newUser.rows[0]);
//     console.log('++++++')
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// // GET route for /loginRegister
// router.get('/', (req, res) => {
//   res.status(200).json({ message: 'You have accessed the /loginRegister route' });
// });

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (!user.rows.length) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// module.exports = router;





// const express = require('express');
// const bcrypt = require('bcrypt');
// const pool = require('../db');

// const router = express.Router();

// // Registration route
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
//       [username, email, hashedPassword]
//     );

//     res.status(201).json(newUser.rows[0]);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (!user.rows.length) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // GET route for /loginRegister
// router.get('./loginRegister', (req, res) => {
//   res.status(200).json({ message: 'You have accessed the /loginRegister route' });
// });


// module.exports = router;





// const express = require('express');
// const bcrypt = require('bcrypt');
// const pool = require('../db');

// const router = express.Router();

// // Registration route
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await pool.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING ',
//       [username, email, hashedPassword]
//     );

//     res.status(201).json(newUser.rows[0]);
//     // add console log on this line if ever need to troubleshoot errors or issues
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await pool.query('SELECT FROM users WHERE email = $1', [email]);

//     if (!user.rows.length) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
  
//         // console log here to verify login success

//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
    
//   }
// });



// module.exports = router;

// import { Router } from 'express';
// const router = Router();
// import { registerUser } from './db/queries';

// // Login/Register Route - Register a New User
// // router.post('/register', async (req, res) => {
// //   const userData = req.body;
// //   try {
// //     const newUser = await registerUser(userData);
// //     res.json(newUser);
// //   } catch (error) {
// //     console.error('Error registering user:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });

// // export default router;





// // const router = require("express").Router();

// // router.get("/", async (req, res) => {
// //   try {
// //     return res.status(200).send({ message: "This is login/register✅" });
// //   } catch (error) {
// //     console.error("Error fetching cars for sale:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // router.post("/", async (req, res) => {
// //   try {
// //     return res
// //       .status(200)
// //       .send({ message: "This is post login/register✅", data: req.body });
// //   } catch (error) {
// //     console.error("Error fetching cars for sale:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // module.exports = router;



// // The login route
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

//     if (result.rows.length > 0) {
//       // User found and password matches
//       res.send(result.rows[0]);  // Respond with the found user
//     } else {
//       // No user found or password does not match
//       res.status(401).send('Invalid username or password');
//     }
//   } catch (error) {
//     // Handle error
//     res.status(500).send('An error occurred during login');
//   }
// });

// module.exports = router;
