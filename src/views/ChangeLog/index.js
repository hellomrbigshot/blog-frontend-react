import React, { Fragment } from 'react'
import settings from './changeLogSetting'
import { LogItem, LogItemHeader, LogItemDate, LogItemDescHeader, LogItemDescItemWrapper, LogItemDescItem } from './styled'
function ChangeLog () {
  return (
    <div>
      {
        settings.map(item => (
          <LogItem key={item.version}>
            <LogItemHeader>{ item.version }</LogItemHeader>
            <LogItemDate>{ item.date }</LogItemDate>
            {
              Object.keys(item.desc).map(key => (
                <Fragment key={key}>
                  <LogItemDescHeader>{ key }</LogItemDescHeader>
                  <LogItemDescItemWrapper>{
                    item.desc[key].map(_item => (
                    <LogItemDescItem key={_item}>{ _item }</LogItemDescItem>
                    ))
                  }</LogItemDescItemWrapper>
                </Fragment>
              ))
            }
          </LogItem>
        ))
      }
    </div>
  )
}

export default ChangeLog
