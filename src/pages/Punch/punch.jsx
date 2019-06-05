import React, { Component } from 'react';
import {
    Row,
    Col, Card, CardBody,
    Badge, CardHeader,
    Button, ButtonGroup
} from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Layout, Menu, Modal } from "antd";
import { NavLink } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import _columns from './_columns'
import "antd/dist/antd.css";
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'

const { Header, Content, Footer } = Layout;

const { SearchBar } = Search;
const paginationOptions = {
    paginationSize: 5,
    sizePerPage: 5,
    showTotal: true
};

class MyButton extends Component {

    render(){
        return(
            <div>
                <Button color="primary" onClick={this.props.onClick} >{ this.props.label }</Button>
            </div>
    )}
}

class punch extends Component {

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
    handleOk = e => {
        this.mycsvtool.props.onExport();
        this.setState({
          visible: false,
        });
      };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    constructor(props) {
        super(props);
        this.columns = _columns(this.updateGoods);
        this.state = Object.assign({}, {
            messageNum: props.num,
            locked: false,
            choice: 2,
            visible: false,
            fakeData: [],
        });

        this.addBadge = this.addBadge.bind(this);
        this.resetBadge = this.resetBadge.bind(this);
        this.mycsvtool = null;

    }

    updateGoods = (num, goods) => {
        this.props.updateGoods(num, goods)
    }

    static getDerivedStateFromProps(nextProps, pervState){
        if(nextProps.num !== pervState.messageNum && nextProps.num !== undefined){
            return {
                messageNum: nextProps.num,
            }
        }

        if(pervState.fakeData !== nextProps.fakeData && nextProps.fakeData !== undefined){
            const newData = nextProps.fakeData.map((item) => {return {...item}});
            return{
                fakeData: newData
            }
        }
       
        return null;
    }

    addBadge(){
        // this.props.getFakeData();
        this.props.addMessageNum(10);
    }
    
    resetBadge(){
        this.props.resetMessageNum()
    }

    componentDidMount(){
        this.props.getFakeData();
    }

    render() {

        return (
            <div className="animated fadeIn">

                <Layout className="layout">
                    <Header>
                        <Row>
                            <div className="logo" style={{ paddingTop: "10px", paddingRight: "300px", textAlign: "left" }}>
                                <h3 style={{ color: "white" }}>每日打卡 <Badge color="primary">New</Badge></h3>
                            </div>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={[]}
                            >
                                <Menu.Item key="1" onClick={() => this.setState({ choice: 1, })}>
                                    <NavLink to="/choosehome/formik">
                                        { this.state.choice === 1 ? <Button color="primary" size="lg">点击跳转</Button> :
                                            <Button color="warning" size="sm">点击跳转</Button> }
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="2" onClick={() => this.setState({
                                    choice: 2,
                                })}>
                                    { this.state.choice === 2 ? <Button size="lg" color="primary">每日榜单</Button> :
                                        <Button color="warning"> 每日榜单 </Button>}
                                </Menu.Item>
                                <Menu.Item key="3" onClick={() => this.setState({
                                    choice: 3,
                                })}>
                                    {this.state.choice === 3 ? <Button color="primary" size="lg">总榜单</Button> :
                                        <Button color="warning"> 总榜单 </Button>}
                                </Menu.Item>

                                <Menu.Item key="4" onClick={() => this.setState({
                                    choice: 4,
                                })}>
                                    {this.state.choice === 4 ? <Button color="primary" size="lg">小组数据</Button> :
                                        <Button color="warning">小组数据</Button>}
                                </Menu.Item>

                                <Menu.Item key="5" onClick={() => this.setState({
                                    choice: 5,
                                })}>
                                    {this.state.choice === 5 ? <Button color="primary" size="lg">我的</Button> :
                                        <Button color="warning">我的</Button>}
                                </Menu.Item>

                                 <Menu.Item className="d-md-down-none">
                                        <i className="icon-bell"></i>
                                        <Badge pill color="danger">
                                            { this.state.messageNum < 99 ? this.state.messageNum : "99+" }
                                        </Badge>
                                </Menu.Item> 

                            </Menu>
                        </Row>
                    </Header>

                    <Content style={{ padding: '16px 50px' }}>
                        <Row style={{ paddingTop: 30 }}>
                        <Col xs={6} md={6} sm={6} style={{ paddingLeft: "10px" }}>
                        <CardBody style={{ borderRadius:20 }} className="text-white bg-warning">
                            
                                <div className="d-block text-center">
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickFormik} tabIndex="1">
                                        <Row style={{ marginLeft: "20px" }}>
                                            <strong>
                                                <i className="fa fa-calendar-o fa-5x"></i>
                                            </strong>
                                            <h3>日期</h3>
                                        </Row>
                                    </a>
                                </div>
                        </CardBody>
                        </Col>

                        <Col xs={6} md={6} sm={6} style={{ paddingLeft: "10px" }}>
                            <CardBody style={{ borderRadius:20, marginLeft: "20px" }} className="text-white bg-warning">
                                <div className="d-block text-center" style={{ marginLeft: "20px" }}>
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickPunch} tabIndex="1">
                                        <Row>
                                            <strong>
                                                <i className="fa fa-globe fa-5x"></i>
                                            </strong>
                                            <h3>统计人数</h3>
                                        </Row>
                                    </a>
                                </div>
                            </CardBody>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: 30 }}> 
                        <Col xs={6} md={6} sm={6} style={{ paddingLeft: "10px" }}>
                            <CardBody style={{ borderRadius:20 }} className="text-white bg-warning">
                                <div className="d-block text-center" style={{ marginLeft: "20px" }}>
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickFormik} tabIndex="2">
                                        <Row>
                                            <strong>
                                                <i className="fa fa-user-o fa-5x"></i>
                                            </strong>
                                            <h3>打卡人数</h3>
                                        </Row>
                                    </a>
                                </div>
                                </CardBody>
                        </Col>
                            <Col xs={6} md={6} sm={6} style={{ paddingLeft: 10 }}>
                            <CardBody style={{ borderRadius:20, marginLeft: "20px" }} className="text-white bg-warning">
                            
                                <div className="d-block text-center" style={{ marginLeft: "20px" }}>
                                    {/* eslint-disable-next-line */}
                                    <a className="text-center inline-block anchor" onClick={this.handleClickPunch} tabIndex="1">
                                        <Row>
                                            <strong>
                                                <i className="fa fa-percent fa-5x"></i>
                                            </strong>
                                            <h3>打卡率</h3>
                                        </Row>
                                    </a>
                                </div>
                            
                            </CardBody>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                            <Col xs={8} md={8} sm={8}>
                                <Card className="text-center bg-muted" style={{ borderRadius: 5 }}>
                                    <CardHeader>
                                        今日打卡情况
                                    </CardHeader>
                                    <CardBody>

                                    <ToolkitProvider
                                        keyField="number"
                                        data={ this.state.fakeData }
                                        columns={ this.columns }
                                        search
                                        exportCSV>
                                        {
                                        props => (
                                            <div>
                                                <Row style={{ marginBottom: "5px" }}>
                                                    <Col style={{ display: "flex", justifyContent: "flex-start" }}>
                                                        <MyButton 
                                                        { ...props.csvProps } 
                                                        onClick={ this.showModal }
                                                        label="导出CSV文件"
                                                        ref={el => this.mycsvtool = el }
                                                        >
                                                        </MyButton>
                                                    </Col>
                                                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <SearchBar { ...props.searchProps } />
                                                    </Col>
                                                </Row>
                                                <BootstrapTable bootstrap4 { ...props.baseProps } pagination={ paginationFactory(paginationOptions) }
                                                striped hover condensed noDataIndication="暂无打卡数据" />
                                            </div>
                                        )}
                                    </ToolkitProvider>
                                       
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Content>

                    <Col xs={4} md={4} sm={4}>
                    <ButtonGroup size="lg">
                            <Button color="primary" size="sm" 
                            onClick={() => this.addBadge()}
                            >点击Badge增加</Button>
                            <Button style={{ paddingLeft: "20px" }} color="danger" size="sm" onClick={() => this.resetBadge()}>清空badge</Button>
                    </ButtonGroup>
                    </Col>

                    <Footer style={{ textAlign: 'left' }}>
                        Design ©2019 Created by JiangHe
                    </Footer>
                </Layout>
                <Modal
                    title="CSV文件导出"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>确定要导出CSV文件吗</p>
                </Modal>
            </div>)
    }
}


export default punch;