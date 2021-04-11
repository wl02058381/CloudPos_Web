import React, { Component } from 'react'; //React Component引入
import './MarketingContent.css';
import $ from 'jquery';
import { Button, Container, Row, Col,  Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Config = require("../../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CanvasJSReact from './assets/canvasjs.react';
import BootstrapTable from 'react-bootstrap-table-next';

const moment = require("moment")
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
class Commodity extends Component {
    constructor(props) {

        super(props);
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleDatePeriod = this.handleDatePeriod.bind(this)
        this.KeyboardDatePickerType = this.KeyboardDatePickerType.bind(this)
        this.GetCommodityAPIData = this.GetCommodityAPIData.bind(this)
        this.CommodityData = this.CommodityData.bind(this)
        this.state = {
            "selectedDate": moment(),
            "PeriodType": "day",
            "KeyboardDatePicker_view_Commodity": ["year", "month", "date"],
            "KeyboardDatePicker_format_Commodity": "yyyy-MM-dd",
            "TableElement": null,
            "ChartElement": null,
            "StoreID": "",
            "APIData": null,

        };

    }

    componentDidMount() {
        document.title = "商品統計"
        this.KeyboardDatePickerType()
        this.GetCommodityAPIData();
    }


    GetCommodityAPIData() {
        var StoreID = getParameterByName("s");
        var DateType = this.state.PeriodType
        var DateTime = moment(this.state.selectedDate).format("YYYY-MM-DD")

        console.log( "DateTime", DateTime, "DateType", DateType )
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "StoreID": StoreID, "DateTime": DateTime, "DateType": DateType });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_Url + ':' + API_Port +"/FoodStatistics ", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                var APIData = JSON.parse(result)
                console.log(APIData)
                this.setState({ "APIData": APIData })
                this.CommodityData()
            }.bind(this))
            .catch(error => console.log('error', error));

    }


    CommodityData() {
        var APIData = this.state.APIData

        
        var Data = [];
        var TableOpthion = [];
        var Food = APIData.Food
        for (var i in APIData.Middle.data) {
            let FoodID = APIData.Middle.data[i].FoodID
            let FoodName = Food[FoodID].FoodName
            let FoodStatistics = APIData.Middle.data[i]
            FoodStatistics['index'] = parseInt(i) + 1
            FoodStatistics['FoodName'] = FoodName
            Data.push(FoodStatistics)

            TableOpthion.push({ label: FoodName, y: FoodStatistics.Count })

        }

        const columns = [{
            dataField: 'index',
            text: '編號',
            sort: true
        }, {
            dataField: 'FoodName',
            text: '餐點',

        }, {
            dataField: 'Count',
            text: '數量',
            sort: true
        }];

        var Table = <BootstrapTable keyField='id' data={Data} columns={columns} />

        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "餐點數量統計"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}份",
                // showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}份",
                dataPoints: TableOpthion
            }]
        }

        var Chart;
        if(TableOpthion.length  != 0){
            Chart = <CanvasJSChart options={options} />
        }
        
        this.setState({ TableElement: Table, ChartElement: Chart })
    }


    //時間處理

    handleDateChange(date) {
        console.log("date", date)
        date = moment(date)
        // this.state.selectedDate = date;

        this.setState({ selectedDate: date }, () => {
            this.GetCommodityAPIData()
        })
    };

    handleDatePeriod() {
        var Period = $("[name=Period_Commodity]").val()
        console.log(`${Period}`)
        this.setState({ PeriodType: Period }, () => {
            this.GetCommodityAPIData()
            this.KeyboardDatePickerType()
        })

    }

    KeyboardDatePickerType() {
        var ThisDay = this.state.selectedDate
        var PeriodType = this.state.PeriodType
        var KeyboardDatePicker_view_Commodity;
        var KeyboardDatePicker_format_Commodity;
        if (PeriodType == "year") {
            KeyboardDatePicker_view_Commodity = ["year"]
            KeyboardDatePicker_format_Commodity = "yyyy"
        } else if (PeriodType == "month") {
            KeyboardDatePicker_view_Commodity = ["year", "month"]
            KeyboardDatePicker_format_Commodity = "yyyy-MM"
        } else if (PeriodType == "day") {
            KeyboardDatePicker_view_Commodity = ["year", "month", "date"]
            KeyboardDatePicker_format_Commodity = "yyyy-MM-dd"
        }

        this.setState({
            "KeyboardDatePicker_view_Commodity": KeyboardDatePicker_view_Commodity,
            "KeyboardDatePicker_format_Commodity": KeyboardDatePicker_format_Commodity,
        })




    }



    render() {


        return (
            <div>
                <Container>
                    <Row>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1" >
                                    <Form.Label>時間區間</Form.Label>
                                    <Form.Control as="select" name="Period_Commodity" defaultValue={this.state.PeriodType} onChange={this.handleDatePeriod}>
                                        <option value="year" >年</option>
                                        <option value="month">月</option>
                                        <option value="day">日</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <KeyboardDatePicker
                                    views={this.state.KeyboardDatePicker_view_Commodity}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format={this.state.KeyboardDatePicker_format_Commodity}
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Col>
                        </MuiPickersUtilsProvider>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.ChartElement}
                        </Col>
                    </Row>
                    <Row style={{ "margin-top": "20px" }}>
                        <Col>
                            {this.state.TableElement}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Commodity;
