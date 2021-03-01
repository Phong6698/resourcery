import {Object} from 'parse';

export const mapSimpleParseObject = <T>(object: Object<T>): T => ({...object.attributes, id: object.id});
