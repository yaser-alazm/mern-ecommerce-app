import React from 'react'

import {Alert} from 'react-bootstrap'

function Message({color, text}) {
  return <Alert variant={color}>{text}</Alert>
}

export default Message
