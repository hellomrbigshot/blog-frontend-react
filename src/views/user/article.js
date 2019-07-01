import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { Pagination, Timeline } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { actionCreators } from './store'
import { ArticleWrapper, ArticleList, ArticleItem, TimelineDot, ArticleYear, ArticleTime, ArticleTitle } from './styled'

class LimitArticleList extends Component {
  render() {
    const { articleList, total, getArticleList } = this.props
    return (
      <ArticleWrapper>
        <h2>我的文章</h2>
        <ArticleList>
          <Timeline>
            <Timeline.Item dot={<TimelineDot/>}>
              <div style={{fontSize: '12px'}}>嗯..！目前共计 {total} 篇文章。继续努力！</div>
            </Timeline.Item>
          {
            this.formatArr(articleList).map((item, i, arr) => (
              <Fragment key={item.get('year')}>
                <Timeline.Item dot={<TimelineDot/>}>
                  <ArticleYear>
                    {item.get('year')}
                  </ArticleYear>
                </Timeline.Item>
                <Fragment>
                  {
                    item.get('children').map((article, j, children) => (
                      <Timeline.Item 
                        className={classnames({'ant-timeline-item-last': j===(children.size-1)&&(i===arr.size-1)})} 
                        key={article.get('_id')} 
                        dot={<TimelineDot/>}
                      >
                        <ArticleItem>
                          <Link to={`/detail/${article.get('_id')}`}>
                            <ArticleTime>{article.get('create_time').slice(5, 10)}</ArticleTime>
                            <ArticleTitle>{article.get('title')}</ArticleTitle>
                          </Link>
                        </ArticleItem>
                      </Timeline.Item>
                    ))
                  }
                </Fragment>
              </Fragment>
            ))
          }
          </Timeline>
        </ArticleList>
        {
          total > 10 ? <Pagination total={total} onChange={getArticleList}/> : null
        }
      </ArticleWrapper>
      
    )
  }
  componentDidMount() {
    this.props.getArticleList()
  }
  formatArr(arr) {
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
}

export const mapStateToProps = (state) => {
  return {
    articleList: state.getIn(['user', 'article', 'articleList']),
    total: state.getIn(['user', 'article', 'total'])
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getArticleList(page = 1) {
      dispatch(actionCreators.getArticleList(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LimitArticleList)
