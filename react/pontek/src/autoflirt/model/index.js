import word, { setup } from './wordProcessor.js';
import * as types from '../words/types.js';

import { upperCaseFirst } from '../util/stringUtils';

let adjectives = [];

// generate
export default () => {
    let flirt = upperCaseFirst(genGreeting());
    let compliment = genCompliment();
    let question = genQuestion();

    if (Math.random() > 0.5) {
        flirt += ', ';
        flirt = flirt.replace('<?,>', '');
    } else {
        flirt += endSentence(0.2);
        flirt = flirt.replace('<?,>', ',');
        compliment = upperCaseFirst(compliment);
    }

    flirt += compliment;
    flirt += endSentence(0.5);
    flirt += upperCaseFirst(question);

    return flirt;
}

const genGreeting = () => {
    let greeting = word(types.GREETINGS);

    // Add description
    if (Math.random() > 0.5) {
        greeting += '<?,> you'

        if (Math.random() > 0.5) {
            greeting += ' ' + word(types.ADJECTIVES);
        }

        greeting += ' ' + word(types.SUBSTANTIVES);    
    }

    return greeting;
}

const genCompliment = () => {
    let compliment = 'what a ' + word(types.ADJECTIVES) + ' ' + word(types.COMPLIMENT_SUBSTANTIVES);

    if (Math.random() > 0.5) {
        compliment += ' you got there'
    } else {
        compliment += ' you have'
    }

    return compliment;
}

const genQuestion = () => {
    let question = word(types.REQUESTS) + ' ' + word(types.VERBS) + ' ' + word(types.TEMPORALS) + '?';

    return question;
}

const endSentence = (dotProbability) => {
    if (Math.random() >= dotProbability) {
        return '. ';
    }

    return '! ';
}