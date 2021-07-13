import React, { Component } from 'react'; //React Component引入
import './StoreDataTabs.css';
import $ from 'jquery';
import { Button, Container, Row, Col,  Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CanvasJSReact from './assets/canvasjs.react';
import BootstrapTable from 'react-bootstrap-table-next';

const moment = require("moment")
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Config = require("../../config")
const API_Url = Config.Post_IP.API_IP;
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
class operate extends Component {
    constructor(props) {

        super(props);
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleDatePeriod = this.handleDatePeriod.bind(this)
        this.KeyboardDatePickerType = this.KeyboardDatePickerType.bind(this)
        this.OperateInitialData = this.OperateInitialData.bind(this)
        this.GetOperateAPIData =this.GetOperateAPIData.bind(this)
        this.state = {
            "selectedDate": moment(),
            "PeriodType": "day",
            "KeyboardDatePicker_view_Operate": ["year", "month", "date"],
            "KeyboardDatePicker_format_Operate": "yyyy-MM-dd",
            "TableData": null,
            "options_dataPoints": null,
            "Chart": null,
            "options": null,
            "options_item": null,
            "TableColumns": [
                { dataField: 'RowName', text: '名稱' },
                { dataField: 'Front', text: '上期' },
                { dataField: 'Middle', text: '本期' },
                { dataField: 'Back', text: '下期' },
            ],
            "TableData": [
                { RowName: "營銷", Front: "0", Middle: "0", Back: "0" },
                { RowName: "訂單數", Front: "0", Middle: "0", Back: "0" },
                { RowName: "平均單價", Front: "0", Middle: "0", Back: "0" },
            ],
            "StoreID": '',
            "APIData": null,
            "ChartAll":null
        };

    }

    componentDidMount() {
        document.title = "營業資訊"
        this.KeyboardDatePickerType()
        this.GetOperateAPIData()        
    }

    handleDateChange(date) {
        console.log("date", date)
        date = moment(date)
        // this.state.selectedDate = date;

        this.setState({ selectedDate: date },()=>{
            this.GetOperateAPIData()
        })
    };

    handleDatePeriod() {
        var Period = $("[name=Period_Operate]").val()
        console.log(`${Period}`)
        this.setState({ PeriodType: Period }, () => {
            this.GetOperateAPIData()
            this.KeyboardDatePickerType()
        })

    }


    GetOperateAPIData(){
        var StoreID = getParameterByName("s");
        var DateType = this.state.PeriodType
        var DateTime= moment(this.state.selectedDate).format("YYYY-MM-DD")
        

        console.log({"DateTime": DateTime, "DateType": DateType})

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({ "StoreID": this.state.StoreID, "DateTime": moment(KeyboardDatePicker_format_Operate).format("yyyy-mm-dd"), "DateType": KeyboardDatePicker_view_Operate });
        var raw = JSON.stringify({ "StoreID": StoreID, "DateTime": DateTime, "DateType": DateType });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
            fetch(API_Url+ "/OperateData", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                    var APIData = JSON.parse(result)
                    console.log(APIData)
                    this.setState({"APIData":APIData},()=>{
                        this.OperateInitialData()
                    })
                    
            }.bind(this))
            .catch(error => console.log('error', error));
        
    }


    KeyboardDatePickerType() {
        var ThisDay = this.state.selectedDate
        var PeriodType = this.state.PeriodType
        var KeyboardDatePicker_view_Operate;
        var KeyboardDatePicker_format_Operate;
        if (PeriodType == "year") {
            KeyboardDatePicker_view_Operate = ["year"]
            KeyboardDatePicker_format_Operate = "yyyy"
        } else if (PeriodType == "month") {
            KeyboardDatePicker_view_Operate = ["year", "month"]
            KeyboardDatePicker_format_Operate = "yyyy-MM"
        } else if (PeriodType == "day") {
            KeyboardDatePicker_view_Operate = ["year", "month", "date"]
            KeyboardDatePicker_format_Operate = "yyyy-MM-dd"
        }

        this.setState({
            "KeyboardDatePicker_view_Operate": KeyboardDatePicker_view_Operate,
            "KeyboardDatePicker_format_Operate": KeyboardDatePicker_format_Operate,
        })

       


    }

    OperateInitialData() {

        var APIData = this.state.APIData
        console.log("APIData", APIData)

        //表格資訊
        var TableData = [
            { id: "Operate", RowName: "營銷" },
            { id: "Count", RowName: "訂單數" },
            { id: "Operate/Count", RowName: "平均單價" }
        ]

        //長條圖資訊
        var options_dataPoints = []
        var options_dataPoints_item = [[], [], []]
        var TableColumns = [
            { dataField: 'RowName', text: '名稱' },
            { dataField: 'Front', text: '上期' },
            { dataField: 'Middle', text: '本期' },
            { dataField: 'Back', text: '下期' },
        ];


        for (var i in APIData) {
            /////資訊
            var id = APIData[i].id //列ＩＤ
            var time = APIData[i].time //列ＩＤ
            var short_time = APIData[i].time.split("-") //列ＩＤ
            short_time = short_time[short_time.length - 1] //列ＩＤ
            var Operate = APIData[i].Operate //營銷金額
            var OrderCount = APIData[i].Count //訂單數
            var OrderPrice = null; //平均訂單價格
            var index = parseInt(i)
            // console.log(i+1,TableColumns[i+1])

            TableColumns[index + 1].text = time


            //長條圖資訊
            var dataPoints = []
            var dataPoints_item = []

            //放入營銷金額
            if(Operate == null ){
                Operate = 0
            }
            TableData[0][id] = Operate
            dataPoints.push({
                label: "營收",
                y: Operate,
                short_time: short_time
            })
            options_dataPoints_item[0].push({ label: time, y: Operate })

            //放入訂單數
            TableData[1][id] = OrderCount
            dataPoints.push({
                label: "訂單數",
                y: OrderCount,
                short_time: short_time
            })
            options_dataPoints_item[1].push({ label: time, y: OrderCount })
            //放入平均訂單價格
            if (OrderCount != 0) { //判斷分母是否為零
                OrderPrice = parseInt((Operate / OrderCount))
            }else{
                OrderPrice = 0
            }
            TableData[2][id] = OrderPrice
            dataPoints.push({
                label: "平均訂單價",
                y: OrderPrice,
                short_time: short_time
            })
            options_dataPoints_item[2].push({ label: time, y: OrderPrice })
            //將長條圖欄位資訊放入

            options_dataPoints.push(dataPoints)


        }


        var options = {
            title: {
                text: "營收資訊"
            },
            subtitles: [{
                    text: `${APIData[1].time} ~ ${APIData[2].time}`
                }],
                axisY: {
                    minimum: -1500
                },
            data: [
                {
                    indexLabel: "{y}",
                    type: "column",
                    dataPoints: options_dataPoints[0]
                },
                {
                    indexLabelMaxWidth: 50,
                    indexLabel: "{y}",
                    type: "column",
                    dataPoints: options_dataPoints[1]
                },
                {
                    indexLabel: "{y}",
                    type: "column",
                    dataPoints: options_dataPoints[2]
                }
            ]
        }


        // console.log(options_dataPoints_item)
        var options_item = {
            "Operate": {
                title: {
                    text: "營收"
                },
                data: [
                    {
                        type: "column",
                        dataPoints: options_dataPoints_item[0]
                    },

                ]
            },
            "Count": {
                title: {
                    text: "訂單數"
                },
                data: [

                    {
                        type: "column",
                        dataPoints: options_dataPoints_item[1]
                    },

                ]
            },
            "Operate/Count": {
                title: {
                    text: "平均訂單價格"
                },
                data: [
                    {
                        type: "column",
                        dataPoints: options_dataPoints_item[2]
                    }
                ]
            }
        }



        console.log("options_dataPoints_item:", options_dataPoints_item)

        
        this.setState({
            "TableData": TableData,
            "options_dataPoints": options_dataPoints,
            "options": options,
            "options_item": options_item,
            "TableColumns": TableColumns,
            "ChartAll": <CanvasJSChart options={options} />,
        }, () => {

            // console.log(TableData,options_dataPoints[0])
        })



    }



    render() {

        // [
        //     { id: "Operate",RowName:"營銷", Front: "230", Middle: "25" ,Back:"null"},
        //     { id: "Count",RowName:"訂單數", Front: "1", Middle: "1" ,Back:"0"},
        //     { id: "Operate/Count",RowName:"平均單價", Front: "230", Middle: "25" ,Back:"null"},
        // ]

        



        const expandRow = {
            parentClassName: 'parent-expand-foo',
            showExpandColumn: true,
            renderer: row => (

                <div>

                    <CanvasJSChart style={{ "weight": "100%" }} options={this.state.options_item[row.id]} />
                </div>
            )

        };

        const products = [
            { id: "Operate", RowName: "營銷", Front: "230", Middle: "25", Back: "null" },
            { id: "Count", RowName: "訂單數", Front: "1", Middle: "1", Back: "0" },
            { id: "Operate/Count", RowName: "平均單價", Front: "230", Middle: "25", Back: "null" },
        ]








        return (
            <div>
                <MuiPickersUtilsProvider  style={{ "weight": "100%" }} utils={DateFnsUtils}>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1" >
                                    <Form.Label>時間區間</Form.Label>
                                    <Form.Control as="select" name="Period_Operate" defaultValue={this.state.PeriodType} onChange={this.handleDatePeriod}>
                                        <option value="year" >年</option>
                                        <option value="month">月</option>
                                        <option value="day">日</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <KeyboardDatePicker
                                    views={this.state.KeyboardDatePicker_view_Operate}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format={this.state.KeyboardDatePicker_format_Operate}
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                
                                {/* {this.state.ChartAll} */}
                            </Col>
                        </Row>

                        <Row style={{ "margin-top": "20px" }}>
                            <Col>
                                <BootstrapTable keyField='id' data={this.state.TableData} columns={this.state.TableColumns} expandRow={expandRow} />
                            </Col>
                        </Row>
                    </Container>







                </MuiPickersUtilsProvider>

            </div>
        )
    }
}

export default operate;
