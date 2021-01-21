import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import back from '../images/back.svg';
import menu from '../images/menu.png';
import './Header.css';
import './Content.css'
import '../plugins/fontawesome-free/css/all.min.css';
import '../dist/css/alt/adminlte.css';
import $ from 'jquery';
const Config = require("../config")
const API_Url = Config.Post_IP.API_IP;
const API_Port = Config.Post_IP.API_Port;
export default class extends Component {
	backgo() {
		// <Link to="/" />
		history.go(-1)
	}
	componentDidMount() {
		document.title = '後台設定';
	}
	render() {
		return (
			<div className="hold-transition sidebar-mini layout-fixed">
				<header className="header" style={{ height: '100%' }}>
					{/* <button className="back_btn"> */}
						{/* <img style={{ height: '60%' }} src={back} alt="back" /> */}
					{/* </button> */}
					{/* <Link to="/">
					<button className="menu_btn">
						<img style={{ height: '48px',width:'48px'}} src={menu} alt="menu" />
					</button>
					</Link> */}
					<div style={{ backgroundColor: '#333333', height: '80%' }}>
						<div className="headerName" id="headerName">
							後台設定
						</div>
					</div>
					<div className="searchbar" id="searchbar" />
				</header>
				<div className="Content">
                    < Container fluid = "md" >
					<Link to="/StoreSet"><button type="button" id="firstbtn" className="btn btn-block btn-outline-info btn-lg">店家資訊</button></Link>
					<Link to="/UpdateMenu"><button type="button" id="firstbtn" className="btn btn-block btn-outline-info btn-lg">菜單設計</button></Link>
					< Link to = "/StoreData" > < button type = "button" id = "firstbtn" className = "btn btn-block btn-outline-info btn-lg" >營銷資訊</button></Link >
                    </Container>
				</div>
			</div>
		);
	}
}
