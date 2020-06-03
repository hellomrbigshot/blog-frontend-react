import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { config } from './config'

function Lab() {
  return (
    <Fragment>
      {config.map((item, i) => (
        <Link key={i} to={item.link}>
          <Card title={item.title} style={{ width: 300 }}>
            <div>{item.desc}</div>
          </Card>
        </Link>
      ))}
    </Fragment>
  )
}

export default Lab
