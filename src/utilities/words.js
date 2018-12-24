import words from './words.json';

export default () => words[Math.floor((Math.random() * words.length))].toUpperCase();
