//菜單更新
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.css'
import $ from 'jquery';
import creatHistory from 'history/createHashHistory';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
    withRouter
} from "react-router";
const Config = require("../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
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
        this.search = this.search.bind(this)
        this.Search = this.Search.bind(this)
        this.Search_FoodIDList = this.Search_FoodIDList.bind(this)
        // this.reload = this.reload.bind(this)
        this.state = {
            StoreID: "",
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
            SoldOut: '',
            FoodItem_List: {},
            activeKey: '',
            ifSearch:false
        };
    }

    componentDidMount() {
        if (this.props.location.state != null) {
            console.log(this.props.location.state.reloadstate)
            if (this.props.location.state.reloadstate == "1") {
            window.location.reload();
            }
        }
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
        var StoreID = getParameterByName("s");
        this.setState({
            StoreID: StoreID
        })
        // sessionStorage.removeItem('FoodTypeID');
        // sessionStorage.removeItem('ChoiceTypeList');
    }
    //顯示菜單
    ShowSetMenu() {
        var StoreID = getParameterByName("s");
        console.log("Post", API_Url + ':' + API_Port + "/ShowSetMenu")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "StoreID": StoreID });
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
                // console.log(MenuInfo)
                sessionStorage.setItem('MenuInfo', JSON.stringify(MenuInfo));
                this.setState({ MenuInfo: MenuInfo })
                // this.MenuInfo = MenuInfo
                this.FoodType()
            }.bind(this))
            .catch(error => console.log('error', error));
    }
    handleClick(event) {
        const id = event.target.id;
        // console.log(id);
    }
    // 完售
    UpdateFood_SoldOut(event) {
        const id = event.target.id;
        // console.log(id);
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
        // console.log(id);
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
        // console.log(id);
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
        // console.log(id);
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
        // console.log(this.state.MenuInfo)
        let Tab = [];
        var ChoiceTypeName_List = [];
        var FoodType = this.state.MenuInfo["FoodType"]
        var FoodType_List = []
        var ChoiceType = this.state.MenuInfo["ChoiceType"]
        for (var key in ChoiceType) {
            // console.log("安安", ChoiceType[key].ChoiceTypeID);
            var ChoiceJSON = this.ChoiceTypeList(ChoiceType[key].ChoiceList);
            var ChoiceTypeName = ChoiceType[key].ChoiceTypeName
            ChoiceTypeName_List.push(ChoiceTypeName)
        }
        // console.log("ChoiceJSON", ChoiceJSON)
        // console.log("ChoiceTypeName_List:", ChoiceTypeName_List)
        var FoodType_List = []
        var FoodItem_List = []
        for (var key in FoodType) {
            // console.log(key)
            FoodType_List.push(key)
            // console.log(FoodType[key].FoodTypeName)
            var FoodTypeName = FoodType[key].FoodTypeName
            // $('#uncontrolled-tab-example').append('<Tab eventKey="home" title="Home"><startpage /></Tab>')\
            var FoodItem = this.FoodIDList(JSON.parse(FoodType[key].FoodList), ChoiceJSON, ChoiceTypeName_List, FoodType_List)
            Tab.push(<Tab className="TabScroll" id="Tab" eventKey={FoodTypeName} title={FoodTypeName}>{FoodItem}</Tab>)
            FoodType_List.push(FoodType)
            FoodItem_List.push(FoodItem)
        }
        Tab.push(<Tab className="TabScroll" id="Tab" eventKey={FoodType_List} title="全部">{FoodItem_List}</Tab>)
        // console.log("救命：", FoodType_List)
        this.setState({
            Tabs: Tab,
            ChoiceType: ChoiceType,
            ChoiceTypeName_List: ChoiceTypeName_List,
            FoodType_List: FoodType_List,
            FoodItem_List: FoodItem_List
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
            var FoodID = FoodIDList[i];
            var FoodItem = Food[FoodID];//單項食品內容
            var FoodName = FoodItem["FoodName"] //餐點名稱
            var ChoiceTypeList = FoodItem["ChoiceTypeList"] //Choice的IDList
            // console.log("ChoiceTypeList:", ChoiceTypeList)
            //冠穎
            for (var j in eval(ChoiceTypeList)) {
                var ChoiceID = eval(ChoiceTypeList)[j]
                var ChoiceItem = this.state.MenuInfo["ChoiceType"][ChoiceID]
                // console.log("ChoiceItem", ChoiceItem)
                if (ChoiceItem != undefined) {
                    var ChoiceList = ChoiceItem["ChoiceList"]
                }
                if (ChoiceName_List[i] != undefined) {
                    var ChoiceName = ChoiceName_List[i]["ChoiceName"]
                }
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
                // ChoiceID: ChoiceID,
                // ChoiceName: ChoiceName,
                // ChoiceTypeName_List: JSON.stringify(ChoiceTypeName_List),
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
                    <button id={FoodID} onClick={this.UpdateFood_SoldOut} type="button" class="btn btn-warning">販售中</button>
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
    // 搜尋按鈕
    Search(event) {
        var ChoiceTypeName_List = [];
        var Tabs = eval(this.state.Tabs)
        var ifSearch = this.state.ifSearch;
        // console.log(ifSearch)
        if (ifSearch == true) {
            Tabs = Tabs.slice(0, Tabs.length - 1)
        }
        var searchinput = $('#searchinput').val()
        event.preventDefault();
        var Food = this.state.MenuInfo["Food"]
        var FoodIDList = []
        var FoodName_List = []
        var AllFoodName = []
        // var FoodType_List = []
        var FoodItem_List = []
        for (var f in Food) {
            AllFoodName.push(Food[f])
        }
        var output = this.search(AllFoodName, searchinput)
        // console.log("output", output)
        for (var i in output) {
            console.log(output[i])
            FoodIDList.push(output[i]["FoodID"])
            FoodName_List.push(output[i]["FoodName"])
            // FoodType_List.push(i)
        }
        // console.log(FoodName_List)
        var FoodItem = this.Search_FoodIDList(FoodIDList, output)
        // console.log(FoodName_List)
        FoodItem_List.push(FoodItem)
        // console.log(output)
        Tabs.push(<Tab className="TabScroll" id="Tab" eventKey="searchKey" title="搜尋">{FoodItem_List}</Tab>)
        this.setState({ Tabs: Tabs, ifSearch: true })
        toast.success("搜尋結果產生", {
            position: toast.POSITION.TOP_CENTER
        })
    }
    //處理Search
    Search_FoodIDList(FoodIDList, output) {
        // console.log(FoodIDList)
        var FoodItemList = [];
        for (var i in FoodIDList) {
            var FoodID = FoodIDList[i];
            var FoodItem = output[i];//單項食品內容
            var FoodName = FoodItem["FoodName"] //餐點名稱
            // console.log(FoodIDList[i], ":", output[FoodID])
            var Price = FoodItem["Price"] //價錢
            var img = <Col><div id="ImgColor" ><img id="FoodImgStyle" src={`${Config.Post_IP.ImgURL}${this.state.StoreID}/${FoodID}`} /></div></Col>;//餐點圖片
            var FoodName_Price = <Col><div id="FoodTxt"><p id="FoodName">{FoodItem.FoodName}</p><br /><p id="FoodPrice">${FoodItem.Price}</p></div></Col>;
            var Horizontal = <Col><hr /></Col>;
            var data = {
                FoodID: FoodID,
                FoodName: FoodName,
                Price: Price,
                // ChoiceID: ChoiceID,
                // ChoiceName: ChoiceName,
                // ChoiceTypeName_List: JSON.stringify(ChoiceTypeName_List),
                // ChoiceTypeList: ChoiceTypeList,
                // FoodType_List: FoodType_List
            }
            var path = {
                pathname: '/EditMenu',
                state: data
            }
            if (FoodItem.SoldOut == "0" & FoodItem.OffShelf == "0") {
                var BTN = <Col><div class="btn-group" Style="margin-top:12px">
                    <button id={FoodID} onClick={this.UpdateFood_SoldOut} type="button" class="btn btn-warning">販售中</button>
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
            FoodItemList.push(<Row id={FoodID}>{img}{FoodName_Price}{BTN}</Row>);
            FoodItemList.push(<Row>{Horizontal}</Row>)
        }
        return (FoodItemList)


    }
    // reload(){
    //     window.location.reload()
    // }
    //處理ChoiceList 步驟二
    ChoiceTypeList(ChoiceList) {
        // console.log("ChoiceList", ChoiceList)
        ChoiceList = eval(ChoiceList)
        var Choice = this.state.MenuInfo["Choice"]
        var ChoiceID = []
        var ChoiceName = []
        // var ChoiceList = [];
        for (var i in ChoiceList) {
            ChoiceID.push(ChoiceList[i]);
            ChoiceName.push(Choice[ChoiceID]); //單項食品內容
        }
        // console.log("這：",ChoiceID)
        return ({
            ChoiceID: ChoiceID,
            ChoiceName: ChoiceName
        })
    }

    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({ redirect: true });
    }
    
    // 搜尋方法
    search(array, value) {
        var results = [];
        var searchField = "FoodName";
        var searchVal = value;
        for (var i = 0; i < array.length; i++) {
            if (array[i][searchField].indexOf(searchVal) != -1) {
                results.push(array[i]);
            }
        }
        // console.log(results)
        return results
    };

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
                        <Link to="/">
					<button className="menu_btn">
						<img style={{ height: '48px',width:'48px'}} src={menu} alt="menu" />
					</button>
					</Link>
                    </div>
                    <div style={{ backgroundColor: '#333333', height: '80%' }}>
                        <div className="headerName" id="headerName">
                            菜單設計
						</div>
                    </div>
                    {/* <button onClick={this.reload}>刷新</button> */}
                </header>
                <form style={{ paddingTop: "15px" }} className="form-inline ml-3 col-12">
                    <div className="input-group">
                        <div className="searchbar" id="searchbar" />
                        <div className="d-flex justify-content-center h-100">
                            <div className="Searchbar">
                                <input id="searchinput" className="search_input" type="text" name="" placeholder="Search..."></input>
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
                    <Tabs defaultActiveKey={this.state.FoodTypeName} id="uncontrolled-tab-example" onChange={this.TabsonChange}>
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

export default withRouter(UpdateMenu);
