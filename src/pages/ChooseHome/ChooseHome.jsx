import React, { Component } from 'react';
import {
    Row, Col,
    Card, CardHeader, CardBody,
} from 'reactstrap'

class ChooseHome extends Component {

    constructor(props) {
        super(props);
        this.handleClickFormik = this.handleClickFormik.bind(this);
        this.handleClickPunch = this.handleClickPunch.bind(this);
        this.handleClickDashBoard = this.handleClickDashBoard.bind(this);
        this.handleClickFakePay = this.handleClickFakePay.bind(this);
        this.handleClickFood = this.handleClickFood.bind(this);
        this.handleClickFoodInfoList = this.handleClickFoodInfoList.bind(this);
        this.handleClickAllFoodList = this.handleClickAllFoodList.bind(this);
    }

    handleClickFormik() {
        const { history } = this.props;
        history.push('/choosehome/formik');
    }

    handleClickDashBoard() {
        const { history } = this.props;
        history.push('/dashboard');
    }

    handleClickPunch() {
        const { history } = this.props;
        history.push('/choosehome/punch');
    }

    handleClickFakePay() {
        const { history } = this.props;
        history.push('/choosehome/fakepay');
    }

    handleClickFood() {
        const { history } = this.props;
        history.push('/choosehome/food');
    }

    handleClickFoodInfoList() {
        const { history } = this.props;
        history.push('/choosehome/foodinfolist');
    }

    handleClickAllFoodList() {
        const { history } = this.props;
        history.push('/choosehome/allfoodlist');
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <Card>
                    <CardHeader>
                        <strong>Function Menu</strong>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickFormik} tabIndex="1">
                                        <strong>
                                            <i className="fa fa-user-o fa-5x"></i>
                                        </strong>
                                        <h3>Formik测试</h3>
                                    </a>
                                </div>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickPunch} tabIndex="2">
                                        <strong>
                                            <i className="fa fa-bookmark-o fa-5x"></i>
                                        </strong>
                                        <h3>打卡界面</h3>
                                    </a>
                                </div>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickDashBoard} tabIndex="3">
                                        <strong>
                                            <i className="fa fa-bars fa-5x"></i>
                                        </strong>
                                        <h3>DashBoard</h3>
                                    </a>
                                </div>
                            </Col>
                        </Row>

                        <Row style={{ paddingTop: "100px" }}>
                            <Col xs={4} md={4} sm={4}>
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickFakePay} tabIndex="4">
                                        <strong>
                                            <i className="fa fa-credit-card fa-5x"></i>
                                        </strong>
                                        <h3>FAKE PAY</h3>
                                    </a>
                                </div>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickFood} tabIndex="4">
                                        <strong>
                                            <i className="fa fa-apple fa-5x"></i>
                                        </strong>
                                        <h3>点评界面</h3>
                                    </a>
                                </div>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickFoodInfoList} tabIndex="5">
                                        <strong>
                                            <i className="fa fa-cart-plus fa-5x"></i>
                                        </strong>
                                        <h3>订单列表</h3>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "100px" }}>
                            <Col xs={4} md={4} sm={4}>
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickAllFoodList} tabIndex="5">
                                        <strong>
                                            <i className="fa fa-lemon-o fa-5x"></i>
                                        </strong>
                                        <h3>所有商品</h3>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default ChooseHome;