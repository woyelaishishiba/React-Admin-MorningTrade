// 使用requestAnimationFrame改变state
import React, { Component } from 'react';
import {
    Button, ButtonGroup,
    Row, Col
} from 'reactstrap';

export default class Animation extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            percent: 10
        };
    }
 
    increase = () => {
        const percent = this.state.percent;
        const targetPercent = percent >= 90 ? 100 : percent + 10;
        const speed = (targetPercent - percent) / 400;
        let start = null;
        const animate = timestamp => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const currentProgress = Math.min(parseInt(speed * progress + percent, 10), targetPercent);
            this.setState({
                percent: currentProgress
            });
            if (currentProgress < targetPercent) {
                window.requestAnimationFrame(animate);
            }
        };
        window.requestAnimationFrame(animate);
    }
 
    decrease = () => {
        const percent = this.state.percent;
        const targetPercent = percent < 10 ? 0 : percent - 10;
        const speed = (percent - targetPercent) / 400;
        let start = null;
        const animate = timestamp => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const currentProgress = Math.max(parseInt(percent - speed * progress, 10), targetPercent);
            this.setState({
                    percent: currentProgress
                });
            if (currentProgress > targetPercent) {
                window.requestAnimationFrame(animate);
            }
        };
        window.requestAnimationFrame(animate);
    }
 
    autoAnimation = () => {
        this.increase();
        setTimeout(this.decrease, 1000)
    }

    render() {
        const { percent } = this.state;
 
        return (
            <div>
                <Row>
                    <Col xs={4} md={4} sm={4}>
                    <div>
                        <div>
                            <div style = {{width: `${percent}%`, background: "orange", height: "30px"}} >
                                <div className="progress-info" >{percent}%</div>
                            </div>
                        </div>
                    </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "30px" }}>
                <ButtonGroup>
                    <Button color="danger" onClick={this.decrease}>-</Button>
                    <Button color="primary" onClick={this.increase}>+</Button>
                    <Button color="warning" onClick={this.autoAnimation}>自动</Button>
                </ButtonGroup>
                </Row>
            </div>
        );
    }
}