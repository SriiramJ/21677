import validator from 'validator';

export const isValidUrl = (url) => validator.isURL(url);
