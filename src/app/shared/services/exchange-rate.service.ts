import { Injectable } from '@angular/core';

import { Currency } from '../enums/Currency';
import { ExchangeRateInfo } from '../interfaces/ExchangeRateInfo';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private exchangeRateArr: ExchangeRateInfo[];

  private numberOfAttempts: number;

  endOfAttemptsToGetData: boolean;

  constructor() {
    this.exchangeRateArr = [];
    this.numberOfAttempts = 0;
    this.endOfAttemptsToGetData = false;

    this.getExchangeRatesFromAPI();
  }

  getConvertedValue(codeFrom: number, codeTo: number, value: number): number {
    if (codeFrom === codeTo) return value;

    let isRightSide: boolean = false;

    let element = this.exchangeRateArr.find(
      (value) =>
        value.currencyCodeFrom === codeFrom && value.currencyCodeTo === codeTo
    );

    if (!element) {
      element = this.exchangeRateArr.find(
        (value) =>
          value.currencyCodeFrom === codeTo && value.currencyCodeTo === codeFrom
      );
      isRightSide = true;
    }

    if (!element) {
      return 0;
    }

    let result = isRightSide ? value / element.rate : value * element.rate;

    return +result.toFixed(4);
  }

  getExchangeRate(code: number): ExchangeRateInfo | undefined {
    let element = this.exchangeRateArr.find(
      (value) => value.currencyCodeFrom === code
    );

    return element;
  }

  private async getExchangeRatesFromAPI() {
    try {
      const response = await fetch('https://api.monobank.ua/bank/currency');

      if (response.ok) {
        const data = await response.json();

        const requiredElements: any = data.filter(
          (rate: any) =>
            rate.currencyCodeA === Currency.EUR ||
            rate.currencyCodeA === Currency.USD ||
            rate.currencyCodeA === Currency.UAH
        );

        this.exchangeRateArr = requiredElements.map((item: any) => ({
          currencyCodeFrom: item.currencyCodeA,
          currencyCodeTo: item.currencyCodeB,
          rate: item.rateBuy,
        }));

        this.endOfAttemptsToGetData = true;
      } else {
        if (this.numberOfAttempts <= 3) {
          this.numberOfAttempts++;

          setTimeout(() => {
            this.getExchangeRatesFromAPI();
          }, 25000);
        } else {
          this.endOfAttemptsToGetData = true;
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
