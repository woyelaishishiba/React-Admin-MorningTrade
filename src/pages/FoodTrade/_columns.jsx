import {
    Row, Col,
    Button
} from 'reactstrap';
import React from 'react';

const _columns = (isReady, isFinished) => {
    return ([
        {
            dataField: 'userName',
            text: '用户名  ',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: 100,
            }
        },
        {
            dataField: 'foodName',
            text: '所点餐名',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: 100,
            }
        },
        {
            dataField: 'getTime',
            text: '点餐时间',
            align: 'center',
            sort: true,
            headerStyle: {
                textAlign: 'center',
                width: 100,
            }
        },
        {
            dataField: 'ready',
            text: '是否准备好',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: 100,
            },
            formatter: (cell, row, rowIndex, colIndex) => {
                return (
                    <Row style={{ design: "flex", justifyContent: "center" }} >
                        <Col>
                            { cell === true ? <i className="fa fa-check text-success fa-2x" /> :
                                        <i className="fa fa-times text-danger fa-2x" /> }
                        </Col>
                        <Col>
                            <Button color="primary" onClick={() => {
                                isReady(row.id, cell);
                            }}>
                               { cell === true ? <i className="fa fa-times"></i> :
                              <i className="fa fa-check-square-o"></i> }
                            </Button>
                        </Col>
                    </Row>
                )
            }
        },
        {
            dataField: 'finished',
            text: '是否已提交给顾客',
            align: 'center',
            sort: true,
            headerStyle: {
                textAlign: 'center',
                width: 100,
            },
            formatter: (cell, row, rowIndex, colIndex) => {
                return (
                    <Row style={{ design: "flex", justifyContent: "center" }} >
                        <Col>
                            {
                                cell === true ? <i className="fa fa-check text-success fa-2x" /> :
                                    <i className="fa fa-times text-danger fa-2x" />
                            }
                        </Col>
                        <Col>
                            <Button color="primary" onClick={() => {
                                isFinished(row.id, cell);
                            }}>
                                { cell === true ? <i className="fa fa-times"></i> :
                              <i className="fa fa-check-square-o"></i> }
                            </Button>
                        </Col>
                    </Row>
                )
            }
        }
    ]

    )
}

export default _columns;