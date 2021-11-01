import React, { useEffect, Fragment, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fromJS } from 'immutable'
import { Timeline, Tag } from 'antd'
import Page from '../../components/Pagination'
import classnames from 'classnames'
import { Link, Redirect } from 'react-router-dom'
import { getArticleList } from './store/actionCreators'
import { ArticleWrapper, ArticleList, ArticleItem, TimelineDot, ArticleYear, ArticleTime, ArticleTitle } from './styled'

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
    <Redirect to={`/login?redirect=${redirectUrl}`} />
  ) : (
    <ArticleWrapper>
      <h2>我的文章</h2>
      <ArticleList>
        <Timeline>
          <Timeline.Item dot={<TimelineDot />}>
            <div style={{ fontSize: '12px' }}>嗯..！目前共计 {total} 篇文章。继续努力！</div>
          </Timeline.Item>
          {formatArr(articleList).map((item, i, arr) => (
            <Fragment key={item.get('year')}>
              <Timeline.Item dot={<TimelineDot />}>
                <ArticleYear>{item.get('year')}</ArticleYear>
              </Timeline.Item>
              <Fragment>
                {item.get('children').map((article, j, children) => (
                  <Timeline.Item
                    className={classnames({ 'ant-timeline-item-last': j === children.size - 1 && i === arr.size - 1 })}
                    key={article.get('_id')}
                    dot={<TimelineDot />}
                  >
                    <ArticleItem>
                      <Link to={`/detail/${article.get('_id')}`}>
                        <ArticleTime>{article.get('create_time').slice(5, 10)}</ArticleTime>
                        <ArticleTitle title={article.get('title')}>{article.get('title')}</ArticleTitle>
                        {article.get('secret') ? (
                          <Fragment>
                            <span>&nbsp;|&nbsp;</span>
                            <Tag color="#f50">私密</Tag>
                          </Fragment>
                        ) : null}
                      </Link>
                    </ArticleItem>
                  </Timeline.Item>
                ))}
              </Fragment>
            </Fragment>
          ))}
        </Timeline>
      </ArticleList>
      {total > 10 ? <Page total={total} onChange={handlePageChange} /> : null}
    </ArticleWrapper>
  )
}
export default LimitArticleList
