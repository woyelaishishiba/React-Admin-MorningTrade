import {
    Row, Col,
    Button
} from 'reactstrap';
import React from 'react';

const _columnsMenuContent = (openPic, props) => {
    return ([
        {
            dataField: 'foodName',
            text: '名称',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: '200px',
            },
            formatter: (cell, row) => {
                return (
                    <Row style={{ design: "flex", justifyContent: "center" }} >
                        <Col>
                            <Button style={{ width: "200px" }} color="primary" outline 
                            onClick={() => {
                                const { history } = props;
                                history.push(`/choosehome/allfoodlist/editchildmenu/${row.id}`);
                            }}>
                                { cell }
                            </Button>
                        </Col>
                    </Row>
                )
            }
        },
        {
            dataField: 'picUrl',
            text: '图片',
            align: 'center',
            headerStyle: {
                width: '100px',
            },
            formatter: (cell, row) => {
                return (
                    <Button color="primary" onClick={() => {
                        openPic(cell);
                    }}>
                    {row.foodName}图片</Button>
                )
            }
        },
        {
            dataField: 'sales',
            text: '月销量',
            align: 'center',
            sort: true,
            headerStyle: {
                textAlign: 'center',
                width: '100px',
            },
            formatter: (cell, row, rowIndex, colIndex) => {
                return (
                    <Row style={{ design: "flex", justifyContent: "center", alignItems: "center" }} >
                        <Col>
                            { cell }
                        </Col>
                    </Row>
                )
            }
        },
        {
            dataField: 'rating',
            text: '赞数',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: '100px',
            }
        },{
            dataField: 'price',
            text: '售价',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: '100px',
            }
        },
    ]

    )
}

export default _columnsMenuContent;