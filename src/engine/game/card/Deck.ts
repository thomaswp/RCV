import { Card } from "./Card";

export class Deck {
    private cards: Card[];

    constructor(cards: Card[] = []) {
        this.cards = cards;
    }
    drawCard() {
        return this.cards.pop();
    }
    drawAll() {
        return this.cards.splice(0, this.cards.length);
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
    get length() {
        return this.cards.length;
    }
    get isEmpty() {
        return this.cards.length === 0;
    }
    getCard(index) {
        return this.cards[index];
    }
    removeCard(index) {
        return this.cards.splice(index, 1)[0];
    }
    addCardToStart(card) {
        this.cards.unshift(card);
    }
    addCardsToStart(cards) {
        this.cards.unshift(...cards);
    }
    addCardToEnd(card) {
        this.cards.push(card);
    }
    addCardsToEnd(cards) {
        this.cards.push(...cards);
    }
    getCardIndex(card) {
        return this.cards.indexOf(card);
    }
    removeCardByValue(card) {
        const index = this.getCardIndex(card);
        if (index !== -1) {
            this.removeCard(index);
        }
    }
    removeCardByValueAndReturn(card) {
        const index = this.getCardIndex(card);
        if (index !== -1) {
            return this.removeCard(index);
        }
    }
    removeCardByIndex(index) {
        return this.cards.splice(index, 1)[0];
    }
    moveCardToTop(index) {
        const card = this.removeCardByIndex(index);
        this.addCardToStart(card);
    }
    moveCardToBottom(index) {
        const card = this.removeCardByIndex(index);
        this.addCardToEnd(card);
    }
    moveCardToIndex(fromIndex, toIndex) {
        const card = this.removeCardByIndex(fromIndex);
        this.cards.splice(toIndex, 0, card);
    }
    clear() {
        this.cards = [];
    }
    getCardByValue(card) {
        return this.cards.find(c => c === card);
    }
    getCardByValueAndIndex(card) {
        const index = this.getCardIndex(card);
        if (index !== -1) {
            return { card, index };
        }
        return null;
    }
    getCardByIndex(index) {
        return this.cards[index];
    }
    forEach(callback) {
        this.cards.forEach(callback);
    }
    filter(callback) {
        return this.cards.filter(callback);
    }
    map(callback) {
        return this.cards.map(callback);
    }
}