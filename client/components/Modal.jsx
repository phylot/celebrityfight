import React from 'react';

export class Modal extends React.Component {
	render() {
		return (
			<div className={'overlay' + ( this.props.visible ? ' visible' : '' )}>
				<div className='modal'>
					<h1>{this.props.content.heading}</h1>
					<h2>{this.props.content.subHeading}</h2>
					<p>{this.props.content.paragraph}</p>
					<button onClick={this.props.onClick} className='button'>{this.props.content.button}</button>
				</div>
			</div>
		)
	}
}