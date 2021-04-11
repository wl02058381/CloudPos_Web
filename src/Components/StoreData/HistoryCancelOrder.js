import React, { Component } from 'react'; //React Component引入
import './StoreDataTabs.css';
import $ from 'jquery';
import { Button, Container, Row, Col,  Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Prompt } from 'react-router-dom';
import Operate from './operate';
import MarketingContent from './MarketingContent';
import Commodity from './Commodity';
import BootstrapTable from 'react-bootstrap-table-next';
import BootstrapTable1 from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';


const moment = require("moment")
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
class HistoryCancelOrder extends Component {
    constructor(props) {

        super(props);
        this.OrderDataToRow = this.OrderDataToRow.bind(this)
        this.GetMenuInfo = this.GetMenuInfo.bind(this)
        //時間區間處理
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleDatePeriod = this.handleDatePeriod.bind(this)
        this.KeyboardDatePickerType = this.KeyboardDatePickerType.bind(this)
        this.GetOrderData = this.GetOrderData.bind(this)
        this.state = {
            "OrderData": null,
            "OrderTable": null,
            "StoreID": "",
            "API_UrL": API_Url + ':' + API_Port ,
            "MenuInfo": null,
            "selectedDate": moment(),
            "PeriodType": "day",
            "KeyboardDatePicker_view_HistoryCancelOrder": ["year", "month", "date"],
            "KeyboardDatePicker_format_HistoryCancelOrder": "yyyy-MM-dd",
        };

    }

    componentDidMount() {
        document.title = "歷史訂單"
        this.GetMenuInfo()
    }


    GetMenuInfo() {
        //取得菜單資訊
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
        return new Promise((resolve, reject) => {
            fetch(this.state.API_UrL + "/ShowSetMenu", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)                    
                    let MenuInfo =  JSON.parse(result)
                    console.log("MenuInfo",MenuInfo)
                    this.setState({ MenuInfo: MenuInfo }, () => {
                        this.GetOrderData()
                    })
                    resolve(JSON.parse(result))
                    
            }.bind(this))
            .catch(error => console.log('error', error));
        })
       
    }

    GetOrderData() {
        var StoreID = getParameterByName("s");
        var DateType = this.state.PeriodType
        var DateTime = moment(this.state.selectedDate).format("YYYY-MM-DD")
        // 取得歷史訂單
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log( "DateTime", DateTime, "DateType", DateType )


        var raw = JSON.stringify({ "StoreID": StoreID, "DateTime": DateTime, "DateType": DateType  });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(this.state.API_UrL + "/OrderCancelHistory", requestOptions)
            .then(response => response.text())
            .then((result) => {
                // console.log(result)
                this.setState({ OrderData: JSON.parse(result) }, () => {
                    // this.OrderDataToRow()
                    
                    this.OrderDataToRow()

                })
            })
            .catch(error => console.log('error', error));
    }


    //時間處理
    handleDateChange(date) {
        console.log("date", date)
        date = moment(date)
        // this.state.selectedDate = date;

        this.setState({ selectedDate: date }, () => {
            this.GetOrderData()
        })
    };

    handleDatePeriod() {
        var Period = $("[name=Period_HistoryCancelOrder]").val()
        console.log(`${Period}`)
        this.setState({ PeriodType: Period }, () => {
            this.GetOrderData()
            this.KeyboardDatePickerType()
        })

    }

    KeyboardDatePickerType() {
        var ThisDay = this.state.selectedDate
        var PeriodType = this.state.PeriodType
        var KeyboardDatePicker_view_HistoryCancelOrder;
        var KeyboardDatePicker_format_HistoryCancelOrder;
        if (PeriodType == "year") {
            KeyboardDatePicker_view_HistoryCancelOrder = ["year"]
            KeyboardDatePicker_format_HistoryCancelOrder = "yyyy"
        } else if (PeriodType == "month") {
            KeyboardDatePicker_view_HistoryCancelOrder = ["year", "month"]
            KeyboardDatePicker_format_HistoryCancelOrder = "yyyy-MM"
        } else if (PeriodType == "day") {
            KeyboardDatePicker_view_HistoryCancelOrder = ["year", "month", "date"]
            KeyboardDatePicker_format_HistoryCancelOrder = "yyyy-MM-dd"
        }

        this.setState({
            "KeyboardDatePicker_view_HistoryCancelOrder": KeyboardDatePicker_view_HistoryCancelOrder,
            "KeyboardDatePicker_format_HistoryCancelOrder": KeyboardDatePicker_format_HistoryCancelOrder,
        })




    }


    //歷史訂單資訊


    OrderDataToRow() {
        let Order = this.state.OrderData.Order
        let Item = this.state.OrderData.Item


        for (var i in Order) {

            Order[i]["Index"] = parseInt(i) + 1
            if (Order[i].DiningStyle == "Intermal") {
                Order[i].DiningStyle = "內用"
            } else if (Order[i].DiningStyle == "TakeOut") {
                Order[i].DiningStyle = "外帶"
            }

            if (Order[i].Paid == "1") {
                Order[i].Paid = "已付款"
            } else {
                Order[i].Paid = "未付款"
            }
        }


        const columns = [
            { dataField: 'Index', text: '序號', sort: true },
            { dataField: 'MealID', text: '訂單編號', sort: true },
            { dataField: 'DataTime', text: '時間', sort: true },
            { dataField: 'DiningStyle', text: '用餐', sort: true },
            { dataField: 'TotalPrice', text: '金額', sort: true },
            { dataField: 'Paid', text: '付款狀態', sort: true },
        ];

        const columns_Item = [
            { dataField: 'Index', text: '序號', sort: true, align: 'left' },
            { dataField: 'name', text: '餐點', sort: true },
            { dataField: 'Count', text: '份數', sort: true },
            { dataField: 'ItemPrice', text: '單價', sort: true },
            { dataField: 'TotalPrice', text: '合計', sort: true },
        ];


        var ItemData = []
        const expandRow = {
            parentClassName: 'parent-expand-foo',
            renderer: row => (
                <div>
                    <h3>{`${row.Index}. 訂單項目`}</h3>
                    <BootstrapTable1 bordered={false} keyField='Index' data={ItemData} columns={columns_Item} />
                </div>
            ),

            onExpand: (row, isExpand, rowIndex, e) => {
                ItemData = []
                console.log("ItemList", Order[row.Index - 1])
                let ItemList = eval(Order[row.Index - 1].ItemIDList);
                console.log("ItemList", ItemList)
                let MenuInfo = this.state.MenuInfo
                let FoodList = MenuInfo["Food"]
                for (var item in ItemList) {
                    console.log(item, ItemList[item])
                    let ItemID = ItemList[item]
                    let OneItem = Item[ItemID]
                    let Table_Index = parseInt(item) + 1
                    let Item_Row = {
                        "Index": Table_Index,
                        "name": FoodList[OneItem.FoodID].FoodName,
                        "Count": OneItem.Count,
                        "ItemPrice": OneItem.ItemPrice,
                        "TotalPrice": parseInt(OneItem.Count) * parseInt(OneItem.ItemPrice),
                    }
                    // console.log(Table_Index,":",Item_Row)
                    ItemData.push(Item_Row) //Item's data Row

                    var ChoiceIDList = eval(Item[ItemList[item]].ChoiceIDList)
                    for (var item_choice in ChoiceIDList) {
                        let Choice = ChoiceIDList[item_choice];
                        console.log(Choice)
                        let Item_Row = {
                            "Index": Table_Index + "." + (parseInt(item_choice) + 1),
                            "name": Choice.ChoiceName,
                            "Count": OneItem.Count,
                            "ItemPrice": Choice.Price,
                            "TotalPrice": parseInt(OneItem.Count) * parseInt(Choice.Price),
                        }
                        ItemData.push(Item_Row) //Choice's data Row
                    }
                    // console.log(ChoiceIDList)
                }
                console.log(ItemData)


            },
            onlyOneExpanding: true
        };

        this.setState({ OrderTable: <BootstrapTable keyField='OrderID' data={Order} columns={columns} pagination={paginationFactory()} expandRow={expandRow} /> })



    }




    render() {

        return (
            <div>
                <Container>

                    <Row>
                        <Col style={{ "margin-top": "20px" }}>
                            <h2>歷史訂單</h2>
                        </Col>
                    </Row>
                    {/* 時間區間 */}
                    <Row>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1" >
                                    <Form.Label>時間區間</Form.Label>
                                    < Form.Control as = "select"
                                    name = "Period_HistoryCancelOrder"
                                    defaultValue = {
                                        this.state.PeriodType
                                    }
                                    onChange = {
                                        this.handleDatePeriod
                                    } >
                                        <option value="year" >年</option>
                                        <option value="month">月</option>
                                        <option value="day">日</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <KeyboardDatePicker
                                    views={this.state.KeyboardDatePicker_view_HistoryCancelOrder}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format={this.state.KeyboardDatePicker_format_HistoryCancelOrder}
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Col>
                        </MuiPickersUtilsProvider>
                    </Row>

                    {/* 歷史清單表格 */}
                    <Row>
                        <Col>
                            {this.state.OrderTable}
                        </Col>
                    </Row>
                </Container>



                {/* <Tabs defaultActiveKey="operate"  id="left-tabs-example" style={{"margin-top":"10px","padding-bottom":"0"}}>
                    <Tab eventKey="operate" title="營業資訊">
                        <Operate />
                    </Tab>
                    <Tab eventKey="marketing" title="餐點資訊">
                        <Commodity />
                    </Tab>
                    
                </Tabs> */}

            </div>
        )
    }
}

export default HistoryCancelOrder;
