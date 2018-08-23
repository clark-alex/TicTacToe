import React, { Component } from 'react';

class square extends Component {
    render() {
        return (
            <div
             onClick={!this.props.squareValue?()=>this.props.handleUserTurn(this.props.itemPos):''} 
             className={this.props.squareValue === 1
                ? ' input_placeholder O'
                : this.props.squareValue === 2
                    ? 'input_placeholder X'
                    : 'input_placeholder'}
             >
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


