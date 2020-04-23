import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'mobile-flashcards:decks';

function generateUID () { // borrowing this function from Udacity example code
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getAllDecks() {
	// AsyncStorage.clear()
	return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function addDeck(deck) {
	let id = generateUID();
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		decks: {
			[id]: { ...deck, id }
		}
	}))
}

export async function removeDeck(deck) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
	.then((data) => {
		let updated_decks = JSON.parse(data).decks;
		updated_decks[deck.id] = undefined;
		delete updated_decks[deck.id];
		AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({
			decks: updated_decks,
		}));
	});
}

export function addCard(deck, card) {
	console.log(deck, card)
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
	.then((data) => {
		let updated_decks = JSON.parse(data).decks;
		deck.cards.push(card);
		updated_decks[deck.id] = deck;
		AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({
			decks: updated_decks,
		}));
	});
}
