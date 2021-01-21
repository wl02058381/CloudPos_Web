import React, { Component } from 'react'; //React Component引入
import './StoreDataTabs.css';
import $ from 'jquery';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Operate from './operate';
import Commodity from './Commodity';
import HistoryOrder from './HistoryOrder';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
import creatHistory from 'history/createHashHistory';
import {Link,withRouter} from 'react-router-dom';
import HistoryCancelOrder from './HistoryCancelOrder';
const moment = require("moment")

class StoreDataTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(),
        };

    }
    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    componentDidMount() {
        document.title = "營銷資訊"
    }
    render() {
        return (
            <div>
                < title >營銷資訊</title>
                <header className="header" style={{ height: '100%' }}>
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

                    <div style={{ backgroundColor: '#333333', height: '80%' }}>
                        <div className="headerName" id="headerName">
                            營銷資訊
						</div>
                    </div>
                </header>
                <Tabs defaultActiveKey="operate" id="uncontrolled-tab-example" style={{"margin-top":"10px","padding-bottom":"0"}}>
                    <Tab eventKey="operate" title="營業資訊">
                        <Operate />
                    </Tab>
                    <Tab eventKey="marketing" title="餐點資訊">
                        <Commodity />
                    </Tab>
                    <Tab eventKey="history" title="歷史訂單">
                        <HistoryOrder />
                    </Tab>
                    <Tab eventKey="HistoryCancelOrder" title="訂單取消紀錄">
                        <HistoryCancelOrder />
                    </Tab>
                </Tabs>

            </div>
        )
    }
}

export default StoreDataTabs;
