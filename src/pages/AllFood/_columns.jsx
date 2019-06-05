import {
    Row, Col,
    Button
} from 'reactstrap';
import React from 'react';

const _columnsMain = (updateRoot, history) => {
    return ([
        {
            dataField: 'count',
            text: '总数目',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: '100px',
            }
        },
        {
            dataField: 'typeName',
            text: '种类名称',
            align: 'center',
            headerStyle: {
                textAlign: 'center',
                width: '600px',
            },
            formatter: (cell, row) => {
                return (
                    <Row style={{ design: "flex", justifyContent: "center" }} >
                        <Col>
                            <Button style={{ width: "200px" }} color="primary" outline
                                onClick={() => {
                                    updateRoot(row.id, row.typeName)
                                }}>
                                {cell}
                            </Button>
                            {row.menuContent.length === 0 ?
                                <Button color="warning" outline style={{ marginLeft: "10px" }}
                                    onClick={() => {
                                        history.push("/choosehome/allfoodlist/editchildmenu/0/" + row.id)
                                    }}>
                                    <i className="fa fa-plus-square fa-6" aria-hidden="true"></i>
                                </Button> : null}
                        </Col>
                        
                    </Row>
                )
            }
        },
        {
            dataField: 'isShown',
            text: '是否在售',
            align: 'center',
            sort: true,
            headerStyle: {
                textAlign: 'center',
                width: '300px',
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
                                console.log(row)
                            }}>
                                <i className="fa fa-times"></i>
                            </Button>
                        </Col>
                    </Row>
                )
            }
        }
    ]

    )
}

export default _columnsMain;