import { Component } from '@angular/core';
import { Input } from '@angular/core';

import { CurrencyInfo } from '../../shared/interfaces/CurrencyInfo';

@Component({
    selector: 'app-actual-currencies',
    templateUrl: './actual-currencies.component.html',
    styleUrls: ['./actual-currencies.component.scss'],
})
export class ActualCurrenciesComponent {
    @Input() actualCurrenciesArray: CurrencyInfo[] = [];
}