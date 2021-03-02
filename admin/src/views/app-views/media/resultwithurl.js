import { Button, Card, Image, Input, message, Modal, Row, Col, Empty } from 'antd'
import React, {useEffect, useState} from 'react'
import generalAPI from 'services/general'
import {PlusCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import { image } from 'd3-fetch';

function Gallerywithurl() {

    const [imgData, setImages] = useState([])
    const [modal, openModal] = useState(false)
    const [urls, setUrls] = useState("")

    useEffect(() => {

        generalAPI.getContent({content: 'results'}).then(data => {
           if(data != []) setImages(data)
           console.log(imgData);
        })

    }, [])

    const updateGallery = async () => {
        if(urls !== ''){
            const addons = urls.trim().split(',')
            var imgs = imgData
            addons.forEach(item => imgs.push(item))
            generalAPI.updateContent({content: 'results'}, imgData).then(res => {
                message.success("Updated Successfully")
                setImages(imgs)
                setUrls("")
                openModal(false)
            }).catch(err => {
                message.error("Some error occured")
            })
        }
        
    }

    const onChange = e => {
        setUrls(e.target.value)
    };

    const remove = src => {
        var img = imgData.filter(img => img !== src)
        setImages(img)
        generalAPI.updateContent({content: 'results'}, img).then(res => {
            message.success("Updated Successfully")
            setUrls("")
            openModal(false)
        }).catch(err => {
            message.error("Some error occured")
        })
    }

    return (
        <Card title="Gallery" extra={<Button onClick = {() => {openModal(true)}} type="primary"><PlusCircleOutlined /> Add Image</Button>}>
            <Row>
                {imgData.length === 0 && <Empty
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        imageStyle={{
                        height: 60,
                        }}
                        className="w-100 py-5"
                        description={
                        <span>
                            No Images
                        </span>
                        }
                    >
                        <Button onClick = {() => {openModal(true)}} type="primary">Add Images</Button>
                    </Empty>}
                {imgData.length !== 0 && imgData.map((src, index) =>
                    <Col key={index} sm={24} md={12} lg={8} xl={6} className="p-2">
                        <div className="position-relative">
                            <img className="overflow-hidden" style={{borderRadius: "12px", objectFit:"cover"}} width="100%" height="256px" src={src}></img>
                            <Button onClick={() => {remove(src)}} type="ghost" className="position-absolute text-white" style={{right:"16px", bottom:"16px"}}><DeleteOutlined /></Button>
                        </div>
                    </Col>
                )}    
            </Row>
            <Modal
            width="100%"
            style={{maxWidth: 1140}}
            height="100%"
            title="Add Images"
            visible={modal}
            onOk={() => {updateGallery()}}
            onCancel={() => {openModal(false)}}
            >
                <Input onChange={onChange} value={urls} placeholder="Place Image Urls Here"></Input>
                <Row>
                    {urls !== "" && urls.split(',').map((src, index) => 
                        <Col key={index} sm={24} md={12} lg={8} className="p-2">
                        <img className="overflow-hidden" style={{borderRadius: "12px", objectFit:"cover"}} width="100%" height="256px" src={src}></img>
                        </Col>
                    )}    
                </Row>

            </Modal>
        </Card>
    )
}

export default Gallerywithurl
