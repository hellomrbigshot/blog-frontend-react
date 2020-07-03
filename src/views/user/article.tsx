import React, { useEffect, Fragment, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fromJS } from 'immutable'
import { Pagination, Timeline, Tag } from 'antd'
import classnames from 'classnames'
import { Link, Redirect } from 'react-router-dom'
import { getArticleList } from './store/actionCreators'
import { ArticleWrapper, ArticleList, ArticleItem, TimelineDot, ArticleYear, ArticleTime, ArticleTitle } from './styled'
interface IState {
  user: {
    article: {
      articleList: any[],
      total: number
    },
    user: string
  }
}
interface IArticle {
  _id: string,
  create_time: string,
  title: string,
  secret: boolean
}
function LimitArticleList () {
  const dispatch = useDispatch()
  const articleList = useSelector((state: IState) => state.user.article.articleList)
  const total = useSelector((state: IState) => state.user.article.total)
  const user = useSelector((state: IState) => state.user.user)
  useEffect(() => {
    dispatch(getArticleList(1))
  }, [dispatch])
  const handlePageChange = useCallback(page => {
    dispatch(getArticleList(page))
  }, [dispatch])
  const formatArr = (arr: any[]) => {
    let result = arr.reduce((arr, value) => {
      if (arr.some((arr: { year: string }) => arr.year === value.create_time.slice(0, 4))) {
        arr.find((arr: { year: string }) => arr.year === value.create_time.slice(0, 4)).children.push(value)
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
  return !user ? (
    <Redirect to={{ pathname: '/login', state: { redirect: '/user/list' } }} />
  ) : (
    <ArticleWrapper>
      <h2>我的文章</h2>
      <ArticleList>
        <Timeline>
          <Timeline.Item dot={<TimelineDot />}>
            <div style={{ fontSize: '12px' }}>嗯..！目前共计 {total} 篇文章。继续努力！</div>
          </Timeline.Item>
          {formatArr(articleList).map((item: any, i: number, arr: any[]) => (
            <Fragment key={item.year}>
              <Timeline.Item dot={<TimelineDot />}>
                <ArticleYear>{item.year}</ArticleYear>
              </Timeline.Item>
              <Fragment>
                {item.children.map((article: IArticle, j: number, children: IArticle[]) => (
                  <Timeline.Item
                    className={classnames({ 'ant-timeline-item-last': j === children.length - 1 && i === arr.length - 1 })}
                    key={article._id}
                    dot={<TimelineDot />}
                  >
                    <ArticleItem>
                      <Link to={`/detail/${article._id}`}>
                        <ArticleTime>{article.create_time.slice(5, 10)}</ArticleTime>
                        <ArticleTitle>{article.title}</ArticleTitle>
                        {article.secret ? (
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
      {total > 10 ? <Pagination total={total} onChange={handlePageChange} /> : null}
    </ArticleWrapper>
  )
}
export default LimitArticleList
