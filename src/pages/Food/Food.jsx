import React, { Component } from 'react';
import { Rate } from 'antd';
import "antd/dist/antd.css";
import {
    Row, Button, Col, ButtonGroup,
    CardBody, CardHeader, CardFooter,
    Collapse, Input, 
    ListGroup, ListGroupItem,
    Form, Label
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ShopFirst from './CoffeeShop.jpg'

const InitInput = {
    comments: undefined,
    star: undefined,
}


const validationSchema = (values) => {
    return Yup.object().shape({
        comments: Yup.string()
                .min(5,"评论不能低于5字数")
                .required('email can not be empty'),
    });
}

const validator = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values);
        try{
            validationSchema.validateSync(values, { abortEarly: false });
            return {};
        } catch(error){
            return getErrorsFromException(error);
        }
    }
}

const getErrorsFromException = (validationErrors) => {
    return validationErrors.inner.reduce((errors,error) => {
        return {
            ...errors,
            [error.path]: error.errors[0]
        }
    },{})
}

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({},{
            commentsList: [],
            inputCommentOpen: false,
            hadComment: false,
            hadCollect: false,
            star: 2.5
        });

        this.openComments = this.openComments.bind(this);
        this.collect = this.collect.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    
    componentDidMount(){
        this.props.getAllComments();
    }

    static getDerivedStateFromProps(nextProps, pervState){

        if(pervState.commentsList !== nextProps.allComments && 
            nextProps.allComments !== undefined){
                return{
                    commentsList: nextProps.allComments,
                }
            }

        return null;
    }

    openComments(){
        this.setState({
            // hadComment: true,
            inputCommentOpen: true
        })
    }

    handleClose(){
        this.setState({
            hadComment: true,
            inputCommentOpen: false
        })
    }

    collect(){
        this.setState({
            hadCollect: true,
        })
    }

    render() {
        return(
            <div>
                <CardHeader >
                    <Row>
                    <Col md={2} sm={2} xs={2}>
                        <img src={ ShopFirst } alt=""  style={{ height: "200px", width: "200px" }}/>
                    </Col>
                    <Col md={2} sm={2} xs={2}>
                    <ListGroup style={{ paddingTop: "30px" }}>
                        <ListGroupItem>商家：   Cras justo odio</ListGroupItem>
                        <ListGroupItem>
                        <Row>
                            <Rate disable defaultValue={4} />
                            <h4>￥88</h4>
                        </Row>
                        </ListGroupItem>
                        <ListGroupItem>饮品</ListGroupItem>
                    </ListGroup>
                    </Col>
                    </Row>
                </CardHeader>

                <CardBody>
                    <h3>营业时间： 8:00 —— 22:00 </h3>
                </CardBody>

                <CardFooter>
                    <ButtonGroup>
                    <Row>
                            {
                                !this.state.hadCollect ? 
                                    <Button color="success" onClick={ this.collect }>收藏</Button> : 
                                        <Button color="secondary" disabled>已收藏</Button>
                            }
                            <i style={{ width: "100px" }} />
                            {
                                !this.state.hadComment ? 
                                    <Button color="danger" onClick={ this.openComments }>评价</Button> : 
                                        <Button color="secondary" disabled>已评价</Button>
                            }
                    </Row>
                    </ButtonGroup>
                </CardFooter>
               
                <Collapse style={{ marginLeft: "30px" }} isOpen={ this.state.inputCommentOpen } toggle={null}>

                <Formik
                    initialValues={ InitInput }
                    isInitialValid={false}
                    validate={validator(validationSchema)}
                    onSubmit={(values, { setSubmitting }) => {
                        const nowId = this.state.commentsList.length + 1;
                        Object.assign(values,{
                            id: nowId,
                            starNum: this.state.star,
                            phoneNumber: nowId >= 10 ? "188000000" + nowId : "1880000000" + nowId,
                        })
                        this.props.submitMyComments(values);
                        console.log(values)
                        this.handleClose();
                        setSubmitting(false);
                    }}
                    render={
                        ({
                            isValid,
                            values,
                            errors,
                            dirty,
                            touched,
                            isSubmitting,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                                <Form onSubmit={handleSubmit} noValidate>
                                    <Row>
                                    <Input
                                        type='textarea'
                                        name='comments'
                                        style={{ width: "400px", height: "200px" }}
                                        rows="9"
                                        placeholder='输入您的评价'
                                        valid={!errors.comments}
                                        invalid={!!errors.comments}
                                        onChange={handleChange}
                                        required
                                        value={values.comments}
                                    />
                                    </Row>
                                    <Row>
                                        <Rate 
                                            allowHalf 
                                            name='star'
                                            value={this.state.star}
                                            defaultValue={ this.state.star } 
                                            onChange={(value) => {this.setState({
                                                star: value
                                            })}}
                                        />
                                    </Row>
                                    <Row>
                                    <ButtonGroup>
                                        <Button color="danger" type="submit" disabled={isSubmitting || !isValid}>点击提交</Button>
                                        <Button style={{ marginLeft: "20px" }} color="secondary" type="Button" onClick={this.handleClose}>取消</Button>
                                    </ButtonGroup>
                                    </Row>
                                    <Row>
                                        <Label>{errors.comments}</Label>
                                    </Row>
                                </Form>
                                
                                </div>
                                )
                    }>
                    </Formik>
                </Collapse>
    
                 <CardHeader>
                    用户点评
                 </CardHeader>
                {
                    this.state.commentsList.map((item, index) => {
                        const phoneStart = item.phoneNumber.substring(0,3)
                        const phoneEnd = item.phoneNumber.substring(7,12)
                        return (
                            <CardBody key={item.id}>
                                <Row className="text-muted">
                                    <i className="fa fa-user fa-2x"></i>
                                    <h3 style={{ marginLeft: "10px" }}>{phoneStart + "****" + phoneEnd}</h3>
                                </Row>
                                <Row>
                                    <Rate allowHalf disabled defaultValue={item.starNum} />
                                </Row>
                                <Row className="text-muted">
                                    <strong>{ item.comments }</strong>
                                </Row>
                            </CardBody>
                        )

                    })
                }
            </div>
        )
    }
}

export default Food