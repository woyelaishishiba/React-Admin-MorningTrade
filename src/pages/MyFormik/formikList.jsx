import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react';
import { Formik } from 'formik';
import InputField from '../../MyWidgets/InputField';
import CardLocker from '../../MyWidgets/CardLocker';
import * as Yup from 'yup';
import {
    Button, Form, Input, Row,
    Col, Card, CardBody, Badge,
    CardHeader, CardFooter,
} from 'reactstrap';

const InitState = {
    email: undefined,
    name: undefined,
    isAdmin: true,
}

const validationSchema = (values) => {
    return Yup.object().shape({
        email: Yup.string().email()
                .required('email can not be empty'),
        name: Yup.string()
                .max(5,'max length of name is 5')
                .required('name can not be empty'),
        isAdmin: Yup.bool(),
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


class formikList extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({},{
            locked: false,
        }, InitState);
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Formik
                    initialValues={ InitState }
                    isInitialValid={false}
                    validate={validator(validationSchema)}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
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
                                        <CardHeader className='text-center'>
                                            <h3><Badge className="mr-1" color="success">个人信息</Badge></h3>
                                        </CardHeader>
                                        <CardBody>
                                        <Row>
                                            <Col md={4} sm={4} xs={4}>
                                                <InputField
                                                    icon="fa fa-user"
                                                    style={{display:"flex", justifyContent:"center"}}
                                                    label="姓名" 
                                                    errors={errors.name}>
                                                    <Input
                                                        type='text'
                                                        name='name'
                                                        placeholder='输入姓名'
                                                        valid={!errors.name}
                                                        invalid={!!errors.name}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        required
                                                        value={values.name}/>
                                                </InputField>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4} sm={4} xs={4}>
                                                <InputField
                                                    icon="fa fa-check"
                                                    label="isAdmin"
                                                    errors={errors.isAdmin}>
                                                    <AppSwitch
                                                        name='isAdmin'
                                                        variant={'pill'}
                                                        onChange={handleChange}
                                                        className={'mx-1'}
                                                        defaultChecked={true}
                                                        color='success'
                                                        label
                                                        required
                                                    />
                                                </InputField>
                                            </Col>
                                            </Row>
                                            <Row>
                                            <Col md={4} sm={4} xs={4}>
                                                <InputField
                                                    icon="fa fa-envelope"
                                                    label="email"
                                                    errors={errors.email}>
                                                    <Input
                                                        id="email"
                                                        placeholder="Enter your email"
                                                        type="text"
                                                        value={values.email}
                                                        valid={!errors.email}
                                                        invalid={!!errors.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </InputField>
                                            </Col>
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
                                            <Row style={{display:"flex", justifyContent:"center"}}>
                                                <Button
                                                    color="warning"
                                                    type="button"
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

export default formikList;