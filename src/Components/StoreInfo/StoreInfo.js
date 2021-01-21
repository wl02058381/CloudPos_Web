//店家資訊
import React, { Component } from 'react';
import $ from 'jquery';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
import creatHistory from 'history/createHashHistory';
const config = require('../../config');
import {Link,withRouter} from 'react-router-dom';
class StoreInfo extends Component {
    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    componentDidMount() {
        document.title = '店家資訊';
    }
    render() {
        return (

            <div className="contact-section">
                < title > 店家資訊 </title>
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
                            店家資訊
						</div>
                    </div>
                </header>
                店家資訊
            </div>

        );
    }
}

export default StoreInfo;
