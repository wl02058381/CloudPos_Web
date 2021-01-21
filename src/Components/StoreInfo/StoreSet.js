import React, { Component } from 'react';  //React Component引入
import './StoreSet.css';
import $ from 'jquery';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import TimePicker from 'react-times';
import { MuiPickersUtilsProvider, KeyboardTimePicker, } from '@material-ui/pickers';
// import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QueueIcon from '@material-ui/icons/Queue';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
import creatHistory from 'history/createHashHistory';
// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';import { id } from 'date-fns/esm/locale';
;


const Config = require("./config")
const moment = require("moment")
const API_URL = Config.API_URL;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

class StorePage extends Component {

    constructor(props) {
        super(props);

        this.UploadStore = this.UploadStore.bind(this)
        this.handleOpenDateChange = this.handleOpenDateChange.bind(this)
        this.handleCloseDateChange = this.handleCloseDateChange.bind(this)
        this.ManagerFirstPage = this.ManagerFirstPage.bind(this)
        this.StoreName_Input = this.StoreName_Input.bind(this)
        this.Phone_Input = this.Phone_Input.bind(this)
        this.backgo = this.backgo.bind(this)
        
        this.state = {
            StoreInfo: {},
            StoreName: "",
            DinigStyle: "",
            DiningData: "",
            setSelectedDate: null,
            OpenTime: null,
            CloseTime: null,
            StoreID: "",
            Phone: "0",
            //TableList:null,
            Close_Date: "0",
            "ManagerFirstPageStatus":null
        };
    }

    
    componentDidMount() {
        toast.configure()
        document.title = "店家設定"
        console.log("===== StartPage ======")
        this.setState({ OpenTime: moment("09:00", "HH:mm") })
        this.setState({ CloseTime: moment("21:00", "HH:mm") })
        var StoreID = getParameterByName("s");
        if (StoreID!=null & StoreID!=undefined & StoreID!=""){
            this.setState({
                StoreID: StoreID
            })
            sessionStorage.setItem('StoreID', StoreID);
        }else{
            var StoreID = sessionStorage.getItem('StoreID')
            this.setState({
                StoreID: StoreID
            })
        }
        this.ManagerFirstPage();
        
    }
    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    StoreName_Input(event){
        this.setState({StoreName: event.target.value})
    }

    Phone_Input(event){
        this.setState({Phone: event.target.value})
    }


    ManagerFirstPage() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // var StoreID = getParameterByName("s");
        var StoreID = sessionStorage.getItem('StoreID')
        var raw = JSON.stringify({ "StoreID": StoreID });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${API_URL}/ManagerFirstPage`, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                
                var ServerData = JSON.parse(result)
                console.log("ServerData",ServerData)
                result = ServerData.data
                console.log("result",result)
                if(ServerData.Status == "Success"){
                    toast.info("店家設定")
                    this.setState({
                        "StoreName":result.StoreName,
                        "Phone": result.Phone,
                        //"TableList": JSON.parse(result.TableList),
                        "OpenTime": moment(result.Open,"HH:mm"),
                        "CloseTime": moment(result.Close,"HH:mm"),
                        "Close_Date": result.Close_Date,
                        "ManagerFirstPageStatus":ServerData.Status,
                    })
                }else if(ServerData.Status == "NewStore"){
                    toast.success("歡迎加入，請更新資訊")
                    console.log("ServerData.msg",ServerData.msg)
                    this.setState({
                        "StoreName":"",
                        "Phone": "",
                        //"TableList": JSON.parse(result.TableList),
                        "Close_Date": "0",
                        "ManagerFirstPageStatus":ServerData.Status,
                    })
                }else{
                    console.log("ServerData.msg",ServerData.msg)
                    toast.error("資料獲取失敗ＱＱ")
                    
                }
                
                
            }.bind(this))
            .catch(function (error) {
                toast.error("資料獲取失敗ＱＱ")
                console.log('error', error)
            }.bind(this));
    }



    handleOpenDateChange(date) {
        date = moment(date).format("HH:mm");
        this.state.OpenTime = date;
        console.log(date)
        this.setState({ OpenTime: moment(date, "HH:mm") })

    };
    handleCloseDateChange(date) {
        date = moment(date).format("HH:mm");
        this.state.CloseTime = date;
        console.log(date)
        this.setState({ CloseTime: moment(date, "HH:mm") })
    };

    UploadStore() {
        console.log("---- UploadStore ----")
        var StoreName = $("#StoreName").val()
        var Phone = $("#Phone").val()
        var OpenTime = $("#OpenTime").val()
        var CloseTime = $("#CloseTime").val()
        // var StoreID = getParameterByName("s");
        var StoreID = sessionStorage.getItem('StoreID')
        console.log(StoreName, Phone, OpenTime, CloseTime)

        var DataRow =
        {
            "StoreID": StoreID,
            "StoreName": StoreName,
            "Phone": Phone,
            "Open": OpenTime,
            "Close": CloseTime,
            "Close_Date": this.state.Close_Date,
            //"TableList": this.state.TableList
        }

        var ValueIsNull = false
        for (var key in DataRow) {
            if (DataRow[key] == "" || DataRow[key] == null) {
                ValueIsNull = true
                $(`#${key}-label`).css("color", "red")
            }
        }

        if (ValueIsNull) {
            toast.error("有值尚未填寫！！")
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(DataRow);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            var ManagerFirstPageStatus = this.state.ManagerFirstPageStatus;
            var Url = `${API_URL}/UpdateStoreData`
            if(ManagerFirstPageStatus == "NewStore"){
                Url = `${API_URL}/AddStoreData`
                console.log("新店家上傳資料")
            }
            fetch(Url, requestOptions)
                .then(response => response.text())
                .then(function (result) {
                    console.log(Url)
                    console.log(result)
                    toast.success("上傳成功")

                }.bind(this))
                .catch(function (error) {
                    console.log(error)
                    toast.error("上傳失敗")

                }.bind(this));
        }
    }




    render() {


        // console.log(path)
        return (
            < div className="contact-section" >
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
                            店家設定
						</div>
                    </div>
                </header>
                <Container Style="text-align:center">
                    <form noValidate autoComplete="off">
                        <Row id="Title">
                            <Col>
                                <TextField className="width_60" id="StoreName" label="店家名稱｜StoreName" onChange={this.StoreName_Input} value={this.state.StoreName} />
                            </Col>
                        </Row >
                        <Row id="Title">
                            <Col>
                                <TextField className="width_60" id="Phone" label="電話｜Phone" onChange={this.Phone_Input} value={this.state.Phone} />
                            </Col>
                        </Row>
                        {/* <Row id="Title">
                        <Col>
                            <TextField className="width_60" id="StoreName-input" label="店家名稱｜StoreName" />
                        </Col>
                    </Row> */}
                        <Row id="Title">
                            <Col>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardTimePicker
                                        ampm={false}
                                        className="width_60"
                                        margin="normal"
                                        id="OpenTime"
                                        label="開始營業｜Open Time｜ 24H"
                                        value={this.state.OpenTime}
                                        onChange={this.handleOpenDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />

                                </MuiPickersUtilsProvider>

                            </Col>
                        </Row>
                        <Row >
                            <Col>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardTimePicker
                                        ampm={false}
                                        className="width_60"
                                        margin="normal"
                                        id="CloseTime"
                                        label="結束時間｜Close Time｜ 24H"
                                        value={this.state.CloseTime}
                                        onChange={this.handleCloseDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />

                                </MuiPickersUtilsProvider>

                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Button variant="primary" className="width_60" onClick={this.UploadStore} ><CloudUploadIcon /> 店家設定｜上傳</Button>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Link to="/StoreSet_img"><Button variant="secondary" className="width_60"><CropOriginalIcon /> 封面頁｜設定</Button></Link>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Link to="/StoreSet_QR"><Button variant="secondary" className="width_60"><QueueIcon /> QR條碼｜ 製作</Button></Link>
                            </Col>
                        </Row>


                    </form>

                </Container>
            </div>
        )
    }

}

export default withRouter(StorePage);
