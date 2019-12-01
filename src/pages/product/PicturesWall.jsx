import React, { Component } from 'react'
import { Upload, Icon, Modal } from 'antd';

import { reqRemoveImg } from '../../api/index'
import propTypes from 'prop-types'
import { Base_Url } from '../../utils/constants'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    static propTypes = {
        imgs: propTypes.array
    }


    state = {
        //标识是否显示大图预览
        previewVisible: false,
        //大图的url或者base64
        previewImage: '',
        //页面上所有显示的图片的信息的数组
        fileList: [
            //每个图片文件信息对象，file对象
            // {
            //     uid: '-1',//唯一标识
            //     name: 'image.png',//图片名称
            //     status: 'done',//状态有：uploading/done/error/remove
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',//图片地址
            // }
        ],
    };


    handleCancel = () => this.setState({ previewVisible: false });

    //打图预览回调函数： 点击图片时候出发的回调函数，file为所点击图片的file对象
    handlePreview = async file => {
        /* 
         file.url：判断file中是否是否有url，没有的话进行base64的转换
         file.preview：如果file中没有url，则判断fil e.preview是否有对这张图片之前把坪村的base64地址，
         如果有，就不会执行base64的转换
        */
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            //更新previewImage的地址
            previewImage: file.url || file.preview,
            //将大图预览的标识变为true、，显示大图
            previewVisible: true,
        });
    };

    /*
     file状态发生改变的回调函数，传递的为最新的fileList
     file：为当前操作的file
    */
    handleChange = async ({ file, fileList }) => {
        if (file.status === 'done') {
            /* 
                file和fileList[fileList.length - 1]虽然数据相同，但是对应的是不同的两个对象 
                只有更新fileList时才能跟新页面
            */
            file = fileList[fileList.length - 1]
            //fileList中的file需要name和url属性
            const { name, url } = file.response.data
            file.name = name
            file.url = url
        } else if (file.status === 'removed') {
            //实现删除图片
            await reqRemoveImg(file.name)
        }
        this.setState({ fileList })
    };

    //获取一个含有图片名字的数组，等待父级的调用
    getImgs = () => this.state.fileList.map(item => item.name)

    UNSAFE_componentWillMount() {
        const imgs = this.props.imgs
        if (imgs && imgs.length > 0) {
            const fileList = imgs.map((item, index) => {
                return {
                    uid: -index,//唯一标识
                    name: item,//图片名称
                    status: 'done',//状态有：uploading/done/error/remove
                    url: Base_Url + imgs//图片地址
                }
            })
            this.setState({ fileList })
        }
    }


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div>
                <Upload
                    //上传的地址
                    action="/manage/img/upload"
                    //发到后台的文件参数名，接口文档定义的
                    name="image"
                    //上传列表的样式，支持三种基本样式 text, picture 和 picture-card
                    listType="picture-card"
                    //已上传的所有图片文件信息所对应的数组
                    fileList={fileList}
                    //大图预览：点击图片时的回调函数
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {/* 显示大图的对话框，利用previewVisible控制它的现实和隐藏 */}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

