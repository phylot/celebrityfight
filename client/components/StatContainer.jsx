import React from 'react';

export class StatContainer extends React.Component {
	render() {
		return (
			<div className={'statContainer' + (this.props.visible ? ' visible' : '')}>
				{this.props.label}
				<div className={'statValue'}>{this.props.value}</div>
			</div>
		)
	}
}