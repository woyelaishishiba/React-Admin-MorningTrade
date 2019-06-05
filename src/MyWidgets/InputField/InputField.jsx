import React, { Component } from 'react';
import {
    FormGroup,
    FormFeedback,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';

class InputField extends Component {
    render() {
        return (
                <FormGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className={this.props.icon}></i>
                            </InputGroupText>
                            {this.props.label ?
                                <InputGroupText className='text-truncate' style={{ width: '7rem' }}>
                                    {this.props.label}
                                </InputGroupText> :
                                null
                            }
                        </InputGroupAddon>
                        {this.props.children}
                        <FormFeedback>{ this.props.errors }</FormFeedback>
                    </InputGroup>
                    
                </FormGroup>
        );
    }
}

export default InputField;