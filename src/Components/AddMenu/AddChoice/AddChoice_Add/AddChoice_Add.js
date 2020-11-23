//菜單更新
import React, { Component } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import REButton from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import back from '../../../../images/back.svg';
import menu from '../../../../images/menu.jpg';
import creatHistory from 'history/createHashHistory';
import TextField from '@material-ui/core/TextField';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { toast } from 'react-toastify'
const Config = require("../../../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
import '../../../Content.css'
import { TableFooter } from '@material-ui/core';
class AddChoice_Add extends Component {
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
            ChoiceType_List: '',
            MenuInfoCard: '',
            CardsList: [],
            ChoiceTypeList: [],
            AddChoiceCard: [],
            AddChoiceCard_Success: [],
            MenuItem:[],
            ChoicePrice: "",
            ChoiceName: "",
            ChoicePrice_List:[],
            ChoiceName_List:[],
            selectValue:'',
            selectChoiceTypeID:''
        };
        this.AddChoice = this.AddChoice.bind(this)
        this.handleChoiceNameChange = this.handleChoiceNameChange.bind(this)
        this.handleChoicePriceChange = this.handleChoicePriceChange.bind(this)
        this.AddChoice_Success = this.AddChoice_Success.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.AddChoiceAPI = this.AddChoiceAPI.bind(this)
        this.AddChoice_Button = this.AddChoice_Button.bind(this)
    }
    backgo() {
        // <Link to="/" />
        const history = creatHistory();
        history.goBack();
        // history.go(-1)
    }
    componentDidMount() {
        toast.configure()
        document.title = '新增單選項目';
        var ChoiceType_List = []
        var MenuInfoCard = []
        // 取得一大包資訊
        var MenuInfo = sessionStorage.getItem('MenuInfo');
        this.state.MenuInfo = JSON.parse(MenuInfo);
        // console.log("MenuInfo:", MenuInfo)
        var ChoiceType = this.state.MenuInfo["ChoiceType"]
        for (var ChoiceType_key in ChoiceType) {
            console.log(ChoiceType)
            ChoiceType_List.push(ChoiceType_key)
            MenuInfoCard.push(<MenuItem value={ChoiceType_key}>{ChoiceType[ChoiceType_key]["ChoiceTypeName"]}</MenuItem>)
        }
        this.setState({ ChoiceType_List: ChoiceType_List, MenuInfoCard: MenuInfoCard})
    }

    // 新增子項目(顯示)
    AddChoice() {
        var AddChoiceCard = []
        AddChoiceCard.push(<div>
            <Row style={{ marginTop: '12px' }}>
                <Col sm={2} xs={2}>
                </Col>
                <Col sm={3} xs={3}>
                    項目名稱
                </Col>
                <Col>

                </Col>
                <Col sm={2} xs={2}>
                    <KeyboardArrowDownIcon />
                </Col>
            </Row>
            <Row style={{ marginTop: '12px' }}>
                <Col >
                </Col>
                <TextField
                    id="ChoiceName"
                    label="項目名稱"
                    type="ChoiceName"
                    // autoComplete="current-password"
                    variant="outlined"
                    onChange={this.handleChoiceNameChange}
                />
                <Col sm={1} xs={1}>
                </Col>
            </Row>
            <Row style={{ marginTop: '6px' }}>
                <Col >
                </Col>
                <TextField
                    id="ChoicePrice"
                    label="＄項目價錢"
                    type="ChoicePrice"
                    // autoComplete="current-password"
                    variant="outlined"
                    onChange={this.handleChoicePriceChange}
                />
                <Col sm={1} xs={1}>
                </Col>
            </Row>
            <Row style={{ marginTop: '6px' }}>
                <Col >
                </Col>
                {/* <Col> */}
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={this.AddChoice_Success}
                    startIcon={<PlaylistAddCheckIcon />}
                >
                    確認
                                </Button>
                {/* <REButton variant="success" block>上架</REButton>{' '} */}
                {/* </Col> */}
                <Col sm={1} xs={1}>
                </Col>
            </Row></div>)
        console.log(AddChoiceCard)
        this.setState({ AddChoiceCard: AddChoiceCard })
    }
    // 確認(顯示)
    AddChoice_Success() {
        if (this.state.ChoiceName_List.length == 0){
            var ChoiceName_List = []
            var ChoicePrice_List = []
        }else{
            var ChoiceName_List = eval(this.state.ChoiceName_List)
            var ChoicePrice_List = eval(this.state.ChoicePrice_List)
            console.log(this.state.ChoiceName_List)
        }
        ChoiceName_List.push(this.state.ChoiceName)
        ChoicePrice_List.push(this.state.ChoicePrice)
        // this.setState({ ChoiceName_List: ChoiceName_List, ChoicePrice_List: ChoicePrice_List})
        if (this.state.AddChoiceCard_Success.length == 0) {
            var AddChoiceCard_Success = []
        } else {
            AddChoiceCard_Success = this.state.AddChoiceCard_Success
        }

        if (this.state.ChoiceName != "" & this.state.ChoicePrice != "") {
            AddChoiceCard_Success.push(<div>
                <Row style={{ marginTop: '12px' }}>
                    <Col sm={2} xs={2}>
                    </Col>
                    <Col sm={3} xs={3}>
                        {this.state.ChoiceName}
                    </Col>
                    <Col>

                    </Col>
                    <Col sm={2} xs={2}>
                        <KeyboardArrowDownIcon />
                    </Col>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                    <Col >
                    </Col>
                    <TextField
                        id="outlined-password-input"
                        label="項目名稱"
                        type="ChoiceName"
                        // autoComplete="current-password"
                        value={this.state.ChoiceName}
                        variant="outlined"
                        disabled
                        onChange={this.handleChoiceNameChange}
                    />
                    <Col sm={1} xs={1}>
                    </Col>
                </Row>
                <Row style={{ marginTop: '6px' }}>
                    <Col >
                    </Col>
                    <TextField
                        id="outlined-password-input"
                        label="＄項目價錢"
                        type="ChoicePrice"
                        // autoComplete="current-password"
                        value={this.state.ChoicePrice}
                        variant="outlined"
                        disabled
                        onChange={this.handleChoicePriceChange}
                    />
                    <Col sm={1} xs={1}>
                    </Col>
                </Row>
                <Row style={{ marginTop: '6px' }}>
                    <Col >
                    </Col>
                    <Col sm={1} xs={1}>
                    </Col>
                </Row></div>)
        }
        // 強制渲染
        this.setState({ AddChoiceCard_Success: [...AddChoiceCard_Success], ChoiceName_List: JSON.stringify(ChoiceName_List), ChoicePrice_List: JSON.stringify(ChoicePrice_List) }, function () {
            console.log(this.state.AddChoiceCard_Success)
        })
        $('#ChoiceName').val('')
        $('#ChoicePrice').val('')
        return (AddChoiceCard_Success)
    }
    handleChoiceNameChange(event) {
        console.log(event.target.value);
        this.setState({ ChoiceName: event.target.value })
    }
    handleChoicePriceChange(event) {
        console.log(event.target.value);
        this.setState({ ChoicePrice: event.target.value })
    }
    handleChange(event){
        var ChoiceType = this.state.MenuInfo["ChoiceType"]
        for (var ChoiceType_key in ChoiceType) {
            if (ChoiceType_key == event.target.value){
                console.log("相等")
                var selectChoiceTypeID = ChoiceType_key
            }
        }
        this.setState({ selectValue: event.target.value, selectChoiceTypeID: selectChoiceTypeID})
    }
    // 新增單選API
    AddChoiceAPI(ChoiceName,ChoicePrice ){
        let StoreID = this.state.StoreID;
        let ChoiceTypeID = this.state.selectChoiceTypeID
        // let ChoiceName = this.state.ChoiceName;
        // let Price = this.state.ChoicePrice
        let Offself = '0'
        var settings = {
            "url": API_Url + ':' + API_Port + "/AddChoice",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "ChoiceTypeID": ChoiceTypeID,
                "ChoiceName": ChoiceName,
                "Price": ChoicePrice,
                "Offshelf":Offself
            }),
        };
        $.ajax(settings).done(function (response) {
            // this.ShowSetMenu();
            
        }.bind(this))
    }
    AddChoice_Button(){
        console.log(this.state.ChoiceName_List)
        var ChoiceName_List = eval(this.state.ChoiceName_List)
        var ChoicePrice_List = eval(this.state.ChoicePrice_List)
        for (var i in ChoicePrice_List){
            // console.log(i)
            this.AddChoiceAPI(ChoiceName_List[i],ChoicePrice_List[i])
        }
        toast.success("成功新增單選項目");
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
                            新增單選項目
						</div>
                    </div>
                </header>
                <div>
                    <Container>

                        <Row style={{ marginTop: '18px' }}>
                            <Col sm={1} xs={3}>
                                類別名稱
                            </Col>
                            <Col sm={11} xs={8}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">類別名稱</InputLabel>
                                    <Select
                                        autoWidth={true}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.selectValue}
                                        onChange={this.handleChange}
                                        label="Age"
                                    >
                                        <MenuItem value="">
                                            <em>無分類</em>
                                        </MenuItem>
                                        {/* <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem> */}
                                        {this.state.MenuInfoCard}
                                    </Select>
                                </FormControl>
                                {/* <TextField
                                    id="outlined-full-width"
                                    label="類別名稱"
                                    style={{ margin: 8 }}
                                    // placeholder=""
                                    helperText="糖度、熟度等等"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                /> */}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '18px' }}>
                            <Col>
                                單選項目
                            </Col>
                            <Col>
                                {/* xs=6 md=4 */}
                            </Col>
                            <Col>
                                {/* xs=6 md=4 */}
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '12px' }}>
                            <Col sm={2} xs={2}>
                            </Col>
                            <Col sm={3} xs={3}>
                                新增項目
                            </Col>
                            <Col>

                            </Col>
                            <Col sm={4} xs={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={this.AddChoice}
                                    startIcon={<PlaylistAdd fontSize='large' />}
                                >
                                    新增子項目
                                </Button>
                            </Col>
                        </Row>
                        {this.state.AddChoiceCard}
                        {this.state.AddChoiceCard_Success}
                    </Container>
                    <div style={{ display: 'block', height: '100px', width: '100%', bottom: '50px'}}>
                        <REButton onClick={this.AddChoice_Button}style={{position:'fixed',bottom:'50px'}}variant="primary" size="lg" block>
                        確認上傳
                    </REButton>
                    </div>

                </div>
            </div>

        );
    }
}

export default AddChoice_Add;
// function changeAddMenu() {
//   // ShowMenu()
//   $("#headerName").text("菜單新增");
//   ReactDOM.render(<></>,
//     document.getElementById('searchbar'))
//   ReactDOM.render(<AddMenu />,
//     document.getElementById('Content')
//   );
// }
