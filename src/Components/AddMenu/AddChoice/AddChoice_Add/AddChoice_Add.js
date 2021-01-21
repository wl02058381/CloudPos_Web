//菜單更新
import React, { Component } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import REButton from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import back from '../../../../images/back.svg';
import menu from '../../../../images/menu.png';
import creatHistory from 'history/createHashHistory';
import TextField from '@material-ui/core/TextField';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { toast } from 'react-toastify'
import Input from '@material-ui/core/Input';
const Config = require("../../../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
import '../../../Content.css'
import { TableFooter } from '@material-ui/core';
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
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
            ifdisabled: true,
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
            ChoiceType_List: '',
            MenuInfoCard: '',
            CardsList: [],
            ChoiceTypeList: [],
            AddChoiceCard: [],
            AddChoiceCard_Success: [],
            MenuItem: [],
            ChoicePrice: "",
            ChoiceName: "",
            ChoicePrice_List: [],
            ChoiceName_List: [],
            selectValue: '',
            selectChoiceTypeID: '',
            OriginalChoice_List: [],
            OriginalCard: [],
            pricevalue: ''
        };
        this.AddChoice = this.AddChoice.bind(this)
        this.handleChoiceNameChange = this.handleChoiceNameChange.bind(this)
        this.handleChoicePriceChange = this.handleChoicePriceChange.bind(this)
        this.handleChoicePriceChange1 = this.handleChoicePriceChange1.bind(this)
        this.AddChoice_Success = this.AddChoice_Success.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.AddChoiceAPI = this.AddChoiceAPI.bind(this)
        // this.AddChoice_Button = this.AddChoice_Button.bind(this)
        this.ShowSetMenu = this.ShowSetMenu.bind(this)
        this.EditChoice = this.EditChoice.bind(this)
        this.DeleteChoice = this.DeleteChoice.bind(this)
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
            if (ChoiceType[ChoiceType_key]["Check"] == "0") {
                ChoiceType_List.push(ChoiceType_key)
                MenuInfoCard.push(<MenuItem value={ChoiceType_key}>{ChoiceType[ChoiceType_key]["ChoiceTypeName"]}</MenuItem>)
            }
        }
        var StoreID = getParameterByName("s");
        this.setState({
            ChoiceType_List: ChoiceType_List,
            MenuInfoCard: MenuInfoCard,
            StoreID: StoreID
        })
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
                < TextField
                    id="ChoicePrice"
                    label="＄項目價錢"
                    type="ChoicePrice"
                    // autoComplete="current-password"
                    variant="outlined"
                    onChange={
                        this.handleChoicePriceChange1
                    }
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
        // console.log($('#ChoicePrice').val());
        if ($('#ChoicePrice').val() == "") {
            toast.warn("請輸入項目價錢");
            return
        }
        // else if (typeof ($('#ChoicePrice').val())=="string"){
        //     toast.warn("格式錯誤");
        //     return
        // }
        if (this.state.ChoiceName_List.length == 0) {
            var ChoiceName_List = []
            var ChoicePrice_List = []
        } else {
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
                    <Col sm={3} xs={3} style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>
                        {this.state.ChoiceName}
                    </Col>
                    <Col style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>

                    </Col>
                    <Col sm={2} xs={2} style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>
                        {/* <KeyboardArrowDownIcon /> */}
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
                    < TextField
                        id="outlined-price-input"
                        label="＄項目價錢"
                        type="ChoicePrice"
                        // autoComplete="current-password"
                        value={
                            this.state.ChoicePrice
                        }
                        variant="outlined"
                        disabled
                        onChange={
                            this.handleChoicePriceChange
                        }
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
            this.AddChoiceAPI(this.state.ChoiceName, this.state.ChoicePrice)
            $('#ChoiceName').val('')
            $('#ChoicePrice').val('')
            toast.success("成功新增單選項目");
            this.ShowSetMenu();
            // const history = creatHistory();
            // history.goBack()
        })
        return (AddChoiceCard_Success)
    }
    handleChoiceNameChange(event) {
        console.log(event.target.value);
        this.setState({ ChoiceName: event.target.value })
    }
    handleChoicePriceChange(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        // var id = String(id)
        // $(`#${id}`).val($(`#${id}`).val().replace(/[^0-9]/g, ''))
    }
    handleChoicePriceChange1(event) {
        // $("#ChoicePrice").val($("#ChoicePrice").val().replace(/[^0-9]/g, ''))
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        this.setState({ ChoicePrice: event.target.value })
    }
    // 選單改變
    handleChange(event) {
        var OriginalChoice_List = []
        var OriginalCard = []
        var AddChoiceCard = []
        var AddChoiceCard_Success = []
        var ChoiceType = this.state.MenuInfo["ChoiceType"]
        var Choice = this.state.MenuInfo["Choice"]

        console.log(ChoiceType)
        for (var ChoiceType_key in ChoiceType) {
            if (ChoiceType_key == event.target.value) {
                console.log("相等")
                var selectChoiceTypeID = ChoiceType_key
                OriginalChoice_List = ChoiceType[ChoiceType_key]["ChoiceList"]
            }
        }
        OriginalChoice_List = eval(OriginalChoice_List)
        console.log(OriginalChoice_List)
        for (var i in OriginalChoice_List) {
            var ChoiceID = OriginalChoice_List[i]
            console.log(OriginalChoice_List[i])
            var ChoiceName = Choice[ChoiceID]["ChoiceName"];
            var Price = Choice[ChoiceID]["Price"];
            OriginalCard.push(<div>
                <Row style={{ marginTop: '12px' }}>
                    <Col sm={2} xs={2}>
                    </Col>
                    {/* <Col sm={3} xs={3} style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>
                        {Choice[ChoiceID]["ChoiceName"]}
                    </Col> */}
                    <Col style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>

                    </Col>
                    <Col sm={2} xs={2} style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>
                        {/* <KeyboardArrowDownIcon /> */}
                    </Col>
                </Row>
                <Row>
                    <Col >
                    </Col>
                    {/* <Col style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}> */}
                    <TextField label="原項目名稱" value={Choice[ChoiceID]["ChoiceName"]} disabled></TextField>
                    {/* </Col> */}
                    {/* <Col sm={2} xs={2} style={{ marginTop: '18px', borderTopStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}> */}
                    <TextField label="＄原項目價錢" value={Choice[ChoiceID]["Price"]} disabled></TextField>
                    {/* </Col> */}
                    <Col sm={1} xs={1}>
                    </Col>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                    <Col >
                        {/* {Choice[ChoiceID]["ChoiceName"]} */}
                    </Col>

                    <TextField
                        id={Choice[ChoiceID]["ChoiceID"] + '_ChoiceName'}
                        label="項目名稱"
                        // type="ChoiceName"
                        // autoComplete="current-password"
                        defaultValue={Choice[ChoiceID]["ChoiceName"]}
                        // defaultValue={ChoiceName}
                        variant="outlined"
                    // value={Choice[ChoiceID]["ChoiceName"]}
                    // disabled
                    // onChange={this.handleChoiceNameChange}
                    />
                    < TextField
                        id={Choice[ChoiceID]["ChoiceID"] + '_Price'}
                        label="＄項目價錢"
                        // inputRef={(input) => this.inputChoiceName = input}
                        // type="ChoicePrice"
                        // autoComplete="current-password"
                        defaultValue={Choice[ChoiceID]["Price"]}
                        // defaultValue = {Price}
                        variant="outlined"
                        // value={this.state.pricevalue}
                        // disabled
                        onChange={
                            this.handleChoicePriceChange
                        }
                    />
                    <Col sm={1} xs={1}>
                    </Col>
                </Row>
                <Row style={{ marginTop: '12px' }}>
                    <Col >
                    </Col>
                    <Button
                        id={Choice[ChoiceID]["ChoiceID"]}
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={this.EditChoice}
                        startIcon={<PlaylistAddCheckIcon />}
                    >
                        編輯
                                </Button>
                    <div style={{ marginLeft: "12px" }}></div>
                    <Button
                        id={Choice[ChoiceID]["ChoiceID"]}
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={this.DeleteChoice}
                        startIcon={<DeleteSweep />}
                    >
                        刪除
                                </Button>
                    <Col sm={1} xs={1}>
                    </Col>
                </Row></div>)
            // $('#'+Choice[ChoiceID]["ChoiceID"] + '_Price').val(Choice[ChoiceID]["Price"]);
            // $('#' +Choice[ChoiceID]["ChoiceID"] + '_ChoiceName').val(Choice[ChoiceID]["ChoiceName"]);
        }
        var ifdisabled;
        if (event.target.value == "無分類") {
            ifdisabled = true
        } else {
            ifdisabled = false
        }
        console.log(OriginalChoice_List)
        this.setState({
            ifdisabled: ifdisabled,
            selectValue: event.target.value,
            selectChoiceTypeID: selectChoiceTypeID,
            OriginalCard: OriginalCard,
            AddChoiceCard: AddChoiceCard,
            AddChoiceCard_Success: AddChoiceCard_Success //把其他選項的新增項目隱藏掉
        })
    }
    // 新增單選API
    AddChoiceAPI(ChoiceName, ChoicePrice) {
        let StoreID = this.state.StoreID;
        let ChoiceTypeID = this.state.selectChoiceTypeID
        // let ChoiceName = this.state.ChoiceName;
        // let Price = this.state.ChoicePrice
        let Offshelf = '0'
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
                "Offshelf": Offshelf
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
        }.bind(this))
    }
    // 確認上傳
    // AddChoice_Button(){
    //     console.log(this.state.ChoiceName_List)
    //     var ChoiceName_List = eval(this.state.ChoiceName_List)
    //     var ChoicePrice_List = eval(this.state.ChoicePrice_List)
    //     for (var i in ChoicePrice_List){
    //         // console.log(i)
    //         this.AddChoiceAPI(ChoiceName_List[i],ChoicePrice_List[i])
    //     }
    //     // this.ShowSetMenu();
    //     toast.success("成功新增單選項目");
    //     const history = creatHistory();
    //     history.goBack()
    // }
    //編輯
    EditChoice(event) {
        console.log(event.currentTarget.id) //ChoiceID
        var ChoiceID = event.currentTarget.id
        //取得ChoiceName
        var Nameid = ChoiceID + '_ChoiceName'
        console.log(Nameid)
        var NewChoiceName = $('#' + Nameid).val()
        console.log(NewChoiceName) //要修改後的ChoiceName
        //取得Price
        var Priceid = ChoiceID + '_Price'
        console.log(Priceid)
        var Price = $('#' + Priceid).val()
        let StoreID = this.state.StoreID;
        let ChoiceTypeID = this.state.selectChoiceTypeID
        let Offshelf = '0'
        var settings = {
            "url": API_Url + ':' + API_Port + "/UpdateChocie",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "ChoiceTypeID": ChoiceTypeID,
                "ChoiceID": ChoiceID,
                "ChoiceName": NewChoiceName,
                "Price": Price,
                "Offshelf": Offshelf
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
            toast.success('編輯成功', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }.bind(this))
    }
    DeleteChoice(event) {
        console.log(event.currentTarget.id) //ChoiceID
        var ChoiceID = event.currentTarget.id
        let StoreID = this.state.StoreID;
        var settings = {
            "url": API_Url + ':' + API_Port + "/DelChoice",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "ChoiceID": ChoiceID
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
            toast.success('刪除成功', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }.bind(this))
    }
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
                console.log(MenuInfo)
                sessionStorage.setItem('MenuInfo', JSON.stringify(MenuInfo));
                this.setState({ MenuInfo: MenuInfo })
                // window.location.reload()
                // event.preventDefault();
            }.bind(this))
            .catch(error => console.log('error', error));
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
                    <Link to="/">
                        <button className="menu_btn">
                            <img style={{ height: '48px', width: '48px' }} src={menu} alt="menu" />
                        </button>
                    </Link>
                    <div style={{ backgroundColor: '#333333', height: '80%' }}>
                        <div className="headerName" id="headerName">
                            新增單選項目
						</div>
                    </div>
                </header>
                <div>
                    <Container>

                        <Row style={{ marginTop: '18px', borderBottomStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>
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
                                        <MenuItem value="無分類">
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
                        <Row >
                            <Col sm={2} xs={2}>
                            </Col>
                            <Col sm={3} xs={3} style={{ marginTop: '12px', borderBottomStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>
                                新增項目
                            </Col>
                            <Col style={{ marginTop: '12px', borderBottomStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>

                            </Col>
                            <Col sm={4} xs={6} style={{ marginTop: '12px', borderBottomStyle: 'solid', borderWidth: '2px', paddingBottom: '12px' }}>
                                <Button
                                    disabled={this.state.ifdisabled}
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
                        {this.state.OriginalCard}
                    </Container>
                    {/* <div style={{ display: 'block', height: '100px', width: '100%', bottom: '50px'}}>
                        <REButton onClick={this.AddChoice_Button}style={{position:'fixed',bottom:'50px'}}variant="primary" size="lg" block>
                        確認上傳
                    </REButton>
                    </div> */}

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
