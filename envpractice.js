require('dotenv').config()

var sensitive = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
}

console.log(sensitive)