import React, { Component } from 'react';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'
import {
    Row, Col, 
    Button,
    Card, CardHeader, CardBody, CardFooter
} from 'reactstrap';
import { Modal } from 'antd';
import "antd/dist/antd.css";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import _columnsMenuContent from './_columns'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const { SearchBar } = Search;
const paginationOptions = {
    paginationSize: 5,
    sizePerPage: 10,
    showTotal: true
};

class MenuContent extends Component {

    constructor(props) {
        super(props);
        this.columns = _columnsMenuContent(this.openPic, props);
        this.state = Object.assign({}, {
            menuFoodContent: props.menuFoodContent,
            visible: false,
            picUrl: null
        });

    }

    openPic = (src) => {
        this.setState({
            visible: true,
            picUrl: src,
        });
    }

    handleClose = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Row style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                    <Col xs={12} md={12} sm={12}>
                        <Card className="text-center bg-muted" style={{ borderRadius: 5 }}>
                            <CardHeader>
                                菜品信息
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider
                                    keyField="foodName"
                                    data={this.state.menuFoodContent}
                                    columns={this.columns}
                                    search>
                                    {
                                        props => (
                                            <div>
                                                <Row style={{ marginBottom: "5px" }}>
                                                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <SearchBar {...props.searchProps} />
                                                    </Col>
                                                </Row>
                                                <BootstrapTable bootstrap4 {...props.baseProps} style={{ textAlignVertical: 'center', }}
                                                    pagination={paginationFactory(paginationOptions)}
                                                    striped hover condensed />
                                            </div>
                                        )}
                                </ToolkitProvider>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Button style={{ marginLeft: "10px" }}
                                        onClick={() => {
                                            const { history } = this.props
                                            history.push("/choosehome/allfoodlist/editchildmenu/0/" + this.props.motherId)
                                        }}
                                        color="primary" outline>
                                        增加Child菜单
                                    </Button>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title="菜品图片展示"
                    visible={this.state.visible}
                    onOk={this.handleClose}
                    onCancel={this.handleClose}>
                    <Row  style={{ design: "flex", justifyContent: "center"}}>
                        <img src={this.state.picUrl} alt="null" style={{ width: '300px', height: '300px'}}></img>
                    </Row>
                </Modal>
            </div>
        )
    }

}

export default MenuContent;