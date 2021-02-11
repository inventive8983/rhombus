import { Button, Card, Input, message, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import Flex from 'components/shared-components/Flex';
import React, {useEffect, useState} from 'react'
import ReactQuill from 'react-quill'; // ES6
import blogAPI from 'services/blogs';



function Blog(props) {

    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, false] }, 'color'],
          ['bold', 'italic', 'underline', 'strike'],
          ['image', 'code'],
        ],
      }

    const [title, setTitle] = useState('Set blog title here...')
    const [cover, setCover] = useState('')
    const [content, setContent] = useState('')

    const [urlBox, showUrlBox] = useState(false)

    useEffect(() => {
        blogAPI.viewBlog({id: props.match.params.id}).then(data => {
            setTitle(data.title)
            setCover(data.cover)
            if(data.content) setContent(data.content)
        }).catch(err => {
            message.error("Cannot load data")
        })
    }, [])


    const updateBlog = () => {

        blogAPI.updateBlog({id:  props.match.params.id}, {
            title, cover, content
        }).then(res => {
            message.success("Saved successfully")
        }).catch(err => {
            console.log(err);
            message.error("Some error occured")
        })

    }

    return (
        <div className="container">
            <Flex className="p-3" alignItems="center" justifyContent="between">
			<Typography.Title strong>Update Blog</Typography.Title>
                <div className="ml-2">
                    {(title !== '' && cover !== '' && content !== '') && <Button type="primary" onClick={() => {updateBlog()}} block>Save</Button>}
                </div>
            </Flex>
            <Card className="p-4">
                <Typography.Title className="mb-5" editable={{onChange: (str) => {setTitle(str)}}} level={1}>{title}</Typography.Title>
                <div className="position-relative w-100 bg-dark rounded overflow-hidden">
                    <img src={cover} className="w-100 rounded" style={{height:"400px", objectFit: "cover"}}></img>
                    <Button onClick={() => {showUrlBox(!urlBox)}} className="position-absolute" style={{top:"16px", right: "16px"}} type="primary">Edit Url</Button>
                </div>
                {urlBox && <Input className="my-4" onPressEnter={() => {showUrlBox(false)}} value={cover} placeholder="Enter Url Here" onChange={(e) => {setCover(e.target.value)}}></Input>}
                <div className="my-4">
                    <ReactQuill value={content} theme="snow" modules={modules} onChange={(value) => {setContent(value)}} />
                </div>
            </Card>
        </div>
    )
}

export default Blog
