//菜單更新
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Carousel, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.css'
import $ from 'jquery';
import creatHistory from 'history/createHashHistory';
import back from '../../images/back.svg';
import menu from '../../images/menu.jpg';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Config = require("../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
class UpdateMenu extends Component {

    constructor(props) {
        super(props);
        this.ShowSetMenu = this.ShowSetMenu.bind(this)
        this.FoodType = this.FoodType.bind(this)
        this.FoodIDList = this.FoodIDList.bind(this)
        this.UpdateFood_SoldOut = this.UpdateFood_SoldOut.bind(this)
        this.UpdateFood_Offshelf = this.UpdateFood_Offshelf.bind(this)
        // this.ChoiceType = this.ChoiceType.bind(this)
        this.ChoiceTypeList = this.ChoiceTypeList.bind(this)
        this.UpdateFood_SoldIn = this.UpdateFood_SoldIn.bind(this)
        this.UpdateFood_Onshelf = this.UpdateFood_Onshelf.bind(this)
        this.state = {
            StoreID: "S_725d0fd9-4875-4762-8bc8-43404d2d5775",
            MenuInfo: null,
            Tabs: null,
            FoodType: {},
            FoodType_List: [],
            Food: {},
            ChoiceType: {},
            ChoiceTypeName_List: [],
            ChoiceList_List: [],
            Choice: {},
            ChoiceID: null,
            alert: '',
            SoldOut: ''
        };
    }

    componentDidMount() {
        toast.configure()
        this.ShowSetMenu()
        document.title = '菜單設計';
        if (this.state.MenuInfo == null) {
            // var MenuInfo = sessionStorage.getItem('MenuInfo');
            this.ShowSetMenu()
        } else {
            sessionStorage.setItem('MenuInfo', this.state.MenuInfo);
        }
        sessionStorage.clear();
        // sessionStorage.removeItem('FoodTypeID');
        // sessionStorage.removeItem('ChoiceTypeList');
    }
    //顯示菜單
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
                // this.MenuInfo = MenuInfo
                this.FoodType()
            }.bind(this))
            .catch(error => console.log('error', error));
    }
    handleClick(event) {
        const id = event.target.id;
        console.log(id);
    }
    // 完售
    UpdateFood_SoldOut(event) {
        const id = event.target.id;
        console.log(id);
        // let StoteID = this.props.match.params.StoteID;
        let StoreID = this.state.StoreID
        let FoodID = id
        let SoldOut = "1"
        let OffShelf = "0"
        var settings = {
            "url": API_Url + ':' + API_Port + "/UpdateFoodStatus",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodID": FoodID,
                "SoldOut": SoldOut,
                "OffShelf": OffShelf
            }),
        };
        $.ajax(settings).done(function (response) {
            toast("狀態變更為完售")
            window.location.reload()
            event.preventDefault();
        }.bind(this))
    }
    // 販售中
    UpdateFood_SoldIn(event) {
        const id = event.target.id;
        console.log(id);
        // let StoteID = this.props.match.params.StoteID;
        let StoreID = this.state.StoreID
        let FoodID = id
        let SoldOut = "0"
        let OffShelf = "0"
        var settings = {
            "url": API_Url + ':' + API_Port + "/UpdateFoodStatus",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodID": FoodID,
                "SoldOut": SoldOut,
                "OffShelf": OffShelf
            }),
        };
        $.ajax(settings).done(function (response) {
            toast("狀態變更為販售中")
            window.location.reload()
            event.preventDefault();
        }.bind(this))
    }
    // 下架
    UpdateFood_Offshelf(event) {
        // let StoteID = this.props.match.params.StoteID;
        const id = event.target.id;
        console.log(id);
        let StoreID = this.state.StoreID
        let FoodID = id
        let SoldOut = "0"
        let OffShelf = "1"
        var settings = {
            "url": API_Url + ':' + API_Port + "/UpdateFoodStatus",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodID": FoodID,
                "SoldOut": SoldOut,
                "OffShelf": OffShelf
            }),
        };
        $.ajax(settings).done(function (response) {
            toast("狀態變更為下架")
            window.location.reload()
            event.preventDefault();
        }.bind(this))
    }
    // 上架
    UpdateFood_Onshelf(event) {
        // let StoteID = this.props.match.params.StoteID;
        const id = event.target.id;
        console.log(id);
        let StoreID = this.state.StoreID
        let FoodID = id
        let SoldOut = "0"
        let OffShelf = "0"
        var settings = {
            "url": API_Url + ':' + API_Port + "/UpdateFoodStatus",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "FoodID": FoodID,
                "SoldOut": SoldOut,
                "OffShelf": OffShelf
            }),
        };
        $.ajax(settings).done(function (response) {
            toast("狀態變更為上架")
            window.location.reload()
            event.preventDefault();
        }.bind(this))
    }
    // 處理JSON把值取出來
    FoodType() {
        console.log(this.state.MenuInfo)
        let Tab = [];
        var ChoiceTypeName_List = [];
        var FoodType = this.state.MenuInfo["FoodType"]
        var FoodType_List = []
        var ChoiceType = this.state.MenuInfo["ChoiceType"]
        for (var key in ChoiceType) {
            console.log("安安", ChoiceType[key].ChoiceTypeID);
            var ChoiceJSON = this.ChoiceTypeList(ChoiceType[key].ChoiceList);
            var ChoiceTypeName = ChoiceType[key].ChoiceTypeName
            ChoiceTypeName_List.push(ChoiceTypeName)
        }
        console.log("ChoiceJSON", ChoiceJSON)
        console.log("ChoiceTypeName_List:", ChoiceTypeName_List)
        for (var key in FoodType) {
            // console.log(key)
            FoodType_List.push(key)
            console.log(FoodType[key].FoodTypeName)
            var FoodTypeName = FoodType[key].FoodTypeName
            // $('#uncontrolled-tab-example').append('<Tab eventKey="home" title="Home"><startpage /></Tab>')\
            var FoodItem = this.FoodIDList(JSON.parse(FoodType[key].FoodList), ChoiceJSON, ChoiceTypeName_List, FoodType_List)
            Tab.push(<Tab className="TabScroll" id="Tab" eventKey={FoodTypeName} title={FoodTypeName}>{FoodItem}</Tab>)
        }
        console.log("救命：", FoodType_List)
        this.setState({
            Tabs: Tab,
            ChoiceType: ChoiceType,
            ChoiceTypeName_List: ChoiceTypeName_List,
            FoodType_List: FoodType_List
        })
    }

    //處理FoodID和Button狀態
    FoodIDList(FoodIDList, ChoiceJSON, ChoiceTypeName_List, FoodType_List) {
        var Food = this.state.MenuInfo["Food"]
        var FoodItemList = [];
        // var ChoiceAll = ChoiceJSON["ChoiceName"]
        var ChoiceName_List = ChoiceJSON["ChoiceName"] //陣列
        // var ChoiceTypeName_List = ChoiceJSON["ChoiceType"] 
        var ChoiceID_List = ChoiceJSON["ChoiceID"] //陣列 
        for (var i in FoodIDList) {
            var ChoiceID = ChoiceID_List[i]
            var FoodID = FoodIDList[i];
            var FoodItem = Food[FoodID];//單項食品內容
            var FoodName = FoodItem["FoodName"] //餐點名稱
            var ChoiceTypeList = FoodItem["ChoiceTypeList"] //Choice的IDList
            console.log("ChoiceTypeList:", ChoiceTypeList)
            //冠穎
            for (var j in eval(ChoiceTypeList)) {
                var ChoiceID = eval(ChoiceTypeList)[j]
                var ChoiceItem = this.state.MenuInfo["ChoiceType"][ChoiceID]
                console.log("ChoiceItem", ChoiceItem)
                if (ChoiceItem != undefined) {
                    var ChoiceList = ChoiceItem["ChoiceList"]
                }
                if (ChoiceName_List[i] != undefined) {
                    var ChoiceName = ChoiceName_List[i]["ChoiceName"]
                }
                // }else{
                //     ChoiceList = []
                // }
                // this.state.ChoiceList_List.push(ChoiceList)
            }
            // console.log("ChoiceList_List:", this.state.ChoiceList_List)
            //冠穎
            var Price = FoodItem["Price"] //價錢
            var img = <Col><div id="ImgColor" ><img id="FoodImgStyle" src={`${Config.Post_IP.ImgURL}${this.state.StoreID}/${FoodID}`} /></div></Col>;//餐點圖片
            var FoodName_Price = <Col><div id="FoodTxt"><p id="FoodName">{FoodItem.FoodName}</p><br /><p id="FoodPrice">${FoodItem.Price}</p></div></Col>;
            // sessionStorage.setItem('ImgSrc', `${Config.Post_IP.ImgURL}${this.state.StoreID}/${FoodID}`)
            //要傳的值
            var data = {
                FoodID: FoodID,
                FoodName: FoodName,
                Price: Price,
                ChoiceID: ChoiceID,
                ChoiceName: ChoiceName,
                ChoiceTypeName_List: JSON.stringify(ChoiceTypeName_List),
                // ChoiceList_List:this.state.ChoiceList_List,
                ChoiceTypeList: ChoiceTypeList,
                FoodType_List: FoodType_List
            }
            var path = {
                pathname: '/EditMenu',
                state: data,
            }
            console.log("data:", data)
            if (FoodItem.SoldOut == "0" & FoodItem.OffShelf == "0") {
                var BTN = <Col><div class="btn-group" Style="margin-top:12px">
                    <button id={FoodID} onClick={this.UpdateFood_SoldOut} type="button" class="btn btn-success">販售中</button>
                    <button id={FoodID} onClick={this.UpdateFood_Offshelf} type="button" class="btn btn-success">上架</button>
                    <Button id={FoodID} type="button" class="btn btn-info"><Link to={path} Style="color: #FFF;">設定</Link></Button>
                </div></Col>;
            } else if (FoodItem.SoldOut == "0" & FoodItem.OffShelf == "1") {
                var BTN = <Col><div class="btn-group" Style="margin-top:12px">
                    <button id={FoodID} type="button" class="btn btn-secondary disabled">販售中</button>
                    <button id={FoodID} onClick={this.UpdateFood_Onshelf} type="button" class="btn btn-danger">下架</button>
                    <Button id={FoodID} type="button" class="btn btn-info"><Link to={path} Style="color: #FFF;">設定</Link></Button>
                </div></Col>;
            } else if (FoodItem.SoldOut == "1" & FoodItem.OffShelf == "0") {
                var BTN = <Col><div class="btn-group" Style="margin-top:12px">
                    <button id={FoodID} onClick={this.UpdateFood_SoldIn} type="button" class="btn btn-danger">完售</button>
                    <button id={FoodID} onClick={this.UpdateFood_Offshelf} type="button" class="btn btn-success">上架</button>
                    <Button id={FoodID} type="button" class="btn btn-info"><Link to={path} Style="color: #FFF;">設定</Link></Button>
                </div></Col>;
            }
            var Horizontal = <Col><hr /></Col>;
            // FoodItemList.push(<Link to="/Order" FoodID={FoodID}><Row id="FoodRow">{img}{FoodName_Price}{BTN}</Row></Link>);
            FoodItemList.push(<Row id={FoodID}>{img}{FoodName_Price}{BTN}</Row>);
            FoodItemList.push(<Row>{Horizontal}</Row>)
        }
        return (FoodItemList)
    }
    //處理ChoiceList 步驟二
    ChoiceTypeList(ChoiceList) {
        console.log("ChoiceList", ChoiceList)
        ChoiceList = eval(ChoiceList)
        var Choice = this.state.MenuInfo["Choice"]
        var ChoiceID = []
        var ChoiceName = []
        // var ChoiceList = [];
        for (var i in ChoiceList) {
            ChoiceID.push(ChoiceList[i]);
            ChoiceName.push(Choice[ChoiceID]); //單項食品內容
        }
        return ({
            ChoiceID: ChoiceID,
            ChoiceName: ChoiceName
        })
    }
    // 處理JSON把值取出來 步驟一
    // ChoiceType() {
    //     let Tab = [];
    //     var ChoiceTypeName_List = []
    //     var ChoiceType = this.state.MenuInfo["ChoiceType"]
    //     // console.log(this.state.MenuInfo)
    //     for (var key in ChoiceType) {
    //         // console.log(key)
    //         console.log(ChoiceType[key].ChoiceTypeName)
    //         var ChoiceTypeName = ChoiceType[key].ChoiceTypeName
    //         ChoiceTypeName_List.push(ChoiceTypeName)
    //         // $('#uncontrolled-tab-example').append('<Tab eventKey="home" title="Home"><startpage /></Tab>')\
    //         var ChoiceType = ChoiceType[key].ChoiceType
    //         console.log("嗨：", ChoiceTypeList[key])
    //         var ChoiceList = this.ChoiceTypeList(JSON.parse(ChoiceTypeList[key].ChoiceList))
    //     }
    //     this.setState({
    //         ChoiceType: ChoiceType,
    //         ChoiceList: ChoiceList,
    //         ChoiceTypeName_List: ChoiceTypeName_List
    //     })
    // }

    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({ redirect: true });
    }
    Search(event) {
        event.preventDefault();
        // alert("開發中")
        //     var alert = []
        //     alert.push(< Alert variant="filled" severity="success" >
        //         開發中
        //     </Alert >)
        //    this.setState({alert:alert})
        toast.warn('開發中', { position: toast.POSITION.TOP_CENTER })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/AddMenu" />;
        }
        return (
            <div className="contact-section">
                <header className="header" style={{ height: '100%' }}>
                    <div className="TopBar">
                        <button className="back_btn" onClick={this.backgo}>
                            <img style={{ height: '60%' }} src={back} alt="back" />
                        </button>
                        <noscript>
                            <div className="back">『您的瀏覽器不支援JavaScript功能，若網頁功能無法正常使用時，請開啟瀏覽器JavaScript狀態』</div>
                        </noscript>
                        <button className="menu_btn">
                            <img style={{ height: '50%', width: '50%' }} src={menu} alt="menu" />
                        </button>
                    </div>
                    <div style={{ backgroundColor: '#333333', height: '80%' }}>
                        <div className="headerName" id="headerName">
                            菜單設計
						</div>
                    </div>
                </header>
                <form style={{ paddingTop: "15px" }} className="form-inline ml-3 col-12">
                    <div className="input-group">
                        <div className="searchbar" id="searchbar" />
                        <div className="d-flex justify-content-center h-100">
                            <div className="Searchbar">
                                <input className="search_input" type="text" name="" placeholder="Search..."></input>
                                <button onClick={this.Search} className="search_icon"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                        {/* <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                        </input> */}
                        <div className="input-group-append" >
                            {/* <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search"></i>
                            </button> */}
                            {/* <button onClick={this.handleOnClick} class="btn btn-app" style={{ position: "absolute" }}>
                                <i className="fas fa-edit"></i> Add
                                </button> */}
                            <IconButton aria-label="AddCircle" onClick={this.handleOnClick} size="large">
                                <AddCircle fontSize="large" />
                            </IconButton>

                        </div>
                    </div>
                </form>

                <div id="FoodType" Style="overflow:scroll">
                    <Tabs defaultActiveKey={this.state.FoodTypeName} id="uncontrolled-tab-example" >
                        {this.state.Tabs}
                        {/* <Tab id="Tab" eventKey="123" title="123">
                            <Container>
                                <Row>
                                    <Col><div id="ImgColor" ></div></Col>
                                    <Col>熱咖啡20</Col>
                                </Row>
                            </Container>
                            <Container>
                                <Row>
                                    <Col>1 of 1</Col>
                                </Row>
                            </Container>
                        </Tab> */}
                    </Tabs>
                </div>
                <Fab color="secondary" aria-label="add" className="fab" onClick={this.handleOnClick}>
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}

export default UpdateMenu;
