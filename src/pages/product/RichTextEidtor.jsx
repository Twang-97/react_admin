import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import debounce from 'lodash.debounce'
import propTypes from 'prop-types'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEidtor extends Component {
    static propTypes = {
        detail: propTypes.string
    }
    state = {
        //富文本框中显示的内容
        editorState: EditorState.createEmpty(),
    }

    onEditorStateChange = debounce((editorState) => {
        this.setState({
            editorState,
        });
    }, 500)

    getDetail = () => {
        // 返回输入数据对应的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/manage/img/upload');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                /*  
                    需要的格式地址 {status:0,data:{name:'',url:''}}
                    
                */
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    /* 
                        如果不相同，改为
                        const url=response.data.url
                        response.data.link=url
                    */
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    UNSAFE_componentWillMount() {
        //获取update的detail，在点击修改时，可以显示detail内容
        const detail = this.props.detail
        if (detail) {
            //根据detail生成editorState
            const contentBlock = htmlToDraft(detail);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            console.log(editorState)
            //更新状态
            this.setState({ editorState })
        }
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    //富文本框样式
                    editorStyle={{ height: 200, border: '1px solid #000', paddingLeft: 10, overflow: 'auto' }}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
            </div>
        );
    }
}