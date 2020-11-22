//菜單更新
import React, { Component } from 'react';
import { Container, Row, Col, Form, Card, FormControl } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import back from '../../../images/back.svg';
import menu from '../../../images/menu.jpg';
import creatHistory from 'history/createHashHistory';
import Accordion from '@material-ui/core/Accordion';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { toast } from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { positions } from '@material-ui/system';

import '../../Content.css'
const Config = require("../../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
class AddType extends Component {
    constructor(props) {
        super(props);
        this.type = ""
        var data = this.props.location.state;
        if (data != undefined) {
            var {
                FoodID,
                FoodName,
                Price,
                ChoiceID,
                ChoiceName,
                ChoiceTypeName_List,
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
            CardsList: [],
            AddCard: null,
            check: [],
            FoodTypeName_List: [],
            FoodTypeName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.AddTypeBTN = this.AddTypeBTN.bind(this);
        this.AddTypeAPI = this.AddTypeAPI.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.ShowSetMenu = this.ShowSetMenu.bind(this);
        this.DeleteType = this.DeleteType.bind(this);
    }
    backgo() {
        // <Link to="/" />
        const history = creatHistory();
        history.goBack();
        // history.go(-1)
    }
    componentDidMount() {
        toast.configure()
        document.title = '分類項目';
        this.type = "checkbox"
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        this.state.MenuInfo = JSON.parse(MenuInfo);
        console.log("MenuInfo:", JSON.parse(MenuInfo))
        // 取得FoodTypeName_List 更新按鈕資訊
        var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List');
        console.log("FoodTypeName_List", FoodTypeName_List)
        if (FoodTypeName_List == null) {
            FoodTypeName_List = []
        } else {
            FoodTypeName_List = FoodTypeName_List.split(',')
        }
        this.setState({
            FoodTypeName_List: FoodTypeName_List
        }, function () {
            this.GetFoodTypeName()
        })

    }
    handleChange(event) {
        var FoodTypeName_List = this.state.FoodTypeName_List
        // ChoiceTypeList = ChoiceTypeList.split(',')
        console.log(this.state.FoodTypeName_List)
        console.log(typeof (this.state.FoodTypeName_List))
        console.log(event.target.checked)
        // 如果方塊被選擇
        if (event.target.checked == true) {
            FoodTypeName_List.push(event.target.id)
        } else if (event.target.checked == false) //如果方塊被取消掉
        {
            // 把被取消的元素從陣列移除
            FoodTypeName_List = FoodTypeName_List.filter(function (item) {
                return item != event.target.id
            })
        }
        this.setState({
            FoodTypeName_List: FoodTypeName_List
        }, function () {
            console.log("FoodTypeName_List:", this.state.FoodTypeName_List)
            sessionStorage.setItem('FoodTypeName_List', FoodTypeName_List);
        })
    };
    GetFoodTypeName() {
        var CardsList = [];
        // var FoodTypeName_List = this.state.FoodTypeName_List;
        var FoodType = this.state.MenuInfo["FoodType"]
        console.log("FoodType:", FoodType)
        for (var FoodType_key in FoodType) {
            if (this.state.FoodTypeName_List.includes(FoodType_key)) {
                CardsList.push(<Card>
                    <ListItem>
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={
                                <Checkbox
                                    id={FoodType_key}
                                    defaultChecked //預設被選
                                    onChange={this.handleChange}
                                    // color="default"
                                    indeterminate
                                />}
                            label={FoodType[FoodType_key]["FoodTypeName"]}
                        />
                        <IconButton aria-label="Edit">
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<EditIcon />}
                            >
                                Edit
                                </Button>
                        </IconButton>
                        <IconButton aria-label="delete">
                            <Button
                                onClick={this.DeleteType}
                                value={FoodType_key}
                                variant="contained"
                                color="primary"
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                                </Button>
                        </IconButton>
                    </ListItem>
                </Card>)
            } else {
                CardsList.push(
                    <Card>
                        <ListItem>
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={
                                    <Checkbox
                                        id={FoodType_key}
                                        onChange={this.handleChange}
                                        // color="default"
                                        indeterminate
                                    />}
                                label={FoodType[FoodType_key]["FoodTypeName"]}
                            />
                            <IconButton aria-label="Edit">
                                <Button
                                    
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            </IconButton>
                            <IconButton aria-label="delete">
                                <Button
                                    value={FoodType_key}
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.DeleteType}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </IconButton>
                        </ListItem>
                    </Card>)
            }
        }
        this.setState({ CardsList: CardsList })
    }
    handleTextChange(event) {
        this.setState({ FoodTypeName: event.target.value })
    }
    // 渲染新增類別的卡片
    AddTypeBTN() {
        var AddCard = [];
        AddCard.push(<Card>
            <ListItem>
                <ListItemAvatar>
                    <Checkbox
                        id='add'
                        defaultChecked  //預設被選
                        // color='primary'
                        indeterminate
                    />
                </ListItemAvatar>
                <TextField onChange={this.handleTextChange} id="outlined-basic" label="類別名稱" variant="outlined" />
                <div style={{ marginLeft: '12px' }}></div>
                <Button
                    variant="contained"
                    color="default"
                    onClick={this.AddTypeAPI}
                    startIcon={<CloudUploadIcon />}
                >
                    確認</Button></ListItem>
        </Card>)
        this.setState({ AddCard: AddCard })
    }
    // Post新增類別的API
    AddTypeAPI() {
        let StoreID = this.state.StoreID;
        let FoodTypeName = this.state.FoodTypeName;
        var settings = {
            "url": API_Url + ':' + API_Port + "/AddFoodType",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodTypeName": FoodTypeName
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
            toast("成功新增類別");
        }.bind(this))
    }
    ShowSetMenu() {
        console.log("Post", API_Url + ':' + API_Port + "/ShowSetMenu")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "StoreID": "S_725d0fd9-4875-4762-8bc8-43404d2d5775" });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(API_Url + ':' + API_Port + "/ShowSetMenu", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                var MenuInfo = JSON.parse(result)
                console.log(MenuInfo)
                sessionStorage.setItem('MenuInfo', JSON.stringify(MenuInfo));
                this.setState({ MenuInfo: MenuInfo })
                window.location.reload()
                event.preventDefault();
            }.bind(this))
            .catch(error => console.log('error', error));
    }
    DeleteType(event){
        let StoreID = this.state.StoreID;
        let FoodTypeID = event.target.value;
        var settings = {
            "url": API_Url + ':' + API_Port + "/DelFoodType",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodTypeID": FoodTypeID
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
            toast("成功刪除類別");
        }.bind(this))
    }
    render() {

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
                            分類項目
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
                            <form onSubmit={this.handleSubmit}>
                                {/* <div className="input-group input-group-sm">
                                    <div className="searchbar" id="searchbar" />
                                    <div class="d-flex justify-content-center h-100">
                                        <div class="Searchbar">
                                            <input class="search_input" type="text" name="" placeholder="Search..."></input>
                                            <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                                        </div>
                                    </div>
                                    
                                    <div className="input-group-append" >
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button onClick={this.handleOnClick} class="btn btn-app" style={{ position: "absolute" }}>
                                            <i className="fas fa-edit"></i> Add
                                </button>
                                    </div>
                                </div> */}
                                <div className="form-group">
                                    <div style={{ marginTop: '16px' }}></div>
                                    <List>
                                        {this.state.CardsList}
                                        {this.state.AddCard}
                                        <Card>
                                            <ListItem>
                                                <IconButton color="primary" aria-label="add to shopping cart" onClick={this.AddTypeBTN}>
                                                    <AddShoppingCartIcon />新增類別
                                        </IconButton>
                                            </ListItem>
                                        </Card>

                                    </List>
                                </div>
                                {/* < input type="submit" className="btn btn-block btn-success btn-lg" value="確認上傳" ></input> */}
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default AddType;
// function changeAddMenu() {
//   // ShowMenu()
//   $("#headerName").text("菜單新增");
//   ReactDOM.render(<></>,
//     document.getElementById('searchbar'))
//   ReactDOM.render(<AddMenu />,
//     document.getElementById('Content')
//   );
// }
