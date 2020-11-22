//菜單更新
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import REButton from 'react-bootstrap/Button';
import {
    Modal
} from 'react-bootstrap';
import $ from 'jquery';
import back from '../../images/back.svg';
import menu from '../../images/menu.jpg';
import ad from '../../images/remove-ads.png';
import '../Content.css'
import {
    toast
} from 'react-toastify'
import creatHistory from 'history/createHashHistory'
const Config = require("../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
class EditMenu extends Component {
    constructor(props) {
        super(props);
        var data = this.props.location.state;
        if (data != undefined) {
            var {
                FoodID,
                FoodName,
                Price,
                ChoiceID,
                ChoiceName,
                ChoiceTypeName_List,
                ChoiceTypeList,
                FoodType_List
            } = data;
        }
        this.state = {
            file: '',
            imagePreviewUrl: '',
            value: '',
            Price: Price,
            StoreID: "S_725d0fd9-4875-4762-8bc8-43404d2d5775",
            FoodID: FoodID,
            FoodName: FoodName,
            ChoiceID: ChoiceID,
            ChoiceName: ChoiceName,
            ChoiceTypeName_List: ChoiceTypeName_List,
            FoodType_List: FoodType_List,
            MenuInfo: '',
            ChoiceTypeList: ChoiceTypeList
        };

        this.handleChange_Name = this.handleChange_Name.bind(this);
        this.handleChange_Price = this.handleChange_Price.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.UpdateFood = this.UpdateFood.bind(this);
        this.clearString = this.clearString.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    componentDidMount() {
        toast.configure()
        document.title = '餐點設定';
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        var FoodTypeName_List = []
        // console.log("MenuInfo:", MenuInfo)
        this.state.MenuInfo = MenuInfo
        // 將資料存到sessionStorage
        var FoodType = JSON.parse(MenuInfo)["FoodType"]
        console.log(FoodType)
        for (var FoodType_key in FoodType) {
            console.log("FoodType_key", FoodType_key)
            FoodTypeName_List.push(FoodType_key)
        }
        // sessionStorage.setItem('FoodTypeName_List', FoodTypeName_List)

        if (this.state.FoodName != undefined) {
            // console.log(FoodTypeName_List)
            sessionStorage.setItem('FoodName', this.state.FoodName);
            sessionStorage.setItem('Price', this.state.Price);
            sessionStorage.setItem('FoodID', this.state.FoodID)
            sessionStorage.setItem('ChoiceTypeList', this.state.ChoiceTypeList)
        }
        var FoodName = sessionStorage.getItem('FoodName');
        var Price = sessionStorage.getItem('Price');
        console.log("FoodName:", FoodName)
        $('#inputName').val(FoodName);
        $('#inputProjectLeader').val(Price);
        this.state.FoodName = FoodName
        this.state.Price = Price
    }
    handleClose() {
        this.setState({
            show: false
        })
    }
    handleShow() {
        this.setState({
            show: true
        })
    }
    //上一頁
    backgo() {
        // <Link to="/" />
        const history = creatHistory();
        history.goBack();
        // history.go(-1)
    }
    // input值改變會執行
    handleChange_Name(event) {
        this.setState({ FoodName: event.target.value });
    }
    handleChange_Price(event) {
        this.setState({ Price: event.target.value });
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    //刪除餐點
    DeleteFood(event) {
        const id = event.target.id;
        console.log(id);
        let StoreID = this.state.StoreID
        let FoodID = id
        var settings = {
            "url": API_Url + ':' + API_Port + "/DelFood",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodID": FoodID
            }),
        };
        $.ajax(settings).done(function (response) {
            alert("刪除成功")
            console.log(response);
        }.bind(this))
        event.preventDefault();
    }
    clearString(s) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;'\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    }
    // Submit會執行
    handleSubmit(event) {
        event.preventDefault();
        var FoodID = sessionStorage.getItem('FoodID')
        var FoodTypeID = sessionStorage.getItem('FoodTypeName_List');
        var FoodName = this.state.FoodName
        var Price = this.state.Price
        var ChoiceTypeList = sessionStorage.getItem('ChoiceTypeList');
        ChoiceTypeList = this.clearString(ChoiceTypeList)
        console.log("ChoiceTypeList:", ChoiceTypeList)
        FoodTypeID = FoodTypeID.split(',')
        ChoiceTypeList = ChoiceTypeList.split(',')

        // FoodTypeID.forEach(item => {
        //     if (item) {
        //         FoodTypeID.push(item)
        //     }
        // })
        this.UpdateFood(FoodID, FoodTypeID, FoodName, Price, ChoiceTypeList);

    }
    // 更新餐點
    UpdateFood(FoodID, FoodTypeID, FoodName, Price, ChoiceTypeList) {
        // let StoteID = this.props.match.params.StoteID;
        let StoreID = this.state.StoreID
        let ImgSrc = "jpg"
        let SoldOut = "0"
        let OffShelf = "0"
        var settings = {
            "url": API_Url + ':' + API_Port + "/UpdateFood",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodID": FoodID,
                "FoodTypeID": FoodTypeID,
                "FoodName": FoodName,
                "ImgSrc": ImgSrc,
                "Price": Price,
                "ChoiceTypeList": JSON.stringify(ChoiceTypeList),
                "SoldOut": SoldOut,
                "OffShelf": OffShelf
            }),

        };
        $.ajax(settings).done(function (response) {
            toast.success('編輯成功', {
                position: toast.POSITION.TOP_CENTER
            })
            console.log(response);
            // sessionStorage.clear()
        }.bind(this))
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">請選擇圖片即可預覽圖片</div>);
        }
        //要傳的值
        var data = {
            FoodID: this.state.FoodID,
            FoodName: this.state.FoodName,
            Price: this.state.Price,
            ChoiceID: this.state.ChoiceID,
            ChoiceName: this.state.ChoiceName,
            ChoiceTypeName_List: this.state.ChoiceTypeName_List,
            FoodType_List: this.state.FoodType_List
        }
        var path_EditChoice = {
            pathname: '/EditChoice',
            state: data,
        }
        var path_EditRadio = {
            pathname: '/EditRadio',
            state: data,
        }
        var path_EditType = {
            pathname: '/EditType',
            state: data,
        }
        return (
            <div className="contact-section">
                <header className="header" style={{ height: '100%' }}>
                    <button className="back_btn" onClick={this.backgo}>
                        <img style={{ height: '60%' }} src={back} alt="back" />
                    </button>
                    <noscript>
                        <div className="back">『您的瀏覽器不支援JavaScript功能，若網頁功能無法正常使用時，請開啟瀏覽器JavaScript狀態』</div>
                    </noscript>
                    <button className="menu_btn">
                        <img style={{ height: '50%', width: '50%' }} src={menu} alt="menu" />
                    </button>

                    <div style={{ backgroundColor: '#333333', height: '80%' }}>
                        <div className="headerName" id="headerName">
                            餐點設定
						</div>
                    </div>
                </header>
                {/* <div className="col-md-6"> */}
                <div>
                    <div className="card card-primary">
                        {/* <div className="card-header">
                            <h3 className="card-title">General</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                    <i className="fas fa-minus"></i></button>
                            </div>
                        </div> */}
                        <div className="card-body ">
                            <form>
                                <div className="row" Style="width:100%;height:auto">
                                    {/* <img id="img" src={ad} Style="width:50%;margin:0 1em 1em 0;" class="img-thumbnail rounded float-left" alt="..."></img> */}
                                    <div Style="width:50%;margin:0 1em 1em 0;" className="img-thumbnail rounded float-left imgPreview">
                                        {$imagePreview}
                                    </div>
                                    <input onChange={(e) => this.handleImageChange(e)} type="file" accept="image/*" Style="float:right;width:45%;height:45%;" class="btn btn-primary" Style="font-size:18px;min-width:-webkit-fill-available"></input>
                                    {/* <input type="file" onChange={this.handleUpload} /> */}
                                </div>
                                <div className="form-group">
                                    <label for="inputName">名稱</label>
                                    <input onChange={this.handleChange_Name} type="text" id="inputName" className="form-control" placeholder="餐點名稱"></input>
                                </div>

                                <div className="form-group">
                                    <Link to={path_EditChoice}><button type="button" class="btn btn-default btn-block btn-flat">單選（必選）項目</button></Link>
                                </div>
                                <div className="form-group">
                                    <Link to={path_EditRadio}><button type="button" class="btn btn-default btn-block btn-flat">複選項目</button></Link>
                                </div>
                                <div className="form-group">
                                    {/* <label for="inputClientCompany">Client Company</label>
                                <input type="text" id="inputClientCompany" className="form-control" value="Deveint Inc"></input> */}
                                    <Link to={path_EditType}><button type="button" class="btn btn-default btn-block btn-flat">分類項目</button></Link>
                                </div>
                                <div className="form-group">
                                    <label for="inputProjectLeader">價格</label>
                                    <input onChange={this.handleChange_Price} type="text" id="inputProjectLeader" className="form-control" placeholder="餐點價錢"></input>
                                </div>
                                <button id={this.state.FoodID} onClick={(e) => this.DeleteFood(e)} value="刪除餐點" className="btn btn-block btn-danger btn-lg">刪除餐點</button>
                                < input onClick={(e) => this.handleSubmit(e)} type="submit" className="btn btn-block btn-success btn-lg" value="確認編輯"></input>
                            </form>

                        </div>


                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><i class="fas fa-exclamation-triangle text-danger"></i>通知</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >你確定要刪除類別嗎？</Modal.Body>
                    <Modal.Footer>
                        <REButton variant="secondary" onClick={this.handleClose}>
                            Close
                        </REButton>
                        <REButton variant="danger" onClick={this.DeleteFood}>
                            Delete
                        </REButton>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default EditMenu;
