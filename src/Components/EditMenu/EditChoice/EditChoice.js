//菜單更新
import React, { Component } from 'react';
import { Button, Container, Row, Col, Form, Card, FormControl } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import back from '../../../images/back.svg';
import menu from '../../../images/menu.jpg';
import creatHistory from 'history/createHashHistory';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
const checkboxstatemap = new Map()
import '../../Content.css'
class EditChoice extends Component {

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
                // ChoiceTypeName_List,
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
            // ChoiceTypeName_List: ChoiceTypeName_List,
            ChoiceTypeList: [],
            FoodType_List: FoodType_List,
            MenuInfo: '',
            CardsList: [],
            check: [],
            Edit: null
        };
        this.type = ""
        // this.ShowChoice = this.ShowChoice.bind(this)
        this.GetChoiceTypeName = this.GetChoiceTypeName.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.reload = this.reload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.GetChoiceTypeName_Edit = this.GetChoiceTypeName_Edit.bind(this)
    }
    backgo() {
        // <Link to="/" />
        const history = creatHistory();
        history.goBack();
        // history.go(-1)
    }
    componentDidMount() {
        document.title = '複選項目';
        //判斷有無修改過
        var Edit = sessionStorage.getItem('Edit')
        console.log(Edit)
        this.setState({ Edit: Edit })
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        this.state.MenuInfo = JSON.parse(MenuInfo);
        var FoodID = sessionStorage.getItem('FoodID');
        console.log("FoodID:", FoodID)
        this.state.ChoiceTypeList = this.state.MenuInfo["Food"][FoodID]["ChoiceTypeList"]
        console.log(this.state.ChoiceTypeList)
        this.type = "checkbox"
        // this.ShowChoice()
        if (Edit == null) {
            this.GetChoiceTypeName()
        } else if (Edit == "true") {
            this.GetChoiceTypeName_Edit()
        }

    }
    handleChange(event) {
        var Edit = sessionStorage.getItem('Edit')
        console.log("Edit", Edit)
        if (Edit == null) {
            var ChoiceTypeList = eval(this.state.ChoiceTypeList)
        } else if (Edit == "true") {
            var ChoiceTypeList = sessionStorage.getItem('ChoiceTypeList')
        }
        // ChoiceTypeList = ChoiceTypeList.split(',')
        // var ChoiceTypeList = this.state.ChoiceTypeList
        console.log("第一步：", ChoiceTypeList)
        // console.log(event.target.checked)
        // console.log(event.target.id)
        console.log(typeof (ChoiceTypeList))
        // console.log(event.target.checked)
        //如果方塊被選擇
        if (event.target.checked == true & Edit == null) {
            eval(ChoiceTypeList).push(event.target.id)
            console.log("安安")
            // this.state.ChoiceTypeList.concat(event.target.id)
        } else if (event.target.checked == true & Edit == "true") {
            ChoiceTypeList = ChoiceTypeList.split(',')
            // ChoiceTypeList = JSON.parse(ChoiceTypeList)
            ChoiceTypeList.push(event.target.id)
            console.log("安安")
        }
        if (event.target.checked == false & Edit == null) //如果方塊被取消掉
        {
            // 把被取消的元素從陣列移除
            ChoiceTypeList = eval(ChoiceTypeList).filter(function (item) {
                return item != event.target.id
            })
        } else if (event.target.checked == false & Edit == "true") //如果方塊被取消掉
        {
            // 把被取消的元素從陣列移除
            ChoiceTypeList = ChoiceTypeList.split(',')
            // ChoiceTypeList = JSON.parse(ChoiceTypeList)
            ChoiceTypeList = ChoiceTypeList.filter(function (item) {
                return item != event.target.id
            })
        }
        console.log("第一個：", ChoiceTypeList)
        sessionStorage.setItem('ChoiceTypeList', ChoiceTypeList)
        // sessionStorage.setItem('Edit', true)
        // this.setState({ ChoiceTypeList: ChoiceTypeList }, function () {
        //     console.log("ChoiceTypeList:", this.state.ChoiceTypeList)
        // })
        // this.setState({ ChoiceTypeList: this.state.ChoiceTypeList.push(event.target.id)})
    };
    GetChoiceTypeName() {
        var CardsList = [];
        var ChoiceType = this.state.MenuInfo["ChoiceType"]
        var Choice = this.state.MenuInfo["Choice"]
        console.log("Choice:", Choice)
        // ChoiceType.map((e,i)=>{console.log()})
        // ChoiceTypeName_List = []
        // ChoiceTypeID_List = []
        for (var ChoiceType_key in ChoiceType) {
            if (ChoiceType[ChoiceType_key]["Check"] == "0") {
                // ChoiceTypeName_List.push(ChoiceType[key]["ChoiceTypeName"])
                console.log(ChoiceType[ChoiceType_key]["ChoiceTypeName"])
                var ChoiceList = eval(ChoiceType[ChoiceType_key]["ChoiceList"])
                var CardsBaby = [];
                for (var Choice_Key in ChoiceList) {
                    console.log("ChoiceList[Choice_Key]:", ChoiceList[Choice_Key])
                    var k = ChoiceList[Choice_Key]
                    console.log("Choice[k]", Choice[k])
                    CardsBaby.push(<div>{Choice[k]["ChoiceName"]}</div>);
                    // CardsBaby.push(<div>大寶寶</div>);
                    // CardsBaby.push(ChoiceType["Choice"][i])
                }
                if (this.state.ChoiceTypeList.includes(ChoiceType_key)) {
                    CardsList.push(<Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={
                                    <Checkbox
                                        id={ChoiceType_key}
                                        defaultChecked  //預設被選
                                        onChange={this.handleChange}
                                    />}
                                label={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                <div>{CardsBaby}</div>
                                {/* 小寶寶 */}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>)
                }
                else {
                    CardsList.push(<Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={
                                    <Checkbox
                                        id={ChoiceType_key}
                                        onChange={this.handleChange}
                                    />}
                                label={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                <div>{CardsBaby}</div>
                                {/* 小寶寶 */}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>)
                }
            }
        }
        this.setState({ CardsList: CardsList })
    }
    handleSubmit(event) {
        event.preventDefault();
        //更新Edit狀態
        sessionStorage.setItem("Edit", true)
        var ChoiceTypeList = this.state.ChoiceTypeList
        // ChoiceTypeList = ChoiceTypeList.split(',')
        console.log(this.state.ChoiceTypeList)
        console.log(typeof (this.state.ChoiceTypeList))
        // console.log(event.target.checked)
        //如果方塊被選擇
        if (event.target.checked == true) {
            ChoiceTypeList.push(event.target.id)
        } else if (event.target.checked == false) //如果方塊被取消掉
        {
            // 把被取消的元素從陣列移除
            ChoiceTypeList = ChoiceTypeList.filter(function (item) {
                return item != event.target.id
            })
        }
        this.setState({
            ChoiceTypeList: ChoiceTypeList
        }, function () {
            console.log("ChoiceTypeList:", this.state.ChoiceTypeList)
            this.setState({ ChoiceTypeList: ChoiceTypeList });
        })
        // event.preventDefault();
        sessionStorage.setItem("ChoiceTypeListPost", this.state.ChoiceTypeList)
    }
    GetChoiceTypeName_Edit() {
        var CardsList = [];
        var ChoiceType = this.state.MenuInfo["ChoiceType"]
        var Choice = this.state.MenuInfo["Choice"]
        // var ChoiceType = this.state.MenuInfo["ChoiceType"]
        var ChoiceTypeList = sessionStorage.getItem('ChoiceTypeList')
        console.log('ChoiceTypeList', ChoiceTypeList)
        var Choice = this.state.MenuInfo["Choice"]
        console.log("Choice:", Choice)
        // ChoiceTypeName_List = []
        // ChoiceTypeID_List = []
        for (var ChoiceType_key in ChoiceType) {
            if (ChoiceType[ChoiceType_key]["Check"] == "0") {
                console.log("ChoiceType_key:", ChoiceType_key)
                // if (ChoiceType[ChoiceType_key]["Check"] == "0") {
                // ChoiceTypeName_List.push(ChoiceType[key]["ChoiceTypeName"])
                console.log(ChoiceType[ChoiceType_key]["ChoiceTypeName"])
                var ChoiceList = eval(ChoiceType[ChoiceType_key]["ChoiceList"])
                var CardsBaby = [];
                for (var Choice_Key in ChoiceList) {
                    console.log("ChoiceList[Choice_Key]:", ChoiceList[Choice_Key])
                    var k = ChoiceList[Choice_Key]
                    console.log("Choice[k]", Choice[k])
                    CardsBaby.push(<div>{Choice[k]["ChoiceName"]}</div>);
                    // CardsBaby.push(<div>大寶寶</div>);
                    // CardsBaby.push(ChoiceType["Choice"][i])
                }
                if (ChoiceTypeList.includes(ChoiceType_key)) {
                    CardsList.push(<Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={
                                    <Checkbox
                                        id={ChoiceType_key}
                                        defaultChecked  //預設被選
                                        onChange={this.handleChange}
                                    />}
                                label={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                <div>{CardsBaby}</div>
                                {/* 小寶寶 */}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>)
                }
                else {
                    CardsList.push(<Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={
                                    <Checkbox
                                        id={ChoiceType_key}
                                        onChange={this.handleChange}
                                    />}
                                label={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="textSecondary">
                                <div>{CardsBaby}</div>
                                {/* 小寶寶 */}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>)
                }
            }
        }
        this.setState({ CardsList: CardsList })
    }

    reload(event) {
        sessionStorage.removeItem("Edit")
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
                            單選項目
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
                                        <IconButton aria-label="AddCircle" size="large">
                                            <Link to="/AddChoice_Add">
                                                <AddCircle fontSize="large" />
                                            </Link>
                                            </IconButton>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div style={{ marginTop: '16px' }}></div>
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

export default EditChoice;
// function changeAddMenu() {
//   // ShowMenu()
//   $("#headerName").text("菜單新增");
//   ReactDOM.render(<></>,
//     document.getElementById('searchbar'))
//   ReactDOM.render(<AddMenu />,
//     document.getElementById('Content')
//   );
// }
