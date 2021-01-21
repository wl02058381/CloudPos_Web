import React, { Component } from 'react'; //React Component引入
import './MarketingContent.css';
import $ from 'jquery';
import { Button, Container, Row, Col, Carousel, Tab, Tabs, Sonnet, Hr, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CanvasJSReact from './assets/canvasjs.react';

const moment = require("moment")
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MarketingContent extends Component {
    constructor(props) {

        super(props);
        this.state = {
        };

    }

    componentDidMount() {
        document.title = "銷售資訊"
    }
    render() {
        const options = {
            title: {
                text: "Basic Column Chart"
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "Apple", y: 10 },
                        { label: "Orange", y: 15 },
                        { label: "Banana", y: 25 },
                        { label: "Mango", y: 30 },
                        { label: "Grape", y: 28 }
                    ]
                }
            ]
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                        <Button className="MarketingContent_Btn" variant="outline-dark">商品統計</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Button className="MarketingContent_Btn" variant="outline-dark">訂單資訊</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MarketingContent;
