import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch, Redirect, IndexRoute } from 'react-router-dom';
// import Header from './Components/Header';
import Content from './Components';
import AddMenu from './Components/AddMenu/AddMenu';
import AddChoice from './Components/AddMenu/AddChoice/AddChoice';
import AddChoice_Add from './Components/AddMenu/AddChoice/AddChoice_Add/AddChoice_Add';
import AddRadio_Add from './Components/AddMenu/AddRadio/AddRadio_Add/AddRadio_Add';
import AddRadio from './Components/AddMenu/AddRadio/AddRadio';
import AddType from './Components/AddMenu/AddType/AddType';
import StoreSet from './Components/StoreInfo/StoreSet';
import StoreSet_img from './Components/StoreInfo/StoreSet_img';
import StoreSet_img_2 from './Components/StoreInfo/StoreSet_img_2';
import StoreSet_QR from './Components/StoreInfo/StoreSet_QR';
import UpdateMenu from './Components/UpdateMenu/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditMenu from './Components/EditMenu/EditMenu';
import EditChoice from './Components/EditMenu/EditChoice/EditChoice';
import EditRadio from './Components/EditMenu/EditRadio/EditRadio';
import EditType from './Components/EditMenu/EditType/EditType';
import StoreData from './Components/StoreData/StoreDataTabs';
import HistoryCancelOrder from './Components/StoreData/HistoryCancelOrder'
// var reactjsAdminlte = require('adminlte-reactjs');
//解析url

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/" component={Content} />
						<Route exact path="/AddMenu" component={AddMenu} />
						<Route exact path="/AddChoice" component={AddChoice} />
						<Route exact path="/AddRadio" component={AddRadio} />
						<Route exact path="/AddType" component={AddType} />
						{/* <Route exact path="/StoreInfo" component={StoreInfo} /> */}
						<Route exact path="/UpdateMenu" component={UpdateMenu} />
						<Route exact path="/EditMenu" component={EditMenu} />
						<Route exact path="/EditChoice" component={EditChoice} />
						<Route exact path="/EditRadio" component={EditRadio} />
						<Route exact path="/EditType" component={EditType} />
						<Route exact path="/AddChoice_Add" component={AddChoice_Add} />
						<Route exact path="/AddRadio_Add" component={AddRadio_Add} />
						<Route exact path="/StoreSet"  component={StoreSet} />
						<Route exact path="/StoreSet_img"  component={StoreSet_img} />
						<Route exact path="/StoreSet_img_2" component={StoreSet_img_2} />
						<Route exact path="/StoreSet_QR"  component={StoreSet_QR} />
						< Route exact path = "/StoreData" component = {StoreData}/>
						< Route exact path = "/HistoryCancelOrder" component = {HistoryCancelOrder}/>
					</Switch>
				</Router>
				{/* <AddMenu/> */}
				{/* <Header /> */}
				{/* <SideBar_1 />
        <SideBar2 /> */}
			</div>
		);
	}
}

export default App;
