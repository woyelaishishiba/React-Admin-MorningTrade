import React,{Component} from 'react'
import { CardImgOverlay,Spinner  } from 'reactstrap'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const spinnerStyle = {
    width: '200px', 
    height: '200px',
    position: 'absolute',
    margin: 'auto',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0}

class CardLocker extends Component{


    render(){
        const classes = classNames('p-0 card-locker', this.props.className);
        // const iconClasses = classNames('fa fa-fw fa-pluse',{
        //     [`fa-${this.props.icon}`]: true,
        //     [`fa-${this.props.iconSize}x`]: true,
        //     [`text-${this.props.color}`]: true,
        // });

        return (
            this.props.isOpen ? 
            <CardImgOverlay className={classes} style={{ backgroundColor: '#C0C0C0', opacity:0.5 }}>
                <div className='locker-layer'>    
                    <Spinner color="success" style={spinnerStyle}/>
                    <span className='sr-only'>Loading...</span>
                </div>
            </CardImgOverlay>
            : null
        )
    }
}

CardLocker.propTypes = {
    icon: PropTypes.string,
    iconSize: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    color: PropTypes.string,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
}

CardLocker.defaultProps = {
    icon: 'spinner',
    color: 'text-muted',
    iconSize: 5,
    isOpen: false,
}

export default CardLocker;