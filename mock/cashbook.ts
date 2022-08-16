import csv from 'csv-parser';
import fs from 'fs';
import { MockMethod } from 'vite-plugin-mock';
import { pathResolve } from '@build/utils';
import { resultSuccess, resultError } from './_utils';

const results_bill = [];
const results_categories = [];

fs.createReadStream(pathResolve('datas/bill.csv'))
  .pipe(csv())
  .on('data', (data) => results_bill.push(data));
fs.createReadStream(pathResolve('datas/categories.csv'))
  .pipe(csv())
  .on('data', (data) => results_categories.push(data));

export default [
  {
    url: '/mock/get_cashbook_data',
    method: 'get',
    statusCode: 200,
    response: () => {
      return resultSuccess(results_bill);
    }
  },
  {
    url: '/mock/get_cashbook_categories',
    method: 'get',
    statusCode: 200,
    response: () => {
      return resultSuccess(results_categories);
    }
  }
] as MockMethod[];
