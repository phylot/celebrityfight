import React from 'react';

export class Deck extends React.Component {
	render() {
		var offsetDirection = this.props.offsetDirection,
				pixelOffset = 0,
				slideOut = this.props.slideOut,
				slideDown = this.props.slideDown,
				deckItems = this.props.cards.map(function(item, index, arr) {

			var deckCardStyle = {
			  top: '-'+ pixelOffset +'px',
			  [offsetDirection]: '-'+ pixelOffset +'px'
			  // WebkitTransition: 'all', // note the capital 'W' here
			  // msTransition: 'all' // 'ms' is the only lowercase vendor prefix
			};
			if (index !== 0) { // Don't increase offset until after second card
				pixelOffset = pixelOffset + 6;
			}

      return (
        <div key={item.code} 
        className={'deckCard' + (index == 0 ? ' first' : '') + 
        (arr.length - 1 === index ? ' last' : '') + 
        ((slideOut && arr.length - 1 === index) ? ' slideOut' : '')} 
        style={deckCardStyle}>
        	<div className='inner'>
        		<div className='cardLogo'>CELEBRITY<span>FIGHT</span></div>
        	</div>
        </div>
      );
    });

		return (
			<div className={'deck ' + this.props.cssClass}>
				<div className={'deckCard animationCard' + (slideDown ? ' slideDown' : '')}>
					<div className='inner'>
        		<div className='cardLogo'>CELEBRITY<span>FIGHT</span></div>
        	</div>
				</div>
				{deckItems}
			</div>
		)
	}
}