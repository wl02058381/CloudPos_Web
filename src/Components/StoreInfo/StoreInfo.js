//店家資訊
import React, { Component } from 'react';
import $ from 'jquery';
import back from '../../images/back.svg';
import menu from '../../images/menu.jpg';
const config = require('../../config');
class StoreInfo extends Component {
    backgo() {
        // <Link to="/" />
        history.go(-1)
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
                    <button className="menu_btn">
                        <img style={{ height: '50%', width: '50%' }} src={menu} alt="menu" />
                    </button>

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
