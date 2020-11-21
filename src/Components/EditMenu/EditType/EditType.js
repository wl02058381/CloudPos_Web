//菜單更新
import React, { Component } from 'react';
import { Button, Container, Row, Col, Form,  Card, FormControl } from 'react-bootstrap';
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
    }
    backgo() {
        // <Link to="/" />
        const history = creatHistory();
        history.goBack();
        // history.go(-1)
    }
    componentDidMount() {
        document.title = '分類項目';
        var FoodEdit = sessionStorage.getItem('FoodEdit')
        this.type = "checkbox"
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        this.state.MenuInfo = JSON.parse(MenuInfo);
         // 取得FoodTypeName_List 更新按鈕資訊
         var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List');
         if (FoodTypeName_List == null){
             FoodTypeName_List = []
         }else{
             FoodTypeName_List = FoodTypeName_List.split(',')
         }
         console.log("FoodTypeName_List", FoodTypeName_List)
        //  this.setState({FoodTypeName_List:FoodTypeName_List})
        if (FoodEdit == null) {
            this.GetFoodTypeName()
        } else if (FoodEdit == "true") {
            this.GetFoodTypeName()
        }      
        //  if (FoodTypeName_List == null) {
        //      FoodTypeName_List = []
        //  } else {
        //      FoodTypeName_List = FoodTypeName_List.split(',')
        //  }
        //  this.setState({
        //      FoodTypeName_List: FoodTypeName_List
        //  }, function () {
        //      this.GetFoodTypeName()
        //  })
    }
    GetFoodTypeName() {
        var CardsList = [];
        var FoodType = this.state.MenuInfo["FoodType"]
        for (var FoodType_key in FoodType) {
            console.log(FoodType[FoodType_key]["FoodTypeName"])
            CardsList.push(<Accordion>
                {/* <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    // aria-label="Expand"
                    // aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                > */}
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={
                            <Checkbox
                                id={FoodType_key}
                                defaultChecked  //預設被選
                                onChange={this.handleChange}
                                // color="primary"
                                indeterminate
                            />}
                        label={FoodType[FoodType_key]["FoodTypeName"]}
                    />
                {/* </AccordionSummary> */}
                </Accordion>)
        }
        this.setState({ CardsList: CardsList })
    }
    handleChange(event) {
        var FoodEdit = sessionStorage.getItem('FoodEdit')
        console.log("FoodEdit", FoodEdit)
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
            eval(FoodTypeName_List).push(event.target.id)
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
            FoodTypeName_List = eval(FoodTypeName_List).filter(function (item) {
                return item != event.target.id
            })
        } else if (event.target.checked == false & Edit == "true") //如果方塊被取消掉
        {
            // 把被取消的元素從陣列移除
            FoodTypeName_List = FoodTypeName_List.split(',')
            // ChoiceTypeList = JSON.parse(ChoiceTypeList)
            FoodTypeName_List = FoodTypeName_List.filter(function (item) {
                return item != event.target.id
            })
        }
        console.log("第一個：", FoodTypeName_List)
        sessionStorage.setItem('ChoiceTypeList', FoodTypeName_List)
        // sessionStorage.setItem('Edit', true)
        // this.setState({ ChoiceTypeList: ChoiceTypeList }, function () {
        //     console.log("ChoiceTypeList:", this.state.ChoiceTypeList)
        // })
        // this.setState({ ChoiceTypeList: this.state.ChoiceTypeList.push(event.target.id)})
    };
    handleSubmit(event) {
        event.preventDefault();
        var FoodTypeName_List = sessionStorage.getItem('FoodTypeName_List');
        //更新FoodEdit狀態
        sessionStorage.setItem("FoodEdit", true)
        // 如果方塊被選擇
        this.setState({
            FoodTypeName_List: FoodTypeName_List
        }, function () {
            console.log("FoodTypeName_List:", this.state.FoodTypeName_List)
            sessionStorage.setItem('FoodTypeName_List', FoodTypeName_List);
        })
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
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button onClick={this.handleOnClick} class="btn btn-app" style={{ position: "absolute" }}>
                                            <i className="fas fa-edit"></i> Add
                                </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                        {this.state.CardsList}
                                </div>
                                < button onClick={this.reload}className="btn btn-block btn-secondary btn-lg">取消</button>
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
