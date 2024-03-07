const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const session = require('express-session');

const csrfProtect = csrf({cookie: true})
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 } // session timeout of 60 seconds
}));


router.get('/', (req, res) => {
  res.send({
    hello: 'world',
  })
});


/**
 * CSRF protection - uncomment the commented lines
 */

// router.get('/users-form', csrfProtect, (req, res) => {
router.get('/users-form', (req, res) => {
  res.send({
    csrfToken: req.csrfToken()
  });
})

// router.post('/users', csrfProtect, (req, res) => {
router.post('/users', (req, res) => {
  console.log('User created', req.body);

  res.status(201).send({
    created: true,
  })
})

/**
 * Session management
 */
const isValidUser = (username, password) => true;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Authenticate user
  if (isValidUser(username, password)) {
    req.session.isLoggedIn = true;
    req.session.username = username;

    res.send({
      isLoggedIn: true
    })
  } else {
    res.send({
      isLoggedIn: false
    })
  }
});

router.get('/session-data', (req, res) => {
  res.send({
    session: req.session
  })
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.send({
      isLoggedIn: false
    })
  });
});


app.use(router);

app.listen(3000);
console.log('Server listening on http://localhost:3000');

