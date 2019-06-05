import React, { Component } from 'react';
import {
    Row,
} from 'reactstrap';
import { Menu, Icon, Col } from 'antd';
import "antd/dist/antd.css";


class FakePayHeader extends Component {

    constructor(props) {
        super(props);

        this.state = Object.assign({}, {
        });

    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row style={{display:"flex", justifyContent:"center"}}>
                <Col >
                    <Menu
                        onClick={null}
                        selectedKeys={[]}
                        mode="horizontal"
                        style={{background:"orange"}}
                        theme="light">
                        <Menu.Item key="1" onClick={() => {this.props.changePage(1)}}>
                            <Icon type="mail" />安全管家
                        </Menu.Item>
                        <Menu.Item key="2" onClick={() => {this.props.changePage(2)}}>
                            <Icon type="edit" />安全工具
                        </Menu.Item>
                        <Menu.Item key="3" onClick={() => {this.props.changePage(3)}}>
                            <Icon type="font-size" />安全联盟
                        </Menu.Item>
                        <Menu.Item key="4" onClick={() => {this.props.changePage(4)}}>
                            <Icon type="ordered-list" />安全贴士
                        </Menu.Item>
                    </Menu>
                    </Col>
                </Row>
            </div>)
    }
}

export default FakePayHeader;