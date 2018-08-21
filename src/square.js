import React, { Component } from 'react';

class square extends Component {

    render() {
        return (
            <div onClick={()=>this.props.handleUserTurn(this.props.itemPos)} className='input_placeholder'>
                {this.props.squareValue === 1
                    ? 'O'
                    : this.props.squareValue === 2
                        ? 'x'
                        : ''}
            </div>
        );
    }
}

export default square;


