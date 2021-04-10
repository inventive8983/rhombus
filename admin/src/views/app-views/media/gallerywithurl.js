import { Button, Card, Image, Input, message, Modal, Row, Col, Empty } from 'antd'
import Axios from 'axios';
import { API_BASE_URL } from 'constants/ApiConstant';
import React, {useEffect, useState} from 'react'
import { Collection } from 'react-virtualized';
import PicturesWall from './imageUpload';

function Gallerywithurl() {
    
    const [collections, setCollections] = useState([])
    const [files, setFiles] = useState([])

    useEffect(() => {
        Axios.get(`${API_BASE_URL}/drive/`).then(files => {
            
            const data = files.data.data
            console.log(data);
            setFiles(data)
            var c = []

            data.forEach(element => {
                if(!c.includes(element.category)) {
                    c = [element.category, ...c]
                }
            });
            setCollections(c)



        }).catch(err => {
            console.log(err);
            message.error("Some error occured.")
        })
    }, [])

    const addCollection = () => {
        var name = prompt("Collection Name")
        setCollections([name, ...collections])
    }

    return (
        <>
            {collections.map((collection, index) =>
                <Card title={collection} key={index}>
                    <PicturesWall type="drive" fileList={files} collection={collection}></PicturesWall>
                </Card>
            )}

            <Button type="dashed" onClick={() => addCollection()}>Add Collection</Button>
        </>
    )
}

export default Gallerywithurl
