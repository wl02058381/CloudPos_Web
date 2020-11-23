//菜單更新
import React, { Component } from 'react';
import { Button, Container, Row, Col, Form, Card, FormControl } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import back from '../../../images/back.svg';
import menu from '../../../images/menu.jpg';
import ad from '../../../images/remove-ads.png';
import creatHistory from 'history/createHashHistory';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import '../../Content.css'
class EditType extends Component {
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
            check: [],
            FoodTypeName_List: [],
            FoodEdit: null
        };
        this.reload = this.reload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.GetFoodTypeName = this.GetFoodTypeName.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.GetFoodTypeName_Edit = this.GetFoodTypeName_Edit.bind(this)
    }
    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    componentDidMount() {
        document.title = '分類項目';
        var FoodEdit = sessionStorage.getItem('FoodEdit')
        this.type = "checkbox"
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        this.state.MenuInfo = JSON.parse(MenuInfo);
        // MenuInfo = JSON.parse(MenuInfo)
        // 取得FoodTypeName_List 更新按鈕資訊
        var Food = this.state.MenuInfo["Food"]
        if (FoodEdit == null) {
            var FoodTypeName_List = []
            // var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List');
            console.log(Food)
            console.log(this.state.FoodID)
            if (this.state.FoodID !=undefined & this.state.FoodID != null){
                sessionStorage.setItem("FoodID", this.state.FoodID)    
            }
            var FoodID = sessionStorage.getItem("FoodID")
            for (var Food_key in Food) {
                if (Food_key == FoodID){
                    console.log("aaaa:", Food_key)
                    FoodTypeName_List = Food[Food_key]["FoodTypeID"]
                }
            }
            console.log(FoodTypeName_List)
            this.setState({ FoodTypeName_List: FoodTypeName_List }, function () {
                this.GetFoodTypeName()
            })
        } else if (FoodEdit == 'true') {
            var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List');
            FoodTypeName_List = FoodTypeName_List.split(',')
            this.GetFoodTypeName_Edit()
        }
    }
    GetFoodTypeName() {
        var CardsList = [];
        var FoodType = this.state.MenuInfo["FoodType"]
        var FoodTypeName_List = this.state.FoodTypeName_List
        console.log(FoodTypeName_List)
        for (var FoodType_key in FoodType) {
            console.log(FoodType[FoodType_key]["FoodTypeName"])
            console.log(FoodType_key)
            if (FoodTypeName_List.includes(FoodType_key)) {
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
                    </ListItem>
                </Card>)
            }
            else {
                CardsList.push(<Card>
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
                    </ListItem>
                </Card>)
            }
        }
        this.setState({ CardsList: CardsList })
    }
    GetFoodTypeName_Edit() {
        var CardsList = [];
        var FoodType = this.state.MenuInfo["FoodType"]
        var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List')
        console.log("判斷：", FoodTypeName_List)
        FoodTypeName_List = FoodTypeName_List.split(',')
        for (var FoodType_key in FoodType) {
            console.log(FoodType[FoodType_key])
            if (FoodTypeName_List.includes(FoodType[FoodType_key]["FoodTypeID"])) {
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
                                    defaultChecked //預設被選
                                    onChange={this.handleChange}
                                    // color="default"
                                    indeterminate
                                />}
                            label={FoodType[FoodType_key]["FoodTypeName"]}
                        />
                    </ListItem>
                </Card>
                )
            }
            else {
                CardsList.push(<Card>
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
                    </ListItem>
                </Card>)
            }
        }
        this.setState({ CardsList: CardsList })
    }
    handleChange(event) {
        var FoodEdit = sessionStorage.getItem('FoodEdit')
        console.log("FoodEdit", FoodEdit)
        console.log("this.state.FoodTypeName_List:", this.state.FoodTypeName_List)
        if (FoodEdit == null) {
            var FoodTypeName_List = eval(this.state.FoodTypeName_List)
        } else if (FoodEdit == "true") {
            var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List')
        }
        // ChoiceTypeList = ChoiceTypeList.split(',')
        // var ChoiceTypeList = this.state.ChoiceTypeList
        console.log("第一步：", FoodTypeName_List)
        // console.log(event.target.checked)
        // console.log(event.target.id)
        console.log(typeof (FoodTypeName_List))
        // console.log(event.target.checked)
        //如果方塊被選擇
        if (event.target.checked == true & FoodEdit == null) {
            FoodTypeName_List.push(event.target.id)
            console.log("安安")
            // this.state.ChoiceTypeList.concat(event.target.id)
        } else if (event.target.checked == true & FoodEdit == "true") {
            FoodTypeName_List = FoodTypeName_List.split(',')
            // ChoiceTypeList = JSON.parse(ChoiceTypeList)
            FoodTypeName_List.push(event.target.id)
            console.log("安安")
        }
        if (event.target.checked == false & FoodEdit == null) //如果方塊被取消掉
        {
            // 把被取消的元素從陣列移除
            console.log("刪除前:", FoodTypeName_List)
            console.log("158:", event.target.id)
            FoodTypeName_List.forEach(function (item, index, arr) {
                if (item === event.target.id) {
                    arr.splice(index, 1);
                }
            });
            console.log("刪除後:", FoodTypeName_List)
            this.setState({FoodTypeName_List, FoodTypeName_List})
        } else if (event.target.checked == false & FoodEdit == "true") //如果方塊被取消掉
        {
            // 把被取消的元素從陣列移除
            FoodTypeName_List = FoodTypeName_List.split(',')
            FoodTypeName_List = FoodTypeName_List.filter(function (item) {
                return item != event.target.id
            })
        }
        console.log("第一個：", FoodTypeName_List)
        sessionStorage.setItem('FoodTypeName_List', FoodTypeName_List)
        // sessionStorage.setItem('Edit', true)
        this.setState({
                    FoodTypeName_List: FoodTypeName_List
                }, function () {
            console.log("ChoiceTyFoodTypeName_ListpeList:", this.state.FoodTypeName_List)
        })
        // this.setState({ ChoiceTypeList: this.state.ChoiceTypeList.push(event.target.id)})
    };
    handleSubmit(event) {
        event.preventDefault();
        var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List');
        //更新FoodEdit狀態
        sessionStorage.setItem("FoodEdit", true)
        //如果方塊被選擇
        // if (event.target.checked == true) {
        //     FoodTypeName_List.push(event.target.id)
        // } 
        // else if (event.target.checked == false) //如果方塊被取消掉
        // {
        //     // 把被取消的元素從陣列移除
        //     FoodTypeName_List.forEach(function (item, index, arr) {
        //         if (item === event.target.id) {
        //             arr.splice(index, 1);
        //         }
        //     });
        // }
        console.log("Submit:", FoodTypeName_List)
        sessionStorage.setItem('FoodTypeName_List', FoodTypeName_List);
        // this.setState({
        //     FoodTypeName_List: FoodTypeName_List
        // }, function () {
        //     console.log("FoodTypeName_List:", this.state.FoodTypeName_List)
        //     sessionStorage.setItem('FoodTypeName_List', FoodTypeName_List);
        // })
    }
    //取消
    reload(event) {
        window.location.reload(true);
        event.preventDefault();
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
                                <div className="input-group input-group-sm">
                                    <div className="searchbar" id="searchbar" />
                                    <div class="d-flex justify-content-center h-100">
                                        <div class="Searchbar">
                                            <input class="search_input" type="text" name="" placeholder="Search..."></input>
                                            <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                                        </div>
                                    </div>
                                    {/* <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                        </input> */}
                                    <div className="input-group-append" >
                                        {/* <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button onClick={this.handleOnClick} class="btn btn-app" style={{ position: "absolute" }}>
                                            <i className="fas fa-edit"></i> Add
                                </button> */}
                                    </div>
                                </div>
                                <div className="form-group">
                                    {this.state.CardsList}
                                </div>
                                < button onClick={this.reload} className="btn btn-block btn-secondary btn-lg">取消</button>
                                < input type="submit" className="btn btn-block btn-success btn-lg" value="確認" ></input>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default EditType;
// function changeAddMenu() {
//   // ShowMenu()
//   $("#headerName").text("菜單新增");
//   ReactDOM.render(<></>,
//     document.getElementById('searchbar'))
//   ReactDOM.render(<AddMenu />,
//     document.getElementById('Content')
//   );
// }
