import React, {PropTypes} from 'react'
import {Row,Col,Button,Icon,Input,Modal,Upload,message} from 'antd'
import {baseURL} from '../../utils/config'
import style from './modal.less'

const ImportModal = ({visible,handleOkType,handleOk,onCancel,updateUploadState}) => {

  const modalProps = {
    title: `导入用户`,
    visible,
    width: 380,
    okText:`${handleOkType === 'upload' ? '导入': '确定'}`,
    onOk,
    onCancel,
  }

  function onOk(){
    if(handleOkType === ''){
      message.warning('请先上传需要导入的Excel文件!')
    }else{
      handleOk()
    }
  }

  const uploadProps = {
    name:'multipartFile',   //后台接收参数的名称
    action: baseURL + "/api/user/upload",
    beforeUpload(file,fileList){   //上传文件之前校验格式
      if(!(file.name.endsWith(".xls") || file.name.endsWith(".xlsx"))){
        message.error('文件格式不正确,请上传Excel文件!',3)
        return false
      }
    },
    onChange(info){
      const status = info.file.status
      if(status === 'done'){
        updateUploadState()   //导入状态修改
        message.info('上传文件成功! 请点击【导入】按钮完成导入!',3)
      }else if(status === 'error'){
        message.error(`${info.file.name}文件上传失败!清空上传列表后重试!`,3)
      }
    }
  }

  return (
      <Modal {...modalProps}>
          <div className={style.uploadBox}>
            <Upload {...uploadProps}>
              <div className={style.plus}><Icon type="upload" /></div>
              <div className={style.text}>上传</div>
            </Upload>
          </div>
        <div className={style.defaultspan}></div>
        <div className={style.defaultspan1}>注意事项:</div>
        <div className={style.defaultspan1}>1.执行导入之前,请先上传Excel文件</div>
        <div className={style.defaultspan1}>2.每次只能上传一个Excel文件</div>
      </Modal>
  )
}

ImportModal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default ImportModal
