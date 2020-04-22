import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'mobile-flashcards:decks';

function generateUID () { // borrowing this function from Udacity example code
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getAllDecks() {
	// AsyncStorage.clear()
	return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function getDeck(deck) {
	let data = AsyncStorage.getItem(DECK_STORAGE_KEY);
	return data[deck];
}

export function addDeck(deck) {
	let id = generateUID();
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		decks: {
			[id]: deck,
		}
	}))
}

export async function removeDeck(deck) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((decks) => {
			let updated_decks = JSON.parse(decks);
			updated_decks[deck] = undefined;
			delete updated_decks[deck];
			AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updated_decks));
		});
}

export function addCard(card, deck) {

}
