import React, { Component } from 'react';  //React Component引入
import './StoreSet_img.css';
import $ from 'jquery';
import { Button, Container, Row, Col, Form, Carousel, Image } from 'react-bootstrap';
import { Toggle } from 'rsuite';
import { Link, Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QueueIcon from '@material-ui/icons/Queue';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
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
        this.StoreImage = this.StoreImage.bind(this) //餐點
        this.StoreImage_SetShow = this.StoreImage_SetShow.bind(this) //餐點
        this.SetShowCheck = this.SetShowCheck.bind(this) //餐點
        this.UploadShowSet = this.UploadShowSet.bind(this) //餐點
        this.handleClose_Dialog = this.handleClose_Dialog.bind(this) //餐點
        this.handleClickOpen_Dialog = this.handleClickOpen_Dialog.bind(this) //餐點
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
            UploadBtnDisable: true,
            Carousel_Item: null,
            SetShowImg: null,
            ShowImg_Array: null,
            UploadShowSetStatus: true,
            open: false,
        };
    }

    componentDidMount() {
        toast.configure()
        document.title = "輪播畫面｜設定"
        console.log("===== StartPage ======")
        var StoreID = getParameterByName("s");
        this.setState({
            StoreID: StoreID
        });
        this.StoreImage() //輪播畫面設定
        this.StoreImage_SetShow()


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

        var image_id = this.state.StoreID + $("#image_id").children(":selected").attr("id");
        var HideStatus = $("#checkbox_HideStatus").is(":checked") //隱藏勾選

        if (HideStatus) {//隱藏勾選
            HideStatus = "0"
        } else {
            HideStatus = "1"
        }
        console.log("HideStatus", HideStatus)

        console.log("image_id:", image_id)
        var myHeaders = new Headers();
        myHeaders.append("image_id", image_id);
        myHeaders.append("store_id", this.state.StoreID);
        myHeaders.append("HideStatus", this.state.HideStatus);

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

    StoreImage() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var StoreID = getParameterByName("s");
        var raw = JSON.stringify({ "StoreID": StoreID });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };



        fetch(API_Url + "/FindStoreImage", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log("＝＝＝＝＝輪播畫面設定＝＝＝＝＝＝＝＝",)

                var StoreImageID = JSON.parse(result).Data
                var Carousel_Item = []

                console.log("輪播畫面：", StoreImageID)
                for (var index in StoreImageID) {
                    var ImageData = StoreImageID[index]
                    var ImageID = StoreImageID[index].ImageID
                    console.log(raw)
                    console.log(ImageData)
                    Carousel_Item.push(
                        <Carousel.Item interval={1000} >
                            <div
                                div id="bkcolor" > < img className="Header_Img_style"
                                    src={`${Config.ImgURL}${this.state.StoreID}/${ImageID}`} />
                            </div >
                        </Carousel.Item>
                    )
                    this.setState({ Carousel_Item: Carousel_Item })

                }

            }.bind(this))
            .catch(error => console.log('error', error));
    }

    StoreImage_SetShow() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var StoreID = getParameterByName("s");
        var raw = JSON.stringify({ "StoreID": StoreID });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };



        fetch(API_Url + "/FindStoreImage_All", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log("＝＝＝＝＝輪播畫面顯示設定＝＝＝＝＝＝＝＝",)

                var StoreImageID = JSON.parse(result).Data

                var SetShowImg = []
                var ShowImg_Array = {}
                console.log("輪播畫面：", StoreImageID)
                var i = 0
                for (var index in StoreImageID) {
                    i += 1;
                    var ImageData = StoreImageID[index]
                    var ImageID = StoreImageID[index].ImageID
                    var Serial = ImageID.split("_")
                    console.log("Serial", Serial.length)
                    Serial = Serial[Serial.length - 1]
                    console.log(raw)
                    console.log(ImageData)
                    ShowImg_Array[ImageID] = { "ImageID": ImageID, "StoreID": this.state.StoreID, "HideStatus": ImageData.HideStatus }
                    if (ImageData.HideStatus == "1") {//顯示勾選
                        SetShowImg.push(
                            <Row>
                                <Col><Divider variant="middle" id="Hr_style" /> </Col><Col style={{ "padding-top": "5px" }}> <h6>{`第 ${Serial} 畫面`}</h6></Col><Col> <Divider variant="middle" id="Hr_style" /></Col>
                            </Row>
                        )
                        SetShowImg.push(

                            <Row>

                                <Col className={"text-right col-5 "}>
                                    <Form.Group controlId="checkbox_HideStatus" style={{ "padding-top": "45px" }}>
                                        <Form.Check type="checkbox" id={ImageID} onChange={(e) => this.SetShowCheck(e)} label={`. 顯示`} />
                                    </Form.Group>

                                </Col>
                                <Col className={"text-center col-6"}>
                                    < img id="StoreImgStyle" src={`${Config.ImgURL}${this.state.StoreID}/${ImageID}`} />
                                </Col>

                            </Row>
                        )
                    } else {
                        SetShowImg.push(
                            <Row>
                                <Col><Divider variant="middle" id="Hr_style" /> </Col><Col style={{ "padding-top": "5px" }}> <h6>{`第 ${Serial} 畫面`}</h6></Col><Col> <Divider variant="middle" id="Hr_style" /></Col>
                            </Row>
                        )
                        SetShowImg.push(
                            <Row>
                                
                                <Col className={"text-right col-5 "}>
                                    <Form.Group controlId="checkbox_HideStatus" style={{ "padding-top": "45px" }}>
                                        <Form.Check type="checkbox" id={ImageID} onChange={(e) => this.SetShowCheck(e)} label={`.顯示`} defaultChecked />
                                    </Form.Group>

                                </Col>
                                <Col className={"text-center col-6"}>
                                    < img id="StoreImgStyle" src={`${Config.ImgURL}${this.state.StoreID}/${ImageID}`} />
                                </Col>
                            </Row>
                        )
                    }
                }

                if (i != 0) {
                    this.setState({ UploadShowSetStatus: false })
                }

                console.log(ShowImg_Array)
                this.setState({ SetShowImg: SetShowImg, ShowImg_Array: ShowImg_Array })
            }.bind(this))
            .catch(error => console.log('error', error));
    }

    SetShowCheck(event) {
        var ImageID = event.target.id;
        let ShowImg_Array = this.state.ShowImg_Array;
        var HideStatus = $(`#${ImageID}`).is(":checked")
        if (HideStatus) {
            HideStatus = "0"
        } else {
            HideStatus = "1"
        }
        console.log("ImageID Checked:", ImageID, "=>", HideStatus)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "ImageID": ImageID, "StoreID": this.state.StoreID, "HideStatus": HideStatus });
        ShowImg_Array[ImageID].HideStatus = HideStatus
        console.log(ShowImg_Array, ShowImg_Array[ImageID].HideStatus)
        this.setState({ "ShowImg_Array": ShowImg_Array })
    }
    UploadShowSet() {
        console.log("=========== UploadShowSet Data: ==========")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(this.state.ShowImg_Array);
        console.log("UploadShowSet Data:", raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${API_Url}/SetStoreImgStatus_All`, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)

                toast.success("上傳成功");
                // this.props.history.push("/StoreSet_img"); //解決方式
                window.location.reload()
            }.bind(this))
            .catch(error => console.log('error', error));
    }
    handleClose_Dialog() {
        this.setState({ open: false })
    }
    handleClickOpen_Dialog() {
        this.setState({ open: true })
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
                    {/* 警告彈跳視窗 */}
                    <div>

                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose_Dialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"顯示設定｜上傳"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    圖片狀態是否確定上傳
                    </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose_Dialog} variant="danger" >
                                    取消
                            </Button>
                                <Button onClick={this.UploadShowSet} variant="dark" autoFocus>
                                    確認
                            </Button>

                            </DialogActions>
                        </Dialog>
                    </div>
                </header>
                {/* 主要頁面 */}
                <div>
                <Container Style="text-align:center">

                    <Row className="Row_Title">
                        <Col><Divider variant="middle" id="Hr_style" /> </Col><Col> <h4>版面預覽</h4></Col><Col> <Divider variant="middle" id="Hr_style" /></Col>
                    </Row>
                    <Row><Col>
                        <Carousel>
                            {this.state.Carousel_Item}
                        </Carousel>

                    </Col></Row>
                </Container>
                <Container Style="text-align:center">
                    <Row className="Row_Title">
                        <Col><Divider variant="middle" id="Hr_style" /> </Col><Col> <h4>圖片顯示設定</h4></Col><Col> <Divider variant="middle" id="Hr_style" /></Col>
                    </Row>
                    {this.state.SetShowImg}
                    <Button variant="primary" type="submit" className="width_60" onClick={this.handleClickOpen_Dialog} disabled={this.state.UploadShowSetStatus}><CloudUploadIcon /> 顯示狀態｜更新</Button>


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
                                    <option id="Store_4">第四畫面</option>
                                    <option id="Store_5">第五畫面</option>
                                </Form.Control>

                            </Col>
                            <Col>
                                <Form.Group controlId="checkbox_HideStatus">
                                    <Form.Check type="checkbox" label="隱藏" />
                                </Form.Group>
                            </Col>
                        </Row >
                        <Row>
                            <Col className="text-center col-8"></Col>
                            <Col className={"text-center"}>
                                <Button id="image_btn_SetImg" variant="secondary" onClick={() => { $("#file_input").click() }} ><CropOriginalIcon /> 檔案</Button>
                            </Col>
                        </Row>

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
            </div>

        )
    }

}

export default withRouter(StorePage);
