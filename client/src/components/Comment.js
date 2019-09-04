import React from 'react'


export default class Comment extends React.Component{

    render() {
        return (
                <div className="grid-item mb-4" style={{margin:"0 auto", paddingLeft:'170px'}}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{this.props.title || ''}</h4>
                            <p className="card-text">{this.props.children || ''}</p>
                        </div>
                    </div>
                </div>
        );
    }
};