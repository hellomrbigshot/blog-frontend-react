import React, { useEffect, Fragment, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fromJS } from 'immutable'
import { Timeline, Tag } from 'antd'
import Page from '../../components/Pagination'
import classnames from 'classnames'
import { Link, Redirect } from 'react-router-dom'
import { getArticleList } from './store/actionCreators'
import TimelineDot from './components/TimelineDot'

function LimitArticleList () {
  const dispatch = useDispatch()
  const articleList = useSelector(state => state.getIn(['user', 'article', 'articleList']))
  const total = useSelector(state => state.getIn(['user', 'article', 'total']))
  const user = useSelector(state => state.getIn(['user', 'user']))
  useEffect(() => {
    dispatch(getArticleList(1))
  }, [dispatch])
  const handlePageChange = useCallback(page => {
    dispatch(getArticleList(page))
  }, [dispatch])
  const formatArr = (arr) => {
    arr = arr.toJS()
    let result = arr.reduce((arr, value) => {
      if (arr.some(arr => arr.year === value.create_time.slice(0, 4))) {
        arr.find(arr => arr.year === value.create_time.slice(0, 4)).children.push(value)
      } else {
        arr.push({
          year: value.create_time.slice(0, 4),
          children: [value]
        })
      }
      return arr
    }, [])
    return fromJS(result)
  }
  const redirectUrl = encodeURIComponent('/user/list')
  return !user ? (
    <Redirect to={`/signin?redirect=${redirectUrl}`} />
  ) : (
    <div>
      <h2>我的文章</h2>
      <div className='mt-8'>
        <Timeline>
          <Timeline.Item dot={<TimelineDot />}>
            <div className='text-xs'>嗯..！目前共计 {total} 篇文章。继续努力！</div>
          </Timeline.Item>
          {formatArr(articleList).map((item, i, arr) => (
            <Fragment key={item.get('year')}>
              <Timeline.Item dot={<TimelineDot />}>
                <div className='text-2xl text-gray-400 font-normal'>{ item.get('year') }</div>
              </Timeline.Item>
              <Fragment>
                {item.get('children').map((article, j, children) => (
                  <Timeline.Item
                    dot={<TimelineDot />}
                    className={classnames({ 'ant-timeline-item-last': j === children.size - 1 && i === arr.size - 1 })}
                    key={article.get('_id')}
                  >
                    <Link className='flex group pb-2.5 items-center border-dashed border-gray-300 border-b hover:border-gray-600' to={`/detail/${article.get('_id')}`}>
                      <div className='text-xs text-gray-500 w-10'>{article.get('create_time').slice(5, 10)}</div>
                      <div className='text-base ml-2 text-gray-600 font-medium overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:text-gray-800' title={article.get('title')}>{article.get('title')}</div>
                      {article.get('secret') ? (
                        <Fragment>
                          <span>&nbsp;|&nbsp;</span>
                          <Tag color="#f50">私密</Tag>
                        </Fragment>
                      ) : null}
                    </Link>
                  </Timeline.Item>
                ))}
              </Fragment>
            </Fragment>
          ))}
        </Timeline>
      </div>
      {total > 10 ? <Page total={total} onChange={handlePageChange} /> : null}
    </div>
  )
}
export default LimitArticleList
