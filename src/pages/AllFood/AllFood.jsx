import React, { Component } from 'react';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'
import {
    Input, Button,
    Row, Col, Card,
    CardBody, CardHeader, CardFooter
} from 'reactstrap';
import InputField from '../../MyWidgets/InputField';
import CardLocker from '../../MyWidgets/CardLocker';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import _columnsMain from './_columns'
import { Modal } from 'antd';
import "antd/dist/antd.css";
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import MenuContent from './MenuContent/MenuContent'

const { SearchBar } = Search;
const paginationOptions = {
    paginationSize: 5,
    sizePerPage: 10,
    showTotal: true
};

class AllFood extends Component {

    constructor(props) {
        super(props);
        this.columns = _columnsMain(this.updateRoot, this.props.history);
        this.state = Object.assign({}, {
            foodinfolist: props.foodAdminList,
            locked: props.lock,
            nonExpandable: [],
            firstMenuVisible: false,
            changeId: 0,
            changeTypeName: null,
            editOrInsert: 0,
        });

        this.updateRoot = this.updateRoot.bind(this);
    }

    updateRoot = (id, typeName) => {
        this.setState({
            changeId: id,
            changeTypeName: typeName,
            editOrInsert: 0,
        })
        this.openEditRoot();
    }

    commitRootMenuInfo = () => {
        this.setState({
            firstMenuVisible: false,
        });
        if (this.state.editOrInsert === 0) {
            this.props.editRootMenuInfo(this.state.changeId,
                this.state.changeTypeName);
        } else {
            this.props.insertMenuInfo(this.state.changeTypeName);
        }

    }

    openEditRoot = () => {
        this.setState({
            firstMenuVisible: true,
        });
    }

    handleClose = e => {
        this.setState({
            firstMenuVisible: false,
        });
    };

    componentDidMount() {
        this.props.getAllAdminFood();
    }

    static getDerivedStateFromProps(nextProps, pervState) {
        if (nextProps.foodAdminList !== undefined && nextProps.foodAdminList !== pervState.foodinfolist) {
            const nonExpandable = [];
            console.log(nextProps.foodAdminList)
            nextProps.foodAdminList.forEach(function (value, index) {
                if (value.menuContent.length === 0)
                    nonExpandable.push(value.typeName);
            });
            return {
                foodinfolist: nextProps.foodAdminList,
                locked: nextProps.lock,
                nonExpandable: nonExpandable
            }
        }
        return null;
    }

    render() {
        const expandRow = {
            renderer: row => (
                <div>
                    <MenuContent history={this.props.history} menuFoodContent={row.menuContent} motherId={row.id}/>
                </div>
            ),
            showExpandColumn: true,
            nonExpandable: this.state.nonExpandable,
            expandHeaderColumnRenderer: ({ isAnyExpands }) => {
                return (
                    isAnyExpands ? <i className="fa fa-commenting" aria-hidden="true"></i> :
                        <i className="fa fa-comment-o" aria-hidden="true"></i>
                )
            },
            expandColumnRenderer: ({ expanded, rowKey, expandable }) => {
                if (expandable) {
                    return (
                        expanded ? <i className="fa fa-sort-asc" aria-hidden="true"></i> :
                            <i className="fa fa-sort-desc" aria-hidden="true"></i>
                    );
                }
                return null
            },
        };

        return (
            <div>
                <Row style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                    <Col xs={8} md={8} sm={8}>
                        <Card className="text-center bg-muted" style={{ borderRadius: 5 }}>
                            <CardHeader>
                                所有菜单
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider
                                    keyField="typeName"
                                    data={this.state.foodinfolist}
                                    columns={this.columns}
                                    search
                                    exportCSV>
                                    {
                                        props => (
                                            <div>
                                                <Row style={{ marginBottom: "5px" }}>
                                                    <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <SearchBar {...props.searchProps} />
                                                    </Col>
                                                </Row>
                                                <BootstrapTable bootstrap4 {...props.baseProps}
                                                    expandRow={expandRow}
                                                    pagination={paginationFactory(paginationOptions)}
                                                    striped hover condensed noDataIndication="暂无菜单数据，等待输入" />
                                            </div>
                                        )}
                                </ToolkitProvider>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Button style={{ marginLeft: "10px" }}
                                        onClick={() => {
                                            this.setState({
                                                changeId: 0,
                                                changeTypeName: "",
                                                editOrInsert: 1
                                            });
                                            this.openEditRoot()
                                        }}
                                        color="primary" outline>
                                        增加root菜单
                                    </Button>
                                </Row>
                            </CardFooter>
                            <CardLocker isOpen={this.state.locked} />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title="一级菜单更改"
                    visible={this.state.firstMenuVisible}
                    onOk={this.commitRootMenuInfo}
                    onCancel={this.handleClose}>
                    <Row style={{ design: "flex", justifyContent: "center", alignItems: "center" }}>
                        <InputField
                            icon="fa fa-gift"
                            label="种类名称">
                            <Input
                                type='text'
                                placeholder='输入菜单名称'
                                onChange={(e) => { this.setState({ changeTypeName: e.target.value, }) }}
                                required
                                value={this.state.changeTypeName} />
                            {this.state.changeId !== 0 ?
                                <Button style={{ marginLeft: "30px" }}
                                    outline color="danger" onClick={() => {
                                        this.handleClose();
                                        this.props.deleteMenuInfo(this.state.changeId);
                                    }}>
                                    删除
                        </Button>
                                : null}
                        </InputField>

                    </Row>
                </Modal>
            </div>
        )
    }

}

export default AllFood;