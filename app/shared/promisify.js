import Promise from 'bluebird';
import jsonStorage from 'electron-json-storage';

Promise.promisifyAll(jsonStorage);
