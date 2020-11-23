//菜單更新
import React, { Component } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import REButton from 'react-bootstrap/Button';
import $ from 'jquery';
import back from '../../../images/back.svg';
import menu from '../../../images/menu.jpg';
import creatHistory from 'history/createHashHistory';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { toast } from 'react-toastify'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';
const Config = require("../../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
const checkboxstatemap = new Map()
import '../../Content.css'
class EditRadio extends Component {

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
            Edit: null,
            AddCard: null,
            ChoiceTypeName: '',
            EditChoiceTypeName: '',
            NewChoiceTypeName: '',
            DelChoiceTypeName: '',
            ChoiceTypeID: '',
            show: false,
            show_Edit: false
        };
        this.type = ""
        // this.ShowChoice = this.ShowChoice.bind(this)
        this.GetChoiceTypeName = this.GetChoiceTypeName.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.reload = this.reload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.GetChoiceTypeName_Edit = this.GetChoiceTypeName_Edit.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleShow_Edit = this.handleShow_Edit.bind(this);
        this.handleClose_Edit = this.handleClose_Edit.bind(this);
        this.EditType = this.EditType.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.DeleteType = this.DeleteType.bind(this)
    }
    handleClose() { this.setState({ show: false }) }
    handleClose_Edit() { this.setState({ show_Edit: false }) }
    handleShow(event) {
        console.log(event.currentTarget.value)
        var ChoiceTypeID = event.currentTarget.value;
        var DelChoiceTypeName = event.currentTarget.id;
        // this.setState({ })
        this.setState({ show: true, ChoiceTypeID: ChoiceTypeID, DelChoiceTypeName: DelChoiceTypeName })
    }
    handleShow_Edit(event) {
        console.log(event.currentTarget.value)
        var ChoiceTypeID = event.currentTarget.value;
        var EditChoiceTypeName = event.currentTarget.id;
        // this.setState({ })
        this.setState({ show_Edit: true, ChoiceTypeID: ChoiceTypeID, EditChoiceTypeName: EditChoiceTypeName })
    }
    EditType(event) {
        var StoreID = this.state.StoreID;
        var ChoiceTypeID = this.state.ChoiceTypeID;
        var NewChoiceTypeName = this.state.NewChoiceTypeName;
        var Check = '1'
        var settings = {
            "url": API_Url + ':' + API_Port + "/UpdateChocieType",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "ChoiceTypeID": ChoiceTypeID,
                "ChoiceTypeName": NewChoiceTypeName,
                "Check": Check
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
            toast.success("成功編輯類別");
        }.bind(this))
    }
    DeleteType(event) {
        var StoreID = this.state.StoreID;
        var ChoiceTypeID = this.state.ChoiceTypeID;
        var settings = {
            "url": API_Url + ':' + API_Port + "/DelChoiceType",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "ChoiceTypeID": ChoiceTypeID
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
            toast.success("成功刪除類別");
        }.bind(this))
    }
    handleEditChange(event) {
        this.setState({ NewChoiceTypeName: event.target.value })
    }
    handleTextChange(event) {
        this.setState({ ChoiceTypeName: event.target.value })
    }
    ShowSetMenu() {
        console.log("Post", API_Url + ':' + API_Port + "/ShowSetMenu")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "StoreID": "S_725d0fd9-4875-4762-8bc8-43404d2d5775" });
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
                window.location.reload()
                event.preventDefault();
            }.bind(this))
            .catch(error => console.log('error', error));
    }
    // 渲染新增Choice類別的卡片
    AddTypeBTN() {
        var AddCard = [];
        AddCard.push(<Card>
            <ListItem>
                <ListItemAvatar>
                    <Checkbox
                        id='add'
                        disabled='true'
                    />
                </ListItemAvatar>
                <TextField onChange={this.handleTextChange} id="outlined-basic" label="類別名稱" variant="outlined" />
                <div style={{ marginLeft: '12px' }}></div>
                <Button
                    variant="contained"
                    color="default"
                    onClick={this.AddTypeAPI}
                    startIcon={<CloudUploadIcon />}
                >
                    確認</Button></ListItem>
        </Card>)
        this.setState({ AddCard: AddCard })
    }
    // Post新增類別的API
    AddTypeAPI() {
        let StoreID = this.state.StoreID;
        let ChoiceTypeName = this.state.ChoiceTypeName;
        var Check = '1'
        var settings = {
            "url": API_Url + ':' + API_Port + "/AddChoiceType",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "StoreID": StoreID,
                "ChoiceTypeName": ChoiceTypeName,
                "Check": Check
            }),
        };
        $.ajax(settings).done(function (response) {
            this.ShowSetMenu();
            toast.success("成功新增類別");
        }.bind(this))
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
        this.setState({ ChoiceTypeList: ChoiceTypeList }, function () {
            console.log("ChoiceTypeList:", this.state.ChoiceTypeList)
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
            if (ChoiceType[ChoiceType_key]["Check"] == "1") {
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
                            <Typography color="textSecondary">
                            <Button
                                onClick={this.handleShow_Edit}
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                            >
                                編輯
                                </Button>
                            </Typography>
                            <Typography color="textSecondary">
                            <Button
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="secondary"
                                onClick={this.handleShow}
                                startIcon={<DeleteIcon />}
                            >
                                刪除
                                </Button>
                            </Typography>
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
                            <Typography color="textSecondary">
                            <Button
                                onClick={this.handleShow_Edit}
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                            >
                                編輯
                                </Button>
                            </Typography>
                            <Typography color="textSecondary">
                            <Button
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="secondary"
                                onClick={this.handleShow}
                                startIcon={<DeleteIcon />}
                            >
                                刪除
                                </Button>
                            </Typography>
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
        // sessionStorage.setItem("ChoiceTypeList", ChoiceTypeList)
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
            if (ChoiceType[ChoiceType_key]["Check"] == "1") {
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
                            <Button
                                onClick={this.handleShow_Edit}
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                            >
                                編輯
                                </Button>
                            <Button
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="secondary"
                                onClick={this.handleShow}
                                startIcon={<DeleteIcon />}
                            >
                                刪除
                                </Button>
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
                            <Button
                                onClick={this.handleShow_Edit}
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                            >
                                編輯
                                </Button>
                            <Button
                                id={ChoiceType[ChoiceType_key]["ChoiceTypeName"]}
                                value={ChoiceType_key}
                                variant="contained"
                                color="secondary"
                                onClick={this.handleShow}
                                startIcon={<DeleteIcon />}
                            >
                                刪除
                                </Button>
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
                            複選項目
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
                                            <Link to="/AddRadio_Add">
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
                <Modal show={this.state.show_Edit} onHide={this.handleClose_Edit}>
                    <Modal.Header closeButton>
                        <Modal.Title><i class="fas fa-edit"></i>編輯視窗</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <TextField
                            id="outlined-read-only-input"
                            label="舊類別名稱"
                            defaultValue={this.state.EditChoiceTypeName}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                        <div style={{ marginTop: '12px' }}></div>
                        <TextField
                            required
                            id="outlined-required"
                            label="新類別名稱"
                            // defaultValue="Hello World"
                            variant="outlined"
                            onChange={this.handleEditChange}
                        />
                        {/* 你確定要刪除<font style={{ color: 'red' }}></font>類別嗎？ */}
                    </Modal.Body>
                    <Modal.Footer>
                        <REButton variant="secondary" onClick={this.handleClose}>
                            關閉
                        </REButton>
                        <REButton variant="success" onClick={this.EditType} id={this.state.ChoiceTypeID}>
                            編輯
                        </REButton>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.show} onHide={this.handleClose_Edit}>
                    <Modal.Header closeButton>
                        <Modal.Title><i class="fas fa-exclamation-triangle text-danger"></i>通知</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >你確定要刪除<font style={{ color: 'red' }}>{this.state.DelChoiceTypeName}</font>類別嗎？</Modal.Body>
                    <Modal.Footer>
                        <REButton variant="secondary" onClick={this.handleClose}>
                            關閉
                        </REButton>
                        <REButton variant="danger" onClick={this.DeleteType} id={this.state.ChoiceTypeID}>
                            刪除
                        </REButton>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default EditRadio;
