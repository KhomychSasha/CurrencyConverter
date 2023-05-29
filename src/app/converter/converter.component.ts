import { Component } from '@angular/core';

import { ExchangeRateService } from '../shared/services/exchange-rate.service';
import { CurrencyInfo } from '../shared/interfaces/CurrencyInfo';

import { Currency } from '../shared/enums/Currency';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent {
  availableCurrenciesArr = [
    { name: 'USD', value: Currency.USD },
    { name: 'EUR', value: Currency.EUR },
    { name: 'UAH', value: Currency.UAH },
  ];

  message: string =
    'You need to wait a little while the latest data is loaded!';

  actualCurrencies: CurrencyInfo[] = [];

  isDisabledConvert: boolean;

  selectedFirstCurrency: number;
  selectedSecondCurrency: number;

  firstNumber: number;
  secondNumber: number;

  constructor(private exchangeRateServ: ExchangeRateService) {
    this.isDisabledConvert = true;

    this.selectedFirstCurrency = Currency.UAH;
    this.selectedSecondCurrency = Currency.UAH;

    this.firstNumber = 1;
    this.secondNumber = 1;

    this.getActualCurrencies();
  }

  onFirstSelectChange($event: any, newValue: string) {
    this.selectedFirstCurrency = parseInt(newValue);

    this.onFirstNumberChange(this.firstNumber);
  }

  onSecondSelectChange($event: any, newValue: string) {
    this.selectedSecondCurrency = parseInt(newValue);

    this.onFirstNumberChange(this.firstNumber);
  }

  private convertValue(
    codeFrom: number,
    codeTo: number,
    inputValue: number
  ): number {
    return this.exchangeRateServ.getConvertedValue(
      codeFrom,
      codeTo,
      inputValue
    );
  }

  onFirstNumberChange(value: number) {
    if (!value) {
      this.secondNumber = 0;
    } else {
      this.secondNumber = this.convertValue(
        this.selectedFirstCurrency,
        this.selectedSecondCurrency,
        value
      );
    }
  }

  onSecondNumberChange(value: number) {
    if (!value) {
      this.firstNumber = 0;
    } else {
      this.firstNumber = this.convertValue(
        this.selectedSecondCurrency,
        this.selectedFirstCurrency,
        value
      );
    }
  }

  private getActualCurrencies() {
    let usdInfo = this.exchangeRateServ.getExchangeRate(Currency.USD);
    let eurInfo = this.exchangeRateServ.getExchangeRate(Currency.EUR);

    if (!usdInfo || !eurInfo) {
      if (this.exchangeRateServ.endOfAttemptsToGetData) {
        this.message = 'Oops somethisg went wrong =(';
      } else {
        setTimeout(() => {
          this.getActualCurrencies();
        }, 5000);
      }
    } else {
      this.actualCurrencies = [
        { currancyName: 'USD', currancyValue: usdInfo.rate },
        { currancyName: 'EUR', currancyValue: eurInfo.rate },
      ];

      this.isDisabledConvert = false;
    }
  }

  reverseCurrencies() {
    if (this.isDisabledConvert == false) {
      let tempCurrency = this.selectedFirstCurrency;
      this.selectedFirstCurrency = this.selectedSecondCurrency;
      this.selectedSecondCurrency = tempCurrency;

      this.onFirstNumberChange(this.firstNumber);
    }
  }
}
