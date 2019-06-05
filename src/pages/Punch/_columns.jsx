import {
    Row, Col, 
    Button
} from 'reactstrap';
import React from 'react';

const _columns = (updateGoods) => {
    return ([
    {
        dataField: 'number',
        text: '序号',
        align: 'center',
        sort: true,
        headerStyle: {
            textAlign: 'center',
            width: 100,
        }
    },
    {
        dataField: 'name',
        text: '用户名  ',
        align: 'center',
        headerStyle: {
            textAlign: 'center',
            width: 100,
        }
    },
    {
        dataField: 'finishNumber',
        text: '刷题数',
        align: 'center',
        headerStyle: {
            textAlign: 'center',
            width: 100,
        }
    },
    {
        dataField: 'days',
        text: '近一年打卡天数',
        align: 'center',
        headerStyle: {
            textAlign: 'center',
            width: 100,
        }
    },
    {
        dataField: 'nowDay',
        text: '今日查卡',
        align: 'center',
        headerStyle: {
            textAlign: 'center',
            width: 100,
        },
        formatter: (cell, row, rowIndex, colIndex) => {
            return cell === true ? <i className ="fa fa-check text-success fa-2x" /> : 
                                    <i className ="fa fa-times text-danger fa-2x" />
        }
    },
    {
        dataField: 'updateTime',
        text: '数据更新时间',
        align: 'center',
        sort: true,
        headerStyle: {
            textAlign: 'center',
            width: 100,
        }
    },
    {
        dataField: 'goodNumber',
        text: '赞',
        sort: true,
        align: 'center',
        headerStyle: {
            textAlign: 'center',
            width: 100,
        },
        formatter: (cell, row) => {
            return ( 
                <Row  style={{ design: "flex", justifyContent:"center" }} >
                    <Col>
                        <div className='text-center'>{row.goodNumber}</div>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={() => {
                            updateGoods(row.number, row.goodNumber+1);
                        }}>
                            <i className="fa fa-gratipay anchor"></i>
                        </Button>
                    </Col>
                </Row>
            )
        }
    }
]

)}

export default _columns;