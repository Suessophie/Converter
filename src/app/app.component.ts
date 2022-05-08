import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currencies: any[] = [];
    value1: number = 1;
    value2: number = 1;
    value3: number = 1;
    value4: number = 1;
    initialSelect1 = 'UAH';
    initialSelect2 = 'USD';
    uah: number = 0;
    usd: number = 0;
    eur: number = 0;
    currencyUsd = '';
    currencyEur = '';
    invalid: boolean = false;

    request = fetch('https://cdn.cur.su/api/nbu.json')
        .then(response => response.json())
        .then(result => {
            this.currencies = Object.entries(result.rates);
            this.value2 = this.currencies.filter(currency => currency[0] === this.initialSelect1)[0][1];
            this.value4 = this.currencies.filter(currency => currency[0] === this.initialSelect2)[0][1];
            this.value3 = this.value1 * this.value4 / this.value2;
            this.uah = this.currencies.filter(currency => currency[0] === 'UAH')[0][1];
            this.usd = this.currencies.filter(currency => currency[0] === 'USD')[0][1];
            this.eur = this.currencies.filter(currency => currency[0] === 'EUR')[0][1];
            this.currencyUsd = (this.uah / this.usd).toFixed(2);
            this.currencyEur = (this.uah / this.eur).toFixed(2);
        })
        .catch(error => console.log('error', error));

    handlerInput = (value: string, position: string) => {
        let dotCount = 0;
        for (const item of value) {
            if (item === '.') {
                dotCount++;
            }
            if (!(+item >= 0 && +item <= 9 || item === '.') || dotCount > 1) {
                this.invalid = true;
                return;
            }
        }
        this.invalid = false;
        if (position === 'top') {
            this.value1 = +value;
            this.countValue3();
        }
        if (position === 'bottom') {
            this.value3 = +value;
            this.countValue1();
        }
    }

    handlerSelect = (value: string, position: string) => {
        if (position === 'top') {
            this.value2 = +value;
        }
        if (position === 'bottom') {
            this.value4 = +value;
        }
        this.countValue3();
    }

    countValue1 = () => {
        this.value1 = this.value3 * this.value2 / this.value4;
    }

    countValue3 = () => {
        this.value3 = this.value1 * this.value4 / this.value2;
    }
}
