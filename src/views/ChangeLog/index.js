import React, { Fragment } from 'react'
import settings from './changeLogSetting'
function ChangeLog () {
  return (
    <div>
      {
        settings.map(item => (
          <div key={item.version} className='p-6 rounded shadow w-11/12 mx-auto mb-6'>
            <div className='text-lg font-medium mb-4'>{ item.version }</div>
            <div className='px-1.5 py-1 rounded w-24 text-center bg-gray-100 text-gray-600'>{ item.date }</div>
            {
              Object.keys(item.desc).map(key => (
                <Fragment key={key}>
                  <div className='mt-6 mb-3 font-bold'>{ key }</div>
                  {
                    item.desc[key].map(_item => (
                      <div key={_item} className='my-1.25 ml-2.5 flex items-stretch'>
                        <div className='w-4 flex items-center'>
                          <div className='w-1.5 h-1.5 rounded-full border border-solid border-gray-500'></div>
                        </div>
                        <div className='text-sm leading-7 text-gray-600'>{ _item }</div>
                      </div>
                    ))
                  }
                </Fragment>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default ChangeLog
