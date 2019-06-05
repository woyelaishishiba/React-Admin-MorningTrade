import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react';
import { Formik } from 'formik';
import { Rate } from 'antd';
import "antd/dist/antd.css";
import InputField from '../../../MyWidgets/InputField';
import CardLocker from '../../../MyWidgets/CardLocker';
import * as Yup from 'yup';
import {
    Button, Badge,
    Row, Col,
    Card, CardBody, CardHeader, CardFooter,
    Form,
    Input,
} from 'reactstrap';

const validationSchema = (values) => {
    return Yup.object().shape({
        foodName: Yup.string()
            .max(10, 'max length of foodName is 10')
            .required('foodName can not be empty'),
        picUrl: Yup.string().url()
            .required('picUrl can not be empty'),
        isShown: Yup.bool(),
        price: Yup.number()
            .moreThan(0, 'price must > 0')
            .required('price can not be empty'),
    });
}

const validator = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values);
        try {
            validationSchema.validateSync(values, { abortEarly: false });
            return {};
        } catch (error) {
            console.log(getErrorsFromException(error))
            return getErrorsFromException(error);
        }
    }
}

const getErrorsFromException = (validationErrors) => {
    return validationErrors.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[0]
        }
    }, {})
}

class EditChildMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locked: false,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.setState({
            id: id,
        })
        this.props.getChildInfo(id);
    }

    static getDerivedStateFromProps(nextProps, pervState) {
        if (nextProps.foodInfo !== undefined &&
            nextProps.foodInfo !== null) {
            //防止多次调用
            if (nextProps.foodInfo.foodName !== pervState.foodName ||
                nextProps.foodInfo.picUrl !== pervState.picUrl ||
                nextProps.foodInfo.rating !== pervState.rating ||
                nextProps.foodInfo.price !== pervState.price) {
                return {
                    foodName: nextProps.foodInfo.foodName,
                    picUrl: nextProps.foodInfo.picUrl,
                    // isShown: nextProps.foodInfo.isShown,
                    isShown: true,
                    rating: nextProps.foodInfo.rating,
                    price: nextProps.foodInfo.price,
                    locked: nextProps.locked,
                }
            }
        }

        if (nextProps.locked !== pervState.locked) {
            return {
                locked: nextProps.locked,
            }
        }

        return null;
    }

    render() {
        return (
            (this.state.foodName !== "" || this.state.id === "0")
                && (this.props.foodInfo !== null) ?
                <div>
                    <Formik
                        initialValues={this.state}
                        isInitialValid={false}
                        validate={validator(validationSchema)}
                        onSubmit={(values, { setSubmitting }) => {
                            const payload = Object.assign({}, values, {
                                rating: this.state.rating,
                                motherId: this.props.match.params.motherId,
                            })
                            const { history } = this.props;
                            if (this.props.match.params.motherId !== undefined) {
                                this.props.insertChildInfo(payload, history)
                            } else {
                                this.props.editChildInfo(payload, history)
                            }

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
                                                <h3><Badge className="mr-1" color="success">商品信息</Badge></h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Row>
                                                    <Col md={4} sm={4} xs={4}>
                                                        <InputField
                                                            icon="fa fa-user"
                                                            label="商品名称"
                                                            errors={errors.foodName}>
                                                            <Input
                                                                type='text'
                                                                name='foodName'
                                                                placeholder='输入商品名称'
                                                                valid={!errors.foodName}
                                                                invalid={!!errors.foodName}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                required
                                                                value={values.foodName} />
                                                        </InputField>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4} sm={4} xs={4}>
                                                        <InputField
                                                            icon="fa fa-ravelry"
                                                            label="商品图片"
                                                            errors={errors.picUrl}>
                                                            <Input
                                                                type='text'
                                                                name='picUrl'
                                                                placeholder='输入商品图片地址'
                                                                valid={!errors.picUrl}
                                                                invalid={!!errors.picUrl}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                required
                                                                value={values.picUrl} />
                                                        </InputField>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4} sm={4} xs={4}>
                                                        <InputField
                                                            icon="fa fa-check"
                                                            label="是否上架"
                                                            errors={errors.isShown}>
                                                            <AppSwitch
                                                                name='isShown'
                                                                style={{ marginLeft: "20px" }}
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
                                                            icon="fa fa-university"
                                                            label="商品价格"
                                                            errors={errors.price}>
                                                            <Input
                                                                name="price"
                                                                placeholder="输入商品价格"
                                                                type="text"
                                                                value={values.price}
                                                                valid={!errors.price}
                                                                invalid={!!errors.price}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </InputField>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4} sm={4} xs={4}>
                                                        <InputField
                                                            icon="fa fa-child"
                                                            label="商品评价"
                                                            errors={errors.rating}>
                                                            <Rate
                                                                allowHalf
                                                                style={{ marginLeft: "20px" }}
                                                                name='rating'
                                                                value={this.state.rating}
                                                                defaultValue={this.state.rating}
                                                                onChange={(value) => {
                                                                    this.setState({
                                                                        rating: value
                                                                    });
                                                                    handleChange();
                                                                }}
                                                            />
                                                        </InputField>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <CardFooter>
                                                <Row>
                                                    <Col md={4} sm={4} xs={4}>
                                                        {this.state.id !== "0" ?
                                                            <Button
                                                                outline
                                                                onClick={e => this.props.deleteChindMenu(this.state.id, this.props.history)}
                                                                color="danger">
                                                                删除
                                                        </Button>
                                                            : null}

                                                    </Col>
                                                    <Col md={4} sm={4} xs={4} style={{ display: "flex", justifyContent: "center" }}>
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
                                                    </Col>
                                                </Row>
                                            </CardFooter>
                                            <CardLocker isOpen={this.state.locked} />
                                        </Card>
                                    </Form>
                                )
                        }
                    >
                    </Formik>
                </div> : null
        )
    }
}


export default EditChildMenu;