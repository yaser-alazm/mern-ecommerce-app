import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@mernshop.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@mernshop.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jina Doe',
    email: 'jina@mernshop.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
