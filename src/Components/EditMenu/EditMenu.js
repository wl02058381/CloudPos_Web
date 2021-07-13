//菜單更新
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import REButton from 'react-bootstrap/Button';
import {
    Modal
} from 'react-bootstrap';
import $ from 'jquery';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
import ad from '../../images/remove-ads.png';
import '../Content.css'
import {
    toast
} from 'react-toastify'
import creatHistory from 'history/createHashHistory'
import { withRouter } from "react-router";

const Config = require("../../config")
const API_Url = Config.Post_IP.API_IP;
// const API_Port = Config.Post_IP.API_Port;
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
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
            StoreID: "",
            FoodID: FoodID,
            FoodName: FoodName,
            ChoiceID: ChoiceID,
            ChoiceName: ChoiceName,
            ChoiceTypeName_List: ChoiceTypeName_List,
            FoodType_List: FoodType_List,
            MenuInfo: '',
            ChoiceTypeList: ChoiceTypeList,
            Delshow: ''
        };

        this.handleChange_Name = this.handleChange_Name.bind(this);
        this.handleChange_Price = this.handleChange_Price.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.UpdateFood = this.UpdateFood.bind(this);
        this.clearString = this.clearString.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.DeleteFood = this.DeleteFood.bind(this);
    }
    componentDidMount() {
        toast.configure()
        document.title = '餐點設定';
        //拿到名稱和價錢改變後的值
        var StoreID = getParameterByName("s");
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        var FoodTypeName_List = []
        // 將資料存到sessionStorage
        var FoodType = JSON.parse(MenuInfo)["FoodType"]
        console.log(FoodType)
        for (var FoodType_key in FoodType) {
            console.log("FoodType_key", FoodType_key)
            FoodTypeName_List.push(FoodType_key)
        }
        if (sessionStorage.getItem("FoodID") != null) {
            var FoodID = sessionStorage.getItem("FoodID")
        } else {
            var FoodID = this.state.FoodID
        }

        if (this.state.FoodName != undefined & sessionStorage.getItem('NP_Edit') == null) {
            // console.log(FoodTypeName_List)
            sessionStorage.setItem("StoreID", this.state.StoreID)
            sessionStorage.setItem('FoodName', this.state.FoodName);
            sessionStorage.setItem('Price', this.state.Price);
            sessionStorage.setItem('FoodID', this.state.FoodID)
            sessionStorage.setItem('ChoiceTypeList', this.state.ChoiceTypeList)
        }
        var FoodName = sessionStorage.getItem('FoodName');
        var Price = sessionStorage.getItem('Price');
        if (sessionStorage.getItem('ImgSrc') == null) {
            var ImgSrc = `${Config.Post_IP.ImgURL}${StoreID}/${FoodID}`
            sessionStorage.setItem("ImgSrc", ImgSrc)
        }
        if (sessionStorage.getItem('file') != null) {
            // let reader = new FileReader();
            // var file = sessionStorage.getItem('file')
            // this.setState({ file: file })
            // reader.readAsDataURL(file)            
            // reader.readAsText(file);
        }
        // this.setState({

        // });
        console.log("FoodName:", FoodName)
        $('#inputName').val(FoodName);
        $('#inputProjectLeader').val(Price);
        // this.state.FoodName = FoodName
        // this.state.Price = Price
        this.setState({
            MenuInfo: MenuInfo,
            FoodName: FoodName,
            Price: Price,
            imagePreviewUrl: ImgSrc,
            StoreID: StoreID
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
        sessionStorage.setItem('NP_Edit', 'true');
        sessionStorage.setItem('FoodName', event.target.value);
        this.setState({ FoodName: event.target.value });
    }
    handleChange_Price(event) {
        var price = event.target.value.replace(/[^0-9]/g, '')
        //  console.log(Phone)
        $("#inputProjectLeader").val($("#inputProjectLeader").val().replace(/[^0-9]/g, ''))
        sessionStorage.setItem('NP_Edit', 'true');
        sessionStorage.setItem('Price', event.target.value);
        this.setState({ Price: price });
    }
    // 選擇檔案
    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            sessionStorage.setItem("ImgSrc", reader.result)
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
    //刪除餐點
    DeleteFood(event) {
        // const id = event.target.id;
        // console.log(id);
        // let StoreID = sessionStorage.getItem("StoreID")
        var StoreID = getParameterByName("s");
        let FoodID = sessionStorage.getItem("FoodID")
        var settings = {
            "url": API_Url+ "/DelFood",
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
            toast.success('刪除成功', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            this.setState({ DelShow: false }, function () {
                const history = creatHistory();
                history.goBack();
            })
            // console.log(response);
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
        //預設值
        var FoodEdit = sessionStorage.getItem('FoodEdit')
        console.log(FoodEdit)
        if (FoodEdit == null) {
            console.log("嗨")
            var Food = JSON.parse(this.state.MenuInfo)["Food"]
            console.log(Food)
            var FoodID = sessionStorage.getItem("FoodID")
            for (var Food_key in Food) {
                if (Food_key == FoodID) {
                    console.log("aaaa:", Food_key)
                    var FoodTypeID = Food[Food_key]["FoodTypeID"]
                    FoodTypeID = eval(FoodTypeID)
                    // FoodTypeID = FoodTypeID.split(',')
                }
            }
        }
        else {
            var FoodTypeID = sessionStorage.getItem('FoodTypeName_List');
            if (FoodTypeID == undefined || FoodTypeID == null || FoodTypeID.length == 0 || FoodTypeID[0] == "") {
                toast.error('分類項目未填', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                FoodTypeID = FoodTypeID.split(',')
            }

        }
        var Edit = sessionStorage.getItem('Edit')
        var FoodID = sessionStorage.getItem('FoodID')
        var FoodName = this.state.FoodName
        var Price = this.state.Price
        var ChoiceTypeList = sessionStorage.getItem('ChoiceTypeList');
        console.log("ChoiceTypeList屁屁:", ChoiceTypeList)
        console.log("ChoiceTypeListTypeof:", typeof (ChoiceTypeList))
        console.log("Edit", Edit)
        if (ChoiceTypeList != undefined & Edit == "true" & typeof (ChoiceTypeList) == "string") {
            try {
                ChoiceTypeList = eval(ChoiceTypeList)
            } catch (e) {
                ChoiceTypeList = ChoiceTypeList.split(',')
            }
        } else if (ChoiceTypeList != undefined & Edit == null) {
            ChoiceTypeList = eval(ChoiceTypeList)
            // ChoiceTypeList = ChoiceTypeList.split(',')
        }
        console.log("ChoiceTypeList:", ChoiceTypeList)
        if (ChoiceTypeList == null || eval(ChoiceTypeList).length == 0 || ChoiceTypeList == "[]") {
            var ChoiceTypeList = []
        }
        // ChoiceTypeList = eval(ChoiceTypeList)
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
            "url": API_Url+ "/UpdateFood",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Cache-Control": "no-store"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodID": FoodID,
                "FoodTypeID": FoodTypeID,
                "FoodName": FoodName,
                "ImgSrc": ImgSrc,
                "Price": Price,
                "ChoiceTypeList": ChoiceTypeList,
                "SoldOut": SoldOut,
                "OffShelf": OffShelf
            }),

        };
        $.ajax(settings).done(function (response) {
            toast.success('編輯成功', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            console.log(response["FoodID"]);
            var FoodID = response["FoodID"]
            this.setState({
                FoodID: FoodID
            })
            this.ImageUpload();
            // console.log(response);
            // window.location.reload()
            const history = creatHistory();
            // history.goBack().then(()=>{window.location.reload()});
            this.props.history.push({
                pathname: "/UpdateMenu",
                state: { reloadstate: "1" }
            });
            // window.location.reload();
            // sessionStorage.clear()
        }.bind(this))
    }
    // 上傳圖片
    ImageUpload() {
        var myHeaders = new Headers();
        // let StoreID = this.state.StoreID
        var StoreID = getParameterByName("s");
        let FoodID = this.state.FoodID
        myHeaders.append("image_id", FoodID);
        myHeaders.append("store_id", StoreID);
        var formdata = new FormData();
        formdata.append("image", this.state.file);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch( API_Url+"/ImageUpload", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    handleClose(event) {
        // event.preventDefault();
        this.setState({
            Delshow: false
        })
    }
    handleShow(event) {
        event.preventDefault();
        this.setState({ Delshow: true })
    }
    render() {
        // let { imagePreviewUrl } = this.state;
        let imagePreviewUrl = sessionStorage.getItem("ImgSrc")
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (< img src={imagePreviewUrl} />);
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
                    <Link to="/">
                        <button className="menu_btn">
                            <img style={{ height: '48px', width: '48px' }} src={menu} alt="menu" />
                        </button>
                    </Link>
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
                                    < div Style="width:60%;margin:0 1em 1em 0;"
                                        className="img-thumbnail rounded float-left imgPreview" >
                                        {$imagePreview}
                                    </div>

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
                                    <Link to={path_EditType}><button type="button" class="btn btn-default btn-block btn-flat">*分類項目</button></Link>
                                </div>
                                <div className="form-group">
                                    <label for="inputProjectLeader">價格</label>
                                    <input onChange={this.handleChange_Price} type="text" id="inputProjectLeader" className="form-control" placeholder="餐點價錢"></input>
                                </div>

                                <input onChange={(e) => this.handleImageChange(e)} type="file" accept="image/*" Style="float:right;width:45%;height:45%;" class="btn btn-primary" Style="font-size:18px;min-width:-webkit-fill-available;margin-top: 18px;margin-bottom: 18px;"></input>
                                <button id={this.state.FoodID} onClick={(e) => this.handleShow(e)} value="刪除餐點" className="btn btn-block btn-danger btn-lg">刪除餐點</button>
                                < input onClick={(e) => this.handleSubmit(e)} type="submit" className="btn btn-block btn-success btn-lg" value="確認編輯"></input>
                            </form>

                        </div>


                    </div>
                </div>
                <Modal show={this.state.Delshow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><i class="fas fa-exclamation-triangle text-danger"></i>通知</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >你確定要刪除餐點嗎？</Modal.Body>
                    <Modal.Footer>
                        <REButton variant="secondary" onClick={this.handleClose}>
                            關閉
                        </REButton>
                        <REButton variant="danger" onClick={this.DeleteFood}>
                            刪除
                        </REButton>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default withRouter(EditMenu);
