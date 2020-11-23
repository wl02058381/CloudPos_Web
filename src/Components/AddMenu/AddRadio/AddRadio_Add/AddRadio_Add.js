//菜單更新
import React, { Component } from 'react';
import { Button, Container, Row, Col, Form, Card, FormControl } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import back from '../../../../images/back.svg';
import menu from '../../../../images/menu.jpg';
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
import '../../../Content.css'
class AddRadio_Add extends Component {
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
            ChoiceTypeList:[]
        };
        this.handleChange = this.handleChange.bind(this)
    }
    backgo() {
        // <Link to="/" />
        const history = creatHistory();
        history.goBack();
        // history.go(-1)
    }
    componentDidMount() {
        document.title = '單選項目';
        // 取得一大包資訊
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        this.state.MenuInfo = JSON.parse(MenuInfo);
        console.log("MenuInfo:", MenuInfo)
        this.type = "checkbox"
        // 取得ChoiceTypeList 更新按鈕資訊
        var ChoiceTypeList = sessionStorage.getItem('ChoiceTypeList');
        console.log("ChoiceTypeList", ChoiceTypeList)
        if (ChoiceTypeList == null){
            ChoiceTypeList = []
        }else{
            ChoiceTypeList = ChoiceTypeList.split(',')
        }
        this.setState({
            ChoiceTypeList: ChoiceTypeList
        },function(){
            this.GetChoiceTypeName()
        })
        
    }
    handleChange(event) {
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
            sessionStorage.setItem('ChoiceTypeList', ChoiceTypeList);
        })
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
                var k = ChoiceList[Choice_Key]
                CardsBaby.push(<div>{Choice[k]["ChoiceName"]}</div>);
            }
            console.log("this.state.ChoiceTypeList:", this.state.ChoiceTypeList)
            if (this.state.ChoiceTypeList.includes(ChoiceType_key)){
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
                        <Checkbox id={ChoiceType_key}
                        defaultChecked //預設被選
                        onChange = {this.handleChange}
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
            }else{
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
                        <Checkbox id={ChoiceType_key}
                        onChange = {this.handleChange}
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
            }}
            
        }
        this.setState({ CardsList: CardsList })
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
                            新增複選項目
						</div>
                    </div>
                </header>
                <div>
                    <div className="card card-primary">
                        {/* <div className="card-body ">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <div style={{ marginTop: '16px' }}></div>
                                    
                                </div>
                            </form>
                        </div> */}

                    </div>
                </div>
            </div>

        );
    }
}

export default AddRadio_Add;
// function changeAddMenu() {
//   // ShowMenu()
//   $("#headerName").text("菜單新增");
//   ReactDOM.render(<></>,
//     document.getElementById('searchbar'))
//   ReactDOM.render(<AddMenu />,
//     document.getElementById('Content')
//   );
// }