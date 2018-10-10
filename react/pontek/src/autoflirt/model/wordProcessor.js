import * as words from '../words';

import { getRandomInt, getRandomBoolean } from '../util';

export default (type, isSerious) => {
    return words[type][getRandomInt(words[type].length - 1)];
}