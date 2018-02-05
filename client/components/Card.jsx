import React from 'react';
import Button from '../components/Button.jsx';
import AbilityButton from '../components/AbilityButton.jsx';
import {StatContainer} from '../components/StatContainer.jsx';

export class Card extends React.Component {
	renderButton(stat, disabled, index) {
		return (
			<Button info={stat} onClick={() => this.props.onClick(stat, index)} disabled={disabled} />
		);
	}

	render() {
		// TODO: Use a For loop HERE based on this.props.value.stats.length and return the result of each renderButton(), similar to deckCard
		// - Then might be able to get index of clicked button dynamically, rather than passing it as a parameter manually
		// Also make some shorthand variables for the OR logic below
		return (
			<div className={'card ' + this.props.styleName}>
				<div className='cardPlaceholder'>
					<div className='inner'>
        		<div className='cardLogo'>CELEBRITY<span>FIGHT</span></div>
        	</div>
				</div>
				<div className={'flip-container' + (this.props.flipped ? ' flip' : '') + (this.props.slideUp ? ' slideUp' : '')}>
					<div className='flipper'>
						<div className='front'>
							<div className='playerMarker'><span>{this.props.markerText}</span></div>
							<div className={'flashOverlay' + (this.props.flash ? ' blink' : '')}></div>
							<img className='cardImage' key={this.props.value.image} src={this.props.value.image} alt={this.props.value.name} />
							<div className='cardStats'>
								<p className='cardNumber'>{this.props.value.number}</p>
								<h1 className='cardTitle'>{this.props.value.name}</h1>
								<div className='cardButtons'>
									{this.renderButton(this.props.value.stats[0], this.props.disabled, 0)}
									{this.renderButton(this.props.value.stats[1], this.props.disabled, 1)}
									{this.renderButton(this.props.value.stats[2], this.props.disabled, 2)}
									{this.renderButton(this.props.value.stats[3], this.props.disabled, 3)}
									<AbilityButton show={this.props.value.abilityPresent} disabled={this.props.disabled || this.props.value.abilityUsed} 
									onClick={() => this.props.abilityClick(this.props.value)} label={this.props.value.abilityLabel} 
									title={this.props.value.abilityDescription} />
								</div>
							</div>
						</div>
						<div className='back'>
							<StatContainer visible={this.props.statVisible} label={this.props.randomStat.label} value={this.props.randomStat.value} />
							<div className='cardLogo'>CELEBRITY<span>FIGHT</span></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}