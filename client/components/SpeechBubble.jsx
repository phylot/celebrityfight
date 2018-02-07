import React from 'react';

export class SpeechBubble extends React.Component {
	render() {
		return (
			<div className={'speechBubble' + (this.props.visible ? ' popIn' : ' popOut')}>
				<div className='inner'><p>{this.props.message}</p></div>
			</div>
		)
	}
}