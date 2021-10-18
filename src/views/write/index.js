import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Select, Input, Switch, Button, Form } from 'antd'
import { Redirect } from 'react-router-dom'
import CreateTagModal from './components/CreateTagModal'
import { MEditor } from 'react-m-editor'
import { fetch } from '../../common'
import cloneDeep from 'lodash/cloneDeep'


const { Option } = Select


const EditorInput = ({ value, onChange, onFullScreenChange, theme }) => {
  const handleChange = ({ content }) => {
    onChange?.(content)
  }
  const handleFullScreenChange = (isFullScreen) => {
    onFullScreenChange?.(isFullScreen)
  }
  return (
    <MEditor
      value={value}
      theme={theme}
      debounce={true}
      onChange={handleChange}
      onFullScreenChange={handleFullScreenChange}
    />
  )
}

function Write ({ match: { params = null }, history }) {
  const user = useSelector(state => state.getIn(['user', 'user']))
  const theme = useSelector(state => state.getIn(['header', 'theme']))
  const [tagInfo, setTagInfo] = useState({ name: '', desription: '' })
  const [tagList, setTagList] = useState([])
  const [selectTag, setSelectTag] = useState([])
  const [createTagVisible, setCreateTagVisible] = useState(false)
  const [form] = Form.useForm()
  const id = params ? params.id : null
  useEffect(() => {
    getTagList()
    if (id) {
      getArticleDetail(id)
    }
  }, [id])
  const getArticleDetail = async (id) => {
    const data = await fetch.post('/api/page/editdetail', { id }, {}, { onlyData: true })
    form.setFieldsValue(data)
  }
  const tagSelect = tag => {
    // 添加一个新的 tag
    if (tagList.indexOf(tag) === -1) {
      setTagInfo({ name: tag, description: '' })
      setCreateTagVisible(true)
    }
  }
  const handleEditorFullScreenChange = isFullScreen => {
    if (isFullScreen) {
      document.getElementById('blogHeader').style.zIndex = '0'
    } else {
      document.getElementById('blogHeader').style.zIndex = '250'
    }
  }
  const tagChange = tags => {
    setSelectTag(tags)
  }
  const handleTagCancel = () => {
    // 删除添加的 tag
    console.log(tagInfo.name)
    const tags = cloneDeep(selectTag)
    tags.splice(tags.indexOf(tagInfo.name))
    setSelectTag(tags)
    form.setFieldsValue({ tags })
    setTagInfo({ name: '', description: '' })
    setCreateTagVisible(false)
  }
  const getTagList = async () => {
    // 获取 tag 列表
    const data = await fetch.post('/api/tag/alltags', {}, {}, { onlyData: true })
    setTagList(data)
  }
  const handleTagSubmit = async (values) => {
    // 新建 tag
    await fetch.post('/api/tag/create', values, {}, { onlyData: true })
    setTagInfo({ name: '', description: '' })
    setCreateTagVisible(false)
    getTagList()
  }
  // 保存草稿
  const handleSaveDraft = async () => {
    try {
      const values = await form.validateFields()
      createFormSubmit(values, 'draft')
    } catch (e) {}
  }
  // 发布文章
  const onFinish = (data) => {
    createFormSubmit(data)
  }
  const createFormSubmit = async (values, type = 'normal') => {
    // 提交新建表单
    const sendData = Object.assign(values, { status: type })
    let url = null
    if (id) {
      url = '/api/page/edit'
      sendData.id = id
    } else {
      url = '/api/page/new'
    }
    const { id: _id } = await fetch.post(url, sendData, {}, { onlyData: true })
    if (sendData.status === 'normal') {
      history.push({ pathname: `/detail/${_id}/true` })
    } else {
      history.push('/user/draft')
    }
  }
  const redirectUrl = encodeURIComponent('/write')
  return !user ? (
    <Redirect to={`/login?redirect=${redirectUrl}`} />
  ) : (
    <>
      <Form
        form={form}
        initialValues={{ secret: false }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input size="large" placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          name="tags"
          rules={[{ required: true, type: 'array', message: '请选择标签' }]}
        >
          <Select
            size="large"
            placeholder="请选择标签"
            allowClear={true}
            autoClearSearchValue={true}
            mode="tags"
            filterOption={true}
            onSelect={tagSelect}
            onChange={tagChange}
          >
            {
              tagList.map(tag => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
          <EditorInput
            theme={theme}
            onFullScreenChange={handleEditorFullScreenChange}
          />
        </Form.Item>
        <Form.Item
          label="是否私密"
          name="secret"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 3 }}
          valuePropName="checked"
          rules={[{ required: true, message: '请选择是否私密' }]}
        >
          <Switch/>
        </Form.Item>
        <Form.Item>
          <Button size="large" onClick={handleSaveDraft}>
            保存草稿
          </Button>
          <Button type="primary" htmlType="submit" size="large" style={{ marginLeft: '10px' }}>
            发布
          </Button>
        </Form.Item>
      </Form>
      <CreateTagModal
        visible={createTagVisible}
        tagInfo={tagInfo}
        cancel={handleTagCancel}
        submit={handleTagSubmit}
      />
    </>
  )
}

export default Write
