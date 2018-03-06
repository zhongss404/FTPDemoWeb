import React, {PropTypes} from 'react'
import {Select, Form, Button, AutoComplete, Input, Row, Col,Icon} from 'antd'

const FormItem = Form.Item

const Filter = ({onSearch,onResetOK,handleImport,handleExport,form:{getFieldDecorator,validateFields,resetFields,getFieldsValue}}) => {

  const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
  }

  const handleReset = () => {
    resetFields()
    onResetOK()
    onSearch()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      onSearch(values)
    })
  }

  function dyncObtainsButtons(){
    let buttons = []
    //涉及权限未添加
    buttons.push(<Button style={{marginLeft: 8}} onClick={handleImport}><Icon type="upload"/>导入</Button>)
    buttons.push(<Button style={{marginLeft: 8}} onClick={handleExport}><Icon type="download"/>导出</Button>)
    return buttons
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={8}>
          <FormItem {...formItemLayout} label={`用户名`}>
            {getFieldDecorator(`username`)(
              <Input />
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label={`姓名`}>
            {getFieldDecorator(`realname`)(
              <Input />
            )}
          </FormItem>
        </Col>
        <Col style={{textAlign: 'right'}}>
          <Button type="primary" icon="search" htmlType="submit">查询</Button>
          <Button style={{marginLeft: 8}} onClick={handleReset} icon="reload">清除</Button>
          {dyncObtainsButtons()}
        </Col>
      </Row>
    </Form>
  )
}

Filter.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
}

export default Form.create()(Filter)
