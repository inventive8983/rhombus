import { Card, Upload, Modal, message, Typography } from 'antd'
import Flex from '../../../components/shared-components/Flex';
import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {BASE_URL, API_BASE_URL} from '../../../constants/ApiConstant'
import mediaAPI from '../../../services/media'

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  } 

  
  
  class Gallery extends React.Component {
    state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
    
    componentDidMount = () => {
        mediaAPI.getGallery({folder: 'gallery'}).then(files => {
            files = files.map((file, index) => { return {
                uid: index,
                name: file,
                status: 'done',
                url: `${BASE_URL}media/gallery/${file}`
            }})

            console.log(files);
            this.setState({fileList: files})
        })
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handleDelete = (e) => {
        mediaAPI.delete({folder: 'gallery', filename: e.name}).then(res => {
            message.success("Successfully deleted");
        })
        .catch(err => {
            message.error("Some error occured")
        })
    }
  
    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };
  
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
          <>
          <Flex className="p-3" alignItems="center" justifyContent="between">
                <Typography.Title strong>Gallery</Typography.Title>
            </Flex>
        <Card>
            <div className="clearfix">
          <Upload
            action={`${API_BASE_URL}/upload/image/gallery`}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={this.handleDelete}
          >
            {uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        </Card>
        </>
      );
    }
  }

export default Gallery
