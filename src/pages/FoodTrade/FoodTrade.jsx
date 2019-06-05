import React, { Component } from 'react';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'
import {
    Row, Button,
    Col, Card, CardBody,
    CardHeader,
} from 'reactstrap';
import CardLocker from '../../MyWidgets/CardLocker';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import _columns from './_columns'
import "antd/dist/antd.css";
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const { SearchBar } = Search;
const paginationOptions = {
    paginationSize: 5,
    sizePerPage: 10,
    showTotal: true
};

class MyButton extends Component {

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.props.onClick} >{this.props.label}</Button>
            </div>
        )
    }
}

class FoodTrade extends Component {

    constructor(props) {
        super(props);
        this.columns = _columns(this.isReady, this.isFinished);
        this.state = Object.assign({}, {
            foodinfolist: props.foodInfoList,
            locked: props.lock,
        });

        this.mycsvtool = null;

    }

    componentDidMount() {
        this.props.getAllFoodInfoList();
    }

    showModal() {
        console.log('未添加该功能')
    }

    static getDerivedStateFromProps(nextProps, pervState) {
        //更改订单信息时
        if (pervState.foodinfolist !== nextProps.foodInfoList &&
            nextProps.foodInfoList !== undefined) {
            return {
                foodinfolist: nextProps.foodInfoList,
                locked: nextProps.lock
            }
        }

        //更改Ready或Finished状态时
        if (pervState.locked !== nextProps.lock &&
            nextProps.lock !== undefined) {
            return {
                locked: nextProps.lock
            }
        }

        return null;
    }

    isReady = (id, nowReady) => {
        this.props.changeTriggerReady(id, !nowReady)
    }

    isFinished = (id, nowFinished) => {
        this.props.changeTriggerFinished(id, !nowFinished)
    }

    render() {
        return (
            <div>
                <Row style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                    <Col xs={8} md={8} sm={8}>
                        <Card className="text-center bg-muted" style={{ borderRadius: 5 }}>
                            <CardHeader>
                                点餐界面
                                    </CardHeader>
                            <CardBody>

                                <ToolkitProvider
                                    keyField="id"
                                    data={this.state.foodinfolist}
                                    columns={this.columns}
                                    search
                                    exportCSV>
                                    {
                                        props => (
                                            <div>
                                                <Row style={{ marginBottom: "5px" }}>
                                                    <Col style={{ display: "flex", justifyContent: "flex-start" }}>
                                                        <MyButton
                                                            {...props.csvProps}
                                                            onClick={this.showModal}
                                                            label="导出CSV文件"
                                                            ref={el => this.mycsvtool = el}
                                                        >
                                                        </MyButton>
                                                    </Col>
                                                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <SearchBar {...props.searchProps} />
                                                    </Col>
                                                </Row>
                                                <BootstrapTable bootstrap4 {...props.baseProps} pagination={paginationFactory(paginationOptions)}
                                                    striped hover condensed noDataIndication="暂无点餐数据，等待着开张QAQ" />
                                            </div>
                                        )}
                                </ToolkitProvider>
                            </CardBody>
                            <CardLocker isOpen={this.state.locked} />
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }

}

export default FoodTrade;