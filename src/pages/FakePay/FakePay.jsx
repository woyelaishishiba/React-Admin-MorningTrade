import React, { Component } from 'react';
import { Formik } from 'formik';
import InputField from '../../MyWidgets/InputField';
import CardLocker from '../../MyWidgets/CardLocker';
import FakePayHeader from './FakePayHeader'
import Animation from '../Animation'
import * as Yup from 'yup';
import {
    Button, Form, Input, Row,
    Col, Card, CardBody, Badge,
    CardHeader, CardFooter, DropdownMenu,
    DropdownToggle, DropdownItem, 
    ButtonDropdown, FormGroup, Label
} from 'reactstrap';
import aliPay from './images/AliPay.png'

const InitState = {
    cardNumber: undefined,
    password: undefined,
    name: undefined,
    phoneNumber: undefined,
    identityNumber: undefined,
    isNormal: undefined
}

const validationSchema = (values) => {
    return Yup.object().shape({
        cardNumber: Yup.string()
                .length(16,'length of cardNumber is 16')
                .required('cardNumber can not be empty'),
        password: Yup.string()
                .length(6,'length of password is 6')
                .required('password can not be empty'),
        name:  Yup.string()
                .max(5,'max length of name is 5')
                .required('name can not be empty'),
        phoneNumber: Yup.string()
                .length(11,'length of identityNumber is 11')
                .required('phoneNumber can not be empty'),
        identityNumber: Yup.string()
                .length(18,'length of identityNumber is 18')
                .required('identityNumber can not be empty')
                .matches(/^210[0-9]*$/,"身份证需要210开头"),
    });
}

const validator = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values);
        try{
            validationSchema.validateSync(values, { abortEarly: false });
            return {};
        } catch(error){
            console.log(getErrorsFromException(error))
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


class FakePay extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({},{
            dropdownOpen: false,
            locked: false,
            cardNum: 0,
            pageNumber: 1,
        }, InitState);

        this.toggle = this.toggle.bind(this);
        this.setBankCard = this.setBankCard.bind(this);
        this.changePagement = this.changePagement.bind(this);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    
    setBankCard(num){
        this.setState({
            cardNum: num,
        })
    }

    changePagement(pageNumber){
        this.setState({
            pageNumber: pageNumber
        })
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Formik
                    initialValues={ InitState }
                    isInitialValid={false}
                    validate={validator(validationSchema)}
                    onSubmit={(values, { setSubmitting }) => {
                        const allValues = Object.assign({},values,{
                            cardNum: this.state.cardNum,
                        })
                        console.log(allValues);
                        this.setState({
                            locked: true,
                        })
                        setTimeout(() => {
                            this.setState({
                                locked: false,
                            })
                            setSubmitting(false);
                        }, 1000);
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
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        }) => (
                                <Form onSubmit={handleSubmit} noValidate>
                                    <Card>
                                        <CardHeader>
                                            <Row style={{display:"flex", justifyContent:"center"}}>
                                            <img src={aliPay} alt="" 
                                                style={{ height: "40px", width: "80px", paddingTop: "2px"}}/>
                                            <h2>
                                                <Badge className="mr-1" color="success">安全中心</Badge>
                                            </h2>
                                            </Row>
                                            <Row style={{ display:"flex", justifyContent:"center" }}>
                                            <FakePayHeader
                                            changePage={this.changePagement}
                                            />
                                            </Row>
                                        </CardHeader>
                                        
                                        {
                                            this.state.pageNumber === 1 ? 
                                            <div>
                                        <CardBody className='text-center'>
                                            <Row style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
                                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={() => { this.toggle(); }}>
                                                    <DropdownToggle caret>
                                                        {(() => {
                                                                switch (this.state.cardNum) {
                                                                case 0:
                                                                    return '请选择支付宝绑定的银行卡'
                                                                case 1:
                                                                    return '建设银行卡'
                                                                case 2:
                                                                    return '招商银行卡'
                                                                case 3:
                                                                    return '人民银行卡'
                                                                case 4:
                                                                    return '其他银行卡'
                                                                default:
                                                                    return null
                                                                }
                                                            }
                                                            )()}
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem header>
                                                            银行卡种类
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => this.setBankCard(1)}>建设银行卡</DropdownItem>
                                                        <DropdownItem onClick={() => this.setBankCard(2)}>招商银行卡</DropdownItem>
                                                        <DropdownItem onClick={() => this.setBankCard(3)}>人民银行卡</DropdownItem>
                                                        <DropdownItem onClick={() => this.setBankCard(4)}>其他银行卡</DropdownItem>
                                                    </DropdownMenu>
                                                </ButtonDropdown>
                                        </Row>
                                        <FormGroup onChange={handleChange} inline style={{display:"flex", justifyContent:"center"}}>
                                            <Col md="4">
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="inline-radio1" name="isNormal" value="on" />
                                                <Label className="form-check-label" check htmlFor="inline-radio1">储蓄卡</Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="inline-radio2" name="isNormal" value="off" />
                                                <Label className="form-check-label" check htmlFor="inline-radio2">信用卡</Label>
                                            </FormGroup>
                                            </Col>
                                        </FormGroup>
                                        <Row  style={{display:"flex", justifyContent:"center"}}>
                                            <Col md={2} sm={2} xs={2}>
                                                <InputField
                                                    icon="fa fa-user"
                                                    errors={errors.cardNumber}>
                                                    <Input
                                                        type='text'
                                                        name='cardNumber'
                                                        placeholder='银行卡号'
                                                        valid={!errors.cardNumber}
                                                        invalid={!!errors.cardNumber}
                                                        onChange={handleChange}
                                                        required
                                                        defaultValue={values.cardNumber}/>
                                                </InputField>
                                            </Col>
                                        </Row>
                                        <Row  style={{display:"flex", justifyContent:"center"}}>
                                            <Col md={2} sm={2} xs={2}>
                                                <InputField
                                                    icon="fa fa-user"
                                                    errors={errors.password}>
                                                    <Input
                                                        type='text'
                                                        name='password'
                                                        placeholder='六位密码'
                                                        valid={!errors.password}
                                                        invalid={!!errors.password}
                                                        onChange={handleChange}
                                                        required
                                                        defaultValue={values.password}/>
                                                </InputField>
                                            </Col>
                                        </Row>
                                        <Row  style={{display:"flex", justifyContent:"center"}}>
                                            <Col md={2} sm={2} xs={2}>
                                                <InputField
                                                    icon="fa fa-user"
                                                    errors={errors.name}>
                                                    <Input
                                                        type='text'
                                                        name='name'
                                                        placeholder='持卡人姓名'
                                                        valid={!errors.name}
                                                        invalid={!!errors.name}
                                                        onChange={handleChange}
                                                        required
                                                        defaultValue={values.name}/>
                                                </InputField>
                                            </Col>
                                            </Row>
                                            <Row  style={{display:"flex", justifyContent:"center"}}>
                                            <Col md={2} sm={2} xs={2}>
                                                <InputField
                                                    icon="fa fa-user"
                                                    errors={errors.phoneNumber}>
                                                    <Input
                                                        id="phoneNumber"
                                                        placeholder="银行预留手机号"
                                                        type="text"
                                                        defaultValue={values.phoneNumber}
                                                        valid={!errors.phoneNumber}
                                                        invalid={!!errors.phoneNumber}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </InputField>
                                            </Col>
                                            </Row>
                                            <Row  style={{display:"flex", justifyContent:"center"}}>
                                            <Col md={2} sm={2} xs={2}> 
                                                <InputField
                                                    icon="fa fa-user"
                                                    errors={errors.identityNumber}>
                                                    <Input
                                                        name="identityNumber"
                                                        placeholder="持卡人身份证号"
                                                        type="text"
                                                        defaultValue={values.identityNumber}
                                                        valid={!errors.identityNumber}
                                                        invalid={!!errors.identityNumber}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </InputField>
                                            </Col>
                                            </Row>
                                        </CardBody>
                                        </div> : 
                                        <CardBody>
                                            <Animation />
                                        </CardBody>
                                        }
                                        
                                        <CardFooter>
                                            <Row style={{display:"flex", justifyContent:"center"}}>
                                                <Button
                                                    color="warning"
                                                    onClick={handleReset}
                                                    disabled={!dirty || isSubmitting}>
                                                    Reset
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    disabled={isSubmitting || !isValid}>
                                                    Submit
                                                </Button>
                                            </Row>
                                        </CardFooter>
                                        <CardLocker isOpen={this.state.locked} />
                                    </Card>
                                </Form>
                            )
                    }
                >

                </Formik>

            </div>
        )
    }

}

export default FakePay;