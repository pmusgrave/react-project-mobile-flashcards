import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const DECK_STORAGE_KEY = 'mobile-flashcards:decks';
export const NOTIFICATION_KEY = 'mobile-flashcards:notifications';

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

// notification functions borrow from the course example code:
// https://github.com/udacity/reactnd-UdaciFitness-complete/blob/setLocalNotification/utils/helpers.js
export function clearLocalNotifications() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
	return {
		title: "mobile flashcards",
		body: "Time to study!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			stick: false,
			vibrate: true,
		}
	}
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    }
  })
}