import { Upload, Modal } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { API_BASE_URL } from 'constants/ApiConstant';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {



  state = {
    previewVisible: false,
    previewImage: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  onRemove = (file) => {
      console.log(file);
  }

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
          {console.log(this.props)}
        <Upload
          action={`${API_BASE_URL}/${this.props.type}/${this.props.collection}/upload`}
          listType="picture-card"
          headers={{"authorization": window.localStorage.token}}
          fileList={this.props.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.onRemove}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt={this.props.type} style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall