"use strict";

import React from 'react';
import './app.scss'; // Component-specific CSS
import {cards} from '../api.js'; // Get data

function Button(props) { // TODO: Turn in CardButton class + make a ModalButton class also. Could abstract the Button further, then reuse this in both?
	return (
    <button disabled={props.disabled} className={'button' + ( props.info.win ? ' green' : '' ) + '' + ( props.info.lose ? ' red' : '' )} 
    onClick={props.onClick}>
    	{props.info.label}<span>{props.info.value}</span>
    </button>
	);
}

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

export class Card extends React.Component {
	renderButton(stat, disabled, index) {
		return (
			<Button info={stat} onClick={() => this.props.onClick(stat, index)} disabled={disabled} />
		);
	}
	// TODO: Better way to render buttons by repeating through this.props.value.stats array, similar to ng-repeat?
	// - Then might be able to get index of clicked button dynamically, rather than passing it as a parameter manually
	render() {
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
								</div>
							</div>
						</div>
						<div className='back'>
							<div className='cardLogo'>CELEBRITY<span>FIGHT</span></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export class Deck extends React.Component {
	render() {
		var offsetDirection = this.props.offsetDirection,
				pixelOffset = 0,
				slideOut = this.props.slideOut,
				slideDown = this.props.slideDown;
		var deckItems = this.props.cards.map(function(item, index, arr) {

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

export class Game extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			playerDecks: shuffleCards(),
			playerOneTurn: chooseLeadPlayer(),
      showBothCards: false,
      hideBothCards: true,
      turnOpen: true,
      modalVisible: true,
      modalContent: {
      	heading: 'Welcome',
      	subHeading: 'Get Ready to FIGHT',
      	paragraph: 'Press PLAY to begin...',
      	button: 'PLAY',
      	closeButton: false
      },
      playerOneWin: false,
      playerTwoWin: false,
      cardOneFlash: false,
      cardTwoFlash: false,
      cardSlideOut: false,
      cardSlideUp: false,
      cardSlideDown: false
    };
    this.resetGame = this.resetGame.bind(this); // Need to bind this method for 'this' context... for SOME REASON??? Other methods don't require binding?
    this.hideModal = this.hideModal.bind(this); // ... and this
  }

	renderCards() {

		const deckOne = this.state.playerDecks[0]; // Required? - Should I just pass this.state.playerDecks[0] directly below?
		const deckTwo = this.state.playerDecks[1];

		return (
			<div className='cardContainer'>
				<Card value={deckOne[0]} onClick={(stat, index) => this.handleClick(stat, index)} styleName='playerOne' markerText='P1' 
				disabled={!this.state.playerOneTurn || !this.state.turnOpen} 
				flipped={(!this.state.playerOneTurn && !this.state.showBothCards) || this.state.hideBothCards} 
				flash={this.state.cardOneFlash} slideUp={this.state.playerTwoWin && this.state.cardSlideUp} />
				<div className='cardSeperator'>Vs</div>
				<Card value={deckTwo[0]} onClick={(stat, index) => this.handleClick(stat, index)} styleName='playerTwo' markerText='P2' 
				disabled={this.state.playerOneTurn || !this.state.turnOpen} 
				flipped={(this.state.playerOneTurn && !this.state.showBothCards) || this.state.hideBothCards} 
				flash={this.state.cardTwoFlash} slideUp={this.state.playerOneWin && this.state.cardSlideUp} />
				<Deck cards={deckOne} cssClass={'deckOne'} offsetDirection={'left'} slideOut={this.state.cardSlideOut} 
				slideDown={this.state.playerOneWin && this.state.cardSlideDown} />
				<Deck cards={deckTwo} cssClass={'deckTwo'} offsetDirection={'right'} slideOut={this.state.cardSlideOut} 
				slideDown={this.state.playerTwoWin && this.state.cardSlideDown} />
			</div>
		);
	}

	handleClick(stat, statIndex) {

		var	statOne = stat.value, 
				statTwo,
				cardDecks = JSON.parse(JSON.stringify(this.state.playerDecks)), // Create copy of card arrays, without object references
				playerOneActive = this.state.playerOneTurn,
				currentPlayerWin = true,
				playerOneDeck = cardDecks[0],
				playerTwoDeck = cardDecks[1],
				opponentDeck = playerTwoDeck,
				winningDeck,
				losingDeck;

		this.setState({ 
			turnOpen: false,
			showBothCards: true,
			playerOneWin: false,
			playerTwoWin: false 
		});

		if (!this.state.playerOneTurn) { // If player 2's turn, change opponent deck
			opponentDeck = playerOneDeck;
		}
		// Find corresponding stat on opponent's card - TODO: Use the 'statIndex' property to do this quicker?
		var matchedAttribute = opponentDeck[0].stats.filter(function( obj ) {
		  return obj.attribute == stat.attribute;
		});
		statTwo = matchedAttribute[0].value;

		currentPlayerWin = compareCards(statOne, statTwo);

		// Find winner's deck, highlight stats
		if ((currentPlayerWin && this.state.playerOneTurn) || (!currentPlayerWin && !this.state.playerOneTurn)) {
			this.setState({ playerOneWin: true });
			winningDeck = playerOneDeck;
			losingDeck = playerTwoDeck;

		} else {
			this.setState({ playerTwoWin: true });
			winningDeck = playerTwoDeck;
			losingDeck = playerOneDeck;
		}

		// Stat highlights
		var winningStat = winningDeck[0].stats[statIndex],
				losingStat = losingDeck[0].stats[statIndex];
		winningStat.win = true;
		losingStat.lose = true;

		if (!currentPlayerWin) { // If current player loses ...
			this.setState({ playerOneTurn: !playerOneActive }); // ... change player turn
		}
		// Update state for stat highlighting
		this.setState({ 
			playerDecks: [playerOneDeck, playerTwoDeck] 
		}, () => {

			// Update state to flash losing card
			if (this.state.playerOneWin) {
				this.setState({ cardTwoFlash: true });

			} else {
				this.setState({ cardOneFlash: true });
			}

			setTimeout(() => { // Timeout, then stop card flashing, 2000ms
				this.setState({
					cardOneFlash: false,
					cardTwoFlash: false
				});

				if (opponentDeck.length < 2 && currentPlayerWin) { // If somebody loses the game ... TODO: Better logic

					setTimeout(() => { // Timeout, then show winning player modal, 4000ms
						if (this.state.playerOneTurn) {
							this.setState({
								modalVisible: true,
					      modalContent: {
					      	heading: 'Player 1 WINS!!',
					      	subHeading: 'Well Played Player 1',
					      	paragraph: 'Press PLAY AGAIN to begin a new game...',
					      	button: 'PLAY AGAIN',
					      	closeButton: false
					      }
					    });
						} else {

							this.setState({
								modalVisible: true,
					      modalContent: {
					      	heading: 'Player 2 WINS!!',
					      	subHeading: 'Well Played Player 2',
					      	paragraph: 'Press PLAY AGAIN to begin a new game...',
					      	button: 'PLAY AGAIN',
					      	closeButton: false
					      }
					    });
						}
					}, 4000);

				} else {

					setTimeout(() => { // Else no winner, timeout, then hide the player's card who's turn it isn't, 3000ms
						this.setState({
					  	showBothCards: false
					  }, () => {

					  	setTimeout(() => { // Timeout, then animate losing card vertically, 500ms
					  		this.setState({
							  	cardSlideUp: true
							  }, () => {

							  	setTimeout(() => { // Timeout, then animate card entering winner's deck, 200ms
							  		
										var wonCard = losingDeck[0]; // Copy won card from loser's deck
										winningDeck.push(wonCard); // Add card to winner's deck
						  			this.setState({
									  	cardSlideDown: true
									  }, () => {

											setTimeout(() => { // Timeout, then slideOut card animation, adjust card arrays accordingly, 1000ms
												this.setState({ cardSlideOut: true });
												
												losingDeck.splice(0, 1); // Delete won card from loser's deck
												winningDeck.push(winningDeck.shift()); // Put winner's current card to back of their deck
												losingStat.lose = false; // Clear stat highlights
												winningStat.win = false;
												// console.log('winningDeck: ', winningDeck);
												// console.log('losingDeck: ', losingDeck);
												// console.log('playerOneDeck: ', playerOneDeck);
												// console.log('playerTwoDeck: ', playerTwoDeck);
												
												setTimeout(() => { // Timeout, then update array states, remove slideOut animation CSS classes, next turn open, 300ms
													this.setState({
												  	playerDecks: [playerOneDeck, playerTwoDeck],
												  	cardSlideUp: false,
												  	cardSlideDown: false,
												  	cardSlideOut: false,
												  	turnOpen: true
												  });
												}, 300);
											}, 1000);
										
										});
									}, 200);

								});
					  	}, 500);

					  });
					}, 3000);

				}

			}, 2000);

		});

	}

	resetGame() {

		this.setState({
		  modalVisible: false,
	  	showBothCards: false,
	  	hideBothCards: true
	  }, () => {

			setTimeout(() => {
				this.setState({
					playerDecks: shuffleCards(),
			    playerOneTurn: chooseLeadPlayer(),
			    turnOpen: true,
			    hideBothCards: false
			  }, () => {

			  	this.setState({
						modalVisible: true,
					  modalContent: {
					  	heading: 'Player ' + (this.state.playerOneTurn ? '1' : '2') + ' Goes First!',
					  	subHeading: '',
					  	paragraph: '',
					  	button: 'OK',
					  	closeButton: true
					  }
					})
			  });
			}, 1000);
		});
	}

	showModal(modalObj) {
		// TODO: Make a method to handle the various modal states... may not save much code as still need to define the modal content object
	}

	hideModal() {
		this.setState({ modalVisible: false }); // Make this a method of Modal? Is that logical? ... or should Modal simply be controlled by Game?
	}

	render() { // TODO: Could abstract this to a Gameboard class which uses the Deck and Card classes?
		return (
			<div>
				<Modal visible={this.state.modalVisible} content={this.state.modalContent} 
				onClick={(this.state.modalContent.closeButton ? this.hideModal : this.resetGame)} />
				<div className='gameBoard'>
					<h1 className='mainHeading'>CELEBRITY<span>FIGHT</span></h1>
					{this.renderCards(cards)}
				</div>
			</div>
		);
	}
}

export default class App extends React.Component {
	render() {
		return (
			<Game />
		);
	}
}

// =======================================
// Helper functions

function isEven(n) {
	return n % 2 == 0;
}

function shuffleCards() { // TODO: Pass 'cards' in here as a param?

	const playerOneDeck = [], playerTwoDeck = [];
	const cardsCopy = cards.slice(0); // Shallow copy of cards array

	for (var count = 0; count < cards.length; count++) {
	  // Select a random card
	  var randomCard = cardsCopy[Math.floor(Math.random()*cardsCopy.length)];

	  if (isEven(count)) {
	    playerOneDeck.push(randomCard);
	  } else {
	    playerTwoDeck.push(randomCard);
	  }

	  // Get index of the selected random card
	  var index = cardsCopy.indexOf(randomCard);
	  // ... and remove from initial deck
	  cardsCopy.splice(index, 1);
  }

	return [playerOneDeck, playerTwoDeck];
}

function compareCards(valueOne, valueTwo) { // Should this be a method of Game?

	if (valueOne >= valueTwo) {
		return true;

	} else {
		return false;
	}
	//TOOO: Create draw condition here, and logic for a sidePile in 'Game' class
}

function chooseLeadPlayer(callback) {
	var randNum = Math.random(),
			result;
	if (randNum < 0.5) {
		result = true;
		return true;
	} else {
		result = false;
		return false;
	}
	// console.log('callback');
	callback(result);
}