import React, { Component } from 'react';  //React Component引入
import './StoreSet_img.css';
import $ from 'jquery';
import { Button, Container, Row, Col, Form, Carousel, Image } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import TimePicker from 'react-times';
import { MuiPickersUtilsProvider, KeyboardTimePicker, } from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QueueIcon from '@material-ui/icons/Queue';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';;
import creatHistory from 'history/createHashHistory';
const Config = require("./config")
const moment = require("moment")
const API_Url = Config.API_URL;


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
        this.handleDateChange = this.handleDateChange.bind(this)
        this.GetImage = this.GetImage.bind(this)
        this.Upload = this.Upload.bind(this)
        this.backgo = this.backgo.bind(this)

        this.state = {
            StoreInfo: {},
            StoreName: "",
            DinigStyle: "",
            DiningData: "",
            setSelectedDate: null,
            StoreID: "",
            ImgFile: null,
            ImgFile_Url: null,
            UploadBtnDisable: true
        };
    }

    componentDidMount() {
        toast.configure()
        document.title = "輪播畫面｜設定"
        console.log("===== StartPage ======")
        var StoreID = getParameterByName("s");
        this.setState({ StoreID: StoreID });
        sessionStorage.setItem('StoreID', this.props.match.params.StoreID);

    }
    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    handleDateChange(date) {
        date = moment(date).format("HH:mm");
        this.state.setSelectedDate = date;
        console.log(date)
    };

    GetImage(event) {
        this.setState({
            ImgFile_Url: URL.createObjectURL(event.target.files[0]),
            ImgFile: event.target.files[0],
            UploadBtnDisable: false,
        })
    }


    Upload(event) {
        event.preventDefault();
        var image_id = $("#image_id").children(":selected").attr("id");
        image_id = this.state.StoreID + image_id
        console.log("image_id:", image_id)
        var myHeaders = new Headers();
        myHeaders.append("image_id", image_id);
        myHeaders.append("store_id", this.state.StoreID);

        var formdata = new FormData();
        formdata.append("image", this.state.ImgFile, image_id + ".jpg");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API_Url}/ImageUpload`, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)

                toast.success("上傳成功");
                // this.props.history.push("/StoreSet_img"); //解決方式
                window.location.reload()
            }.bind(this))
            .catch(function (error) {
                console.log('error', error)
                toast.error("上傳失敗ＱＱ");
            });
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
                                <img style={{ height: '48px', width: '48px' }} src={menu} alt="menu" />
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

                    <Row className="Row_Title">
                        <Col><Divider variant="middle" id="Hr_style" /> </Col><Col> <h4>版面預覽</h4></Col><Col> <Divider variant="middle" id="Hr_style" /></Col>
                    </Row>
                    <Row><Col>
                        <Carousel>
                            <Carousel.Item interval={1000}>
                                {/* <img
                        className="d-block w-100"
                        src="./123.jpg"//"holder.js/800x400?text=First slide&bg=373940"
                        alt="First slide"
                    /> */}
                                <div id="bkcolor" ><img className="Header_Img_style" src={`${Config.ImgURL}${this.state.StoreID}/${this.state.StoreID}Store_1`} /></div>

                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <div id="bkcolor" ><img className="Header_Img_style" src={`${Config.ImgURL}${this.state.StoreID}/${this.state.StoreID}Store_2`} /></div>

                            </Carousel.Item>
                            <Carousel.Item>
                                <div id="bkcolor" ><img className="Header_Img_style" src={`${Config.ImgURL}${this.state.StoreID}/${this.state.StoreID}Store_3`} /></div>

                            </Carousel.Item>
                        </Carousel>

                    </Col></Row>
                </Container>

                <Container Style="text-align:center">
                    <form noValidate autoComplete="off">
                        <Row className="Row_Title">
                            <Col><Divider variant="middle" id="Hr_style" /> </Col><Col> <h4>圖片上傳</h4></Col><Col> <Divider variant="middle" id="Hr_style" /></Col>
                        </Row>


                        <Row >
                            <Col id="img_display" className="text-center">
                                <input type="file" onChange={this.GetImage} style={{ display: "none" }} id="file_input" />
                                <Form.Control id="image_id" as="select" >
                                    <option id="Store_1">第一畫面</option>
                                    <option id="Store_2">第二畫面</option>
                                    <option id="Store_3">第三畫面</option>
                                </Form.Control>
                                <Button id="image_btn" variant="secondary" onClick={() => { $("#file_input").click() }} ><CropOriginalIcon /> 檔案</Button>
                            </Col>
                        </Row >
                        <Row >
                            <Col>
                                <Image id="image_show" src={this.state.ImgFile_Url} fluid />
                            </Col>
                        </Row>


                        <Row >
                            <Col>
                                <Button variant="primary" type="submit" className="width_60" onClick={this.Upload} disabled={this.state.UploadBtnDisable}><CloudUploadIcon /> 封面頁｜上傳</Button>
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Link to="/StoreSet"><Button variant="secondary" className="width_60"><StoreMallDirectoryIcon /> 店家設定</Button></Link>
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
