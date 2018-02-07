import React from 'react';

export class DamageBox extends React.Component {
	render() {
		return (
			<div className={'damageBox' + (this.props.visible ? ' visible' : ' hide')}>
				<p>{this.props.data.statName}</p>
				<div className='damageValue'><div className='icon'>-</div>{this.props.data.damageValue}</div>
			</div>
		)
	}
}