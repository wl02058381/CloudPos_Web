//菜單更新
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import back from '../../images/back.svg';
import menu from '../../images/menu.jpg';
import ad from '../../images/remove-ads.png';
import '../Content.css'
import { toast } from 'react-toastify'
import creatHistory from 'history/createHashHistory';
import style from 'react-toastify/dist/ReactToastify.css'
const Config = require("../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
class AddMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            value: '',
            StoreID: "S_725d0fd9-4875-4762-8bc8-43404d2d5775",
            FoodName: '',
            Price: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange_Name = this.handleChange_Name.bind(this);
        this.handleChange_Price = this.handleChange_Price.bind(this);
        this.AddFood = this.AddFood.bind(this);
    }
    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    componentDidMount() {
        toast.configure()
        document.title = '菜單新增';
        var FoodName = sessionStorage.getItem('FoodName');
        var Price = sessionStorage.getItem('Price');
        console.log("FoodName:", FoodName)
        $('#inputName').val(FoodName);
        $('#inputProjectLeader').val(Price);
    }
    handleChange_Name(event) {
        this.setState({ FoodName: event.target.value });
    }
    handleChange_Price(event) {
        this.setState({ Price: event.target.value });
    }
    handleSubmit(event) {
        console.log('handle uploading-', this.state.file);
        var FoodTypeID = sessionStorage.getItem('FoodTypeName_List');
        var FoodName = sessionStorage.getItem('FoodName');
        var Price = sessionStorage.getItem('Price');
        // alert('A name was submitted: ' + FoodName + "     Price:" + Price);
        var ChoiceTypeList = sessionStorage.getItem('ChoiceTypeList');
        FoodTypeID = FoodTypeID.split(',')
        ChoiceTypeList = ChoiceTypeList.split(',')
        // ChoiceTypeList = ChoiceTypeList.replace(/\\/,'')
        console.log("ChoiceTypeList:", ChoiceTypeList)
        event.preventDefault();
        this.AddFood(FoodTypeID, FoodName, Price, ChoiceTypeList);
        
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
    // 新增餐點
    AddFood(FoodTypeID, FoodName, Price, ChoiceTypeList) {
        // let StoteID = this.props.match.params.StoteID;
        let StoreID = this.state.StoreID
        // let FoodTypeID = FoodTypeID
        // let FoodName = FoodName
        let ImgExtension = "jpg"
        // let Price = Price
        // ChoiceTypeList = ChoiceTypeList.repl
        // console.log("豪哥", JSON.stringify(ChoiceTypeList))
        // console.log("冠冠", JSON.stringify(FoodName))
        let SoldOut = "0"
        let OffShelf = "0"
        var settings = {
            "url": API_Url + ':' + API_Port + "/AddFood",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodTypeID": FoodTypeID,
                "FoodName": FoodName,
                "ImgExtension": ImgExtension,
                "Price": Price,
                "ChoiceTypeList": ChoiceTypeList,
                "SoldOut": SoldOut,
                "OffShelf": OffShelf
            }),
        };
        $.ajax(settings).done(function (response) {
            // alert("新增成功")
            toast.success('新增成功',{position:toast.POSITION.TOP_CENTER})
            console.log(response);
            const history = creatHistory();
            history.goBack();
            // sessionStorage.clear()
        }.bind(this))
    }
    handleChange_Name(event) {
        // this.setState({ FoodName: event.target.value });
        sessionStorage.setItem('FoodName', event.target.value);
    }
    handleChange_Price(event) {
        // this.setState({ Price: event.target.value });
        sessionStorage.setItem('Price', event.target.value);
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">請選擇圖片即可預覽圖片</div>);
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
                            菜單新增
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
                            <form onSubmit={(e) => this.handleSubmit(e)}>
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
                                    <Link to="/AddChoice"><button type="button" class="btn btn-default btn-block btn-flat">單選（必選）項目</button></Link>
                                </div>
                                <div className="form-group">
                                    <Link to="/AddRadio"><button type="button" class="btn btn-default btn-block btn-flat">複選項目</button></Link>
                                </div>
                                <div className="form-group">
                                    {/* <label for="inputClientCompany">Client Company</label>
                                <input type="text" id="inputClientCompany" className="form-control" value="Deveint Inc"></input> */}
                                    <Link to="/AddType"><button type="button" class="btn btn-default btn-block btn-flat">分類項目</button></Link>
                                </div>
                                <div className="form-group">
                                    <label for="inputProjectLeader">價格</label>
                                    <input onChange={this.handleChange_Price} type="text" id="inputProjectLeader" className="form-control" placeholder="餐點價錢"></input>
                                </div>
                                < input type="submit" className="btn btn-block btn-success btn-lg" value="確認上傳" ></input>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default AddMenu;
// function changeAddMenu() {
//   // ShowMenu()
//   $("#headerName").text("菜單新增");
//   ReactDOM.render(<></>,
//     document.getElementById('searchbar'))
//   ReactDOM.render(<AddMenu />,
//     document.getElementById('Content')
//   );
// }
