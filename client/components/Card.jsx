import React from 'react';
import Button from '../components/Button.jsx';
import AbilityButton from '../components/AbilityButton.jsx';
import {StatContainer} from '../components/StatContainer.jsx';
import {SpeechBubble} from '../components/SpeechBubble.jsx';
import {DamageBox} from '../components/DamageBox.jsx';

export class Card extends React.Component {
	renderButton(stat, disabled, index) {
		return (
			<Button key={index.toString()} info={stat} onClick={() => this.props.onClick(stat, index)} disabled={disabled} />
		);
	}

	render() {
		// TODO: make some shorthand variables for the OR logic below
		var buttons = [];
		for (var i = 0; i < this.props.cardData.stats.length; i++) {
			buttons.push(this.renderButton(this.props.cardData.stats[i], this.props.disabled, i));
		};

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
							<SpeechBubble visible={this.props.speechVisible} message={this.props.cardData.battlecry} />
							<div className='playerMarker'><span>{this.props.markerText}</span></div>
							<div className={'flashOverlay' + (this.props.flash ? ' blink' : '')}></div>
							<img className='cardImage' key={this.props.cardData.image} src={this.props.cardData.image} alt={this.props.cardData.name} />
							<div className='cardStats'>
								<p className='cardNumber'>{this.props.cardData.number}</p>
								<h1 className='cardTitle'>{this.props.cardData.name}</h1>
								<div className='cardButtons'>
									{buttons}
									<AbilityButton show={this.props.cardData.abilityPresent} disabled={this.props.disabled || this.props.cardData.abilityUsed} 
									onClick={() => this.props.abilityClick(this.props.cardData)} label={this.props.cardData.abilityLabel} 
									title={this.props.cardData.abilityDescription} />
								</div>
							</div>
						</div>
						<div className='back'>
							<DamageBox visible={this.props.damageVisible} data={this.props.damage} />
							<div className={'flashOverlay' + (this.props.flash ? ' blink' : '')}></div>
							<StatContainer visible={this.props.statVisible} label={this.props.randomStat.label} value={this.props.randomStat.value} />
							<div className='cardLogo'>CELEBRITY<span>FIGHT</span></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}