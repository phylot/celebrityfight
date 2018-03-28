import React from 'react';
import {Card} from '../components/Card.jsx';
import {Deck} from '../components/Deck.jsx';
import {Modal} from '../components/Modal.jsx';
import './app.scss'; // Component-specific CSS - TODO: Separate out into component-specific files
import {cards} from '../api.js'; // Get data - TODO: AJAX call (use a new separate container?)

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
      cardSlideDown: false,
      randomStat: {},
      speechBubbleVisible: false,
      cardDamage: {
      	visible: false,
      	statName: '',
      	damageValue: 0
      }
    };
    this.resetGame = this.resetGame.bind(this); // Need to bind these methods for 'this' context... for SOME REASON??? 
    this.hideModal = this.hideModal.bind(this); // ... Other methods (renderCards, handleClick, handleAbilityClick) don't require binding?!?!?!?
  }

	renderCards() {

		const deckOne = this.state.playerDecks[0], // Required? - Should I just pass this.state.playerDecks[0] directly below?
					deckTwo = this.state.playerDecks[1];
		var cardOneDisabled = !this.state.playerOneTurn || !this.state.turnOpen,
				cardTwoDisabled = this.state.playerOneTurn || !this.state.turnOpen,
				cardOneFlipped = (!this.state.playerOneTurn && !this.state.showBothCards) || this.state.hideBothCards,
				cardTwoFlipped = (this.state.playerOneTurn && !this.state.showBothCards) || this.state.hideBothCards,
				cardOneSlideUp = this.state.playerTwoWin && this.state.cardSlideUp,
				cardTwoSlideUp = this.state.playerOneWin && this.state.cardSlideUp,
				cardOneStatVisible = !this.state.playerOneTurn && this.state.randomStat.statVisible,
				cardTwoStatVisible = this.state.playerOneTurn && this.state.randomStat.statVisible,
				cardOneSpeechVisible = this.state.playerOneTurn && this.state.speechBubbleVisible,
				cardTwoSpeechVisible = !this.state.playerOneTurn && this.state.speechBubbleVisible,
				cardOneDamageVisible = !this.state.playerOneTurn && this.state.cardDamage.visible,
				cardTwoDamageVisible = this.state.playerOneTurn && this.state.cardDamage.visible;

		return (
			<div className='cardContainer'>
				<Card cardData={deckOne[0]} styleName='playerOne' markerText='Player 1' deckCount={deckOne.length} deckTotal={cards.length}
				onClick={(stat, index) => this.handleClick(stat, index)} abilityClick={(card) => this.handleAbilityClick(card)}
				disabled={cardOneDisabled} flipped={cardOneFlipped} flash={this.state.cardOneFlash} slideUp={cardOneSlideUp} 
				randomStat={this.state.randomStat} statVisible={cardOneStatVisible} speechVisible={cardOneSpeechVisible} 
				damage={this.state.cardDamage} damageVisible={cardOneDamageVisible} />
				<div className='cardSeperator'>Vs</div>
				<Card cardData={deckTwo[0]} styleName='playerTwo' markerText='Player 2' deckCount={deckTwo.length} deckTotal={cards.length}	
				onClick={(stat, index) => this.handleClick(stat, index)} abilityClick={(card) => this.handleAbilityClick(card)}
				disabled={cardTwoDisabled} flipped={cardTwoFlipped} flash={this.state.cardTwoFlash} slideUp={cardTwoSlideUp} 
				randomStat={this.state.randomStat} statVisible={cardTwoStatVisible} speechVisible={cardTwoSpeechVisible} 
				damage={this.state.cardDamage} damageVisible={cardTwoDamageVisible} />
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
				cardImages = [],
				winningDeck,
				losingDeck;
		// Populate cardImages array with image URLs, if available, ready for preloading
		for (var i = 0; i < this.state.playerDecks.length; i++) {
			if (this.state.playerDecks[i].length > 1) {
				cardImages.push(this.state.playerDecks[i][1].image);
			}
		};

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
					cardTwoFlash: false,
					randomStat: { statVisible: false }
				});

				if (opponentDeck.length < 2 && currentPlayerWin) { // If somebody loses the game

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
					// Preload next card images
  				preloadImages(cardImages, () => { 
						// Animations and card array manipulation
						setTimeout(() => { // Else no winner, timeout, then hide the player's card who's turn it isn't, 3000ms
							this.setState({
						  	showBothCards: false
						  }, () => {

						  	setTimeout(() => { // Timeout, then animate losing card vertically, 600ms
						  		this.setState({
								  	cardSlideUp: true
								  }, () => {

								  	setTimeout(() => { // Timeout, then animate card entering winner's deck, 600ms
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
													
													setTimeout(() => { // Timeout, then update array states, remove slideOut animation CSS classes, next turn open, 600ms
														this.setState({
													  	playerDecks: [playerOneDeck, playerTwoDeck],
													  	cardSlideUp: false,
													  	cardSlideDown: false,
													  	cardSlideOut: false,
													  	turnOpen: true
													  });
													}, 600);
												}, 1000);
											});
										}, 600);
									});
						  	}, 600);
						  });
						}, 3000);
					});
				}
			}, 2000);
		});
	}

	handleAbilityClick(card) {
		
		var type = card.abilityType, 
				ability = card.ability,
				cardDecks = JSON.parse(JSON.stringify(this.state.playerDecks)), // Create copy of card arrays, without object references
				playerCard = this.state.playerOneTurn ? cardDecks[0][0] : cardDecks[1][0],
				opponentCard = this.state.playerOneTurn ? cardDecks[1][0] : cardDecks[0][0];

		// Set ability to used 
		playerCard.abilityUsed = true;

		this.setState({ 
			turnOpen: false,
			playerDecks: [cardDecks[0], cardDecks[1]],
			speechBubbleVisible: true 
		}, () => {
			setTimeout(() => { // Timeout while SpeechBubble displays/animates, then ability functionality, 3000ms
				this.setState({
					speechBubbleVisible: false
				}, () => {
					// Evaluate type of ability - TODO: Somehow use a predicate object to match abilityType to a method that should be used
					if (type == 'STATSHOW') {
						// Choose random stat from opponentCard.stats
						var stat = getRandomStat(opponentCard.stats);
						// Make the stat container visible above opponent's card
						this.setState({
							randomStat: {
								label: stat.label,
								value: stat.value,
								statVisible: true
							}
						}, () => {
							setTimeout(() => {
								this.setState({ turnOpen: true });
							}, 500);
						});
					}
					if (type == 'STRENGTHDAMAGE') {
						// Find strength attribute value on opponent's card
						var strengthAttribute = opponentCard.stats.filter(function( obj ) {
						  return obj.attribute == 'strength';
						});
						var newStrengthValue = Math.round(strengthAttribute[0].value / 2);
						var strengthReduction = strengthAttribute[0].value - newStrengthValue;

						strengthAttribute[0].value = newStrengthValue; // This updates the view without setState()... somehow
						strengthAttribute[0].decreased = true;
						if (this.state.playerOneTurn) {
							this.setState({ cardTwoFlash: true });
						} else {
							this.setState({ cardOneFlash: true });
						}

						setTimeout(() => { // Timeout, then stop card flashing, 2000ms
							this.setState({
								cardOneFlash: false,
								cardTwoFlash: false
							}, () => {
								// Display strengthReduction value
								this.setState({
									cardDamage: {
						      	visible: true,
						      	statName: strengthAttribute[0].label,
						      	damageValue: strengthReduction
						      }
						    }, () => {
						    	setTimeout(() => { // Timeout, then hide hide card damage, 2000ms
						    		this.setState({
											turnOpen: true,
						    			cardDamage: {
						    				visible: false,
						    				statName: strengthAttribute[0].label, // TODO: - Need a better way to set state...
						      			damageValue: strengthReduction // ...rather than repeating setState object properties above
						    			}
						    		});
						    	}, 2000);
						    });
							});
						}, 2000);
						
					}
				});
			}, 3000);
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
			    playerOneTurn: chooseLeadPlayer()
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
					});
			  	// Preload initial card images
			  	var cardImages = [
			  		this.state.playerDecks[0][0].image,
			  		this.state.playerDecks[1][0].image
			  	];
			  	preloadImages(cardImages, () => {
			  		setTimeout(() => {
				  		this.setState({
							  turnOpen: true,
				    		hideBothCards: false
							});
						}, 300);
			  	});
			  });
			}, 1000);

		});
	}

	hideModal() {
		this.setState({ modalVisible: false }); // Make this a method of Modal? Is that logical? ... or should Modal simply be controlled by Game?
	}

	render() { // TODO: Could abstract this to a Gameboard class which uses the Deck and Card classes?
		return (
			<div>
				<Modal visible={this.state.modalVisible} content={this.state.modalContent} 
				onClick={(this.state.modalContent.closeButton ? this.hideModal : this.resetGame)} />
				<div className='header'>
					<h1 className='logo'>CELEBRITY<span>FIGHT</span></h1>
				</div>
				<div className='gameBoard'>
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

function chooseLeadPlayer() {
	var randNum = Math.random(),
			result;
	if (randNum < 0.5) {
		return true;
	} else {
		return false;
	}
}

function compareCards(valueOne, valueTwo) { // Should this be a method of Game?
	if (valueOne >= valueTwo) {
		return true;

	} else {
		return false;
	}
	//TOOO: Create draw condition here, and logic for a sidePile in 'Game' class
}

function getRandomStat(stats) {
	var randomStat = stats[Math.floor(Math.random()*stats.length)];
	return randomStat;
}

function preloadImages(imgUrls, callback) {
	var imageCount = imgUrls.length;
	var imagesLoaded = 0;

	for (var i = 0; i < imageCount; i++) {
		var img = new Image();
    img.onload = function() {
      imagesLoaded++;
      if (imagesLoaded == imageCount) {
      	if (callback) {
        	callback();
        }
      }
    }
    // TODO: Implement error handling
    // img.onerror = function() {};
		img.src = imgUrls[i];
	}
}