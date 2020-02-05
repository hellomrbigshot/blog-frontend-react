import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Form, Select, Input, Switch, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import CreateTag from './components/createTag'
import MEditor from 'react-m-editor'
import { fetch } from '../../common'

const { Option } = Select

const WriteForm = Form.create({
  name: 'write'
})(props => {
  const {
    articleDetail,
    tagSelect,
    tagList,
    form: { getFieldDecorator }
  } = props
  const submit = type => {
    props.form.validateFields((error, values) => {
      if (!error) {
        props.submit({ ...values, status: type === 'draft' ? 'draft' : 'normal' })
      }
    })
  }
  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入文章标题' }],
          initialValue: articleDetail.title
        })(<Input size="large" placeholder="请输入标题" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('tags', {
          rules: [{ required: true, type: 'array', message: '请选择标签' }],
          initialValue: articleDetail.tags
        })(
          <Select size="large" placeholder="请选择标签" filterable allowClear autoClearSearchValue mode="tags" filterOption onSelect={tagSelect}>
            {tagList.map(tag => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('content', {
          rules: [{ required: true, message: '请输入文章内容' }],
          initialValue: articleDetail.content
        })(<MEditor theme="dark" />)}
      </Form.Item>
      <Form.Item label="是否私密：" labelCol={{ span: 3 }} wrapperCol={{ span: 3 }}>
        {getFieldDecorator('secret', {
          rules: [{ required: true, message: '请选择是否私密' }],
          valuePropName: 'checked',
          initialValue: articleDetail.secret
        })(<Switch />)}
      </Form.Item>
      <Form.Item>
        <Button size="large" onClick={() => submit('draft')}>
          保存草稿
        </Button>
        <Button type="primary" size="large" style={{ marginLeft: '10px' }} onClick={submit}>
          发布
        </Button>
      </Form.Item>
    </Form>
  )
})

function Write ({ match: { params = null }, history }) {
  const user = useSelector(state => state.getIn(['user', 'user']))
  const [tagInfo, setTagInfo] = useState({ name: '', desription: '' })
  const [tagList, setTagList] = useState([])
  const [visible, setVisible] = useState(false)
  const [articleDetail, setArticleDetail] = useState({ status: '', secret: false, title: '', content: '', tags: [] })
  const id = params ? params.id : null
  useEffect(() => {
    getTagList()
    if (id) {
      getArticleDetail(id)
    }
  }, [id])
  const getArticleDetail = (id) => {
    fetch
      .post('/api/page/detail', { id })
      .then(res => {
        setArticleDetail(res.data.data)
      })
      .catch(e => {
        console.log(e.message)
      })
  }
  const tagSelect = tag => {
    // 添加一个新的 tag
    if (tagList.indexOf(tag) === -1) {
      setTagInfo({ name: tag, description: '' })
      setVisible(true)
    }
  }
  const tagChange = tags => {
    articleDetail.tags = tags
    setArticleDetail(articleDetail)
  }
  const titleChange = e => {
    articleDetail.title = e.target.value
    setArticleDetail(articleDetail)
  }
  const contentChange = obj => {
    articleDetail.content = obj.content
    setArticleDetail(articleDetail)
  }
  const  secretChange = value => {
    articleDetail.secret = value
    setArticleDetail(articleDetail)
  }
  const handleTagCancel = () => {
    // 删除添加的 tag
    
    articleDetail.tags.splice(articleDetail.tags.indexOf(tagInfo.name))
    setArticleDetail(articleDetail)
    setTagInfo({ name: '', description: '' })
    setVisible(false)
  }
  const getTagList = () => {
    // 获取 tag 列表
    fetch
      .post('/api/tag/alltags')
      .then(res => {
        setTagList(res.data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
  const handleTagSubmit = values => {
    // 新建 tag
    fetch
      .post('/api/tag/create', values)
      .then(res => {
        setTagInfo({ name: '', description: '' })
        setVisible(false)
        getTagList()
      })
      .catch(e => {
        console.log(e)
      })
  }
  const submit = values => {
    // 提交新建表单
    const sendData = Object.assign(articleDetail, values)
    let url = null
    if (sendData._id) {
      url = '/api/page/edit'
      sendData.id = sendData._id
    } else {
      url = '/api/page/new'
    }
    fetch
      .post(url, sendData)
      .then(res => {
        if (sendData.status === 'normal') {
          history.push({ pathname: `/detail/${res.data.data.id}` })
        } else {
          history.push('/user/draft')
        }
      })
      .catch(e => {
        console.log(e.message)
      })
  }
  return !user ? (
    <Redirect to={{ pathname: '/login', query: { redirect: '/write' } }} />
  ) : (
    <Fragment>
      <WriteForm
        articleDetail={articleDetail}
        tagList={tagList}
        tagSelect={tagSelect}
        tagChange={tagChange}
        titleChange={titleChange}
        contentChange={contentChange}
        secretChange={secretChange}
        submit={submit}
      />
      <CreateTag visible={visible} tagInfo={tagInfo} cancel={handleTagCancel} submit={handleTagSubmit} />
    </Fragment>
  )
}

export default Write
