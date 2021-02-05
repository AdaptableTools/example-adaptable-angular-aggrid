import {
  AdaptableApi,
  DataUpdateConfig,
} from '@adaptabletools/adaptable-angular-aggrid';
import { GridOptions, RowNode } from '@ag-grid-community/all-modules';

export interface ITrade {
  tradeId: number;
  notional: number;
  counterparty: string;
  history: number[];
  currency: string;
  status: string;
  country: string;
  changeOnYear: number;
  price: number;
  bid: number;
  ask: number;
  bidOfferSpread: number;
  isLive: boolean;
  rating: string;
  tradeDate: Date;
  settlementDate: Date;
  bloombergAsk: number;
  bloombergBid: number;
  indicativeAsk: number;
  indicativeBid: number;
  markitAsk: number;
  markitBid: number;
}

export class DummyTradeBuilder {
  public createTrade(i: number): ITrade {
    var price = this.getMeaningfulDouble();
    var bidOfferSpread = this.getRandomItem(this.getBidOfferSpreads());
    var ask = price + bidOfferSpread / 2;
    var bid = price - bidOfferSpread / 2;
    var tradeDate = this.generateRandomDateAndTime(-500, 10);
    let tradeCurrency = this.getRandomItem(this.getCurrencies());
    var trade: ITrade = {
      tradeId: i,
      history: [...new Array(this.generateRandomInt(5, 20))].map((_) =>
        this.generateRandomInt(1, 30)
      ),
      notional: this.getRandomItem(this.getNotionals()),
      counterparty: this.getRandomItem(this.getCounterparties()),
      currency: tradeCurrency,
      country: this.getRandomItem(this.getCountries()),
      changeOnYear: this.getMeaningfulPositiveNegativeDouble(),
      price: price,
      bid: bid,
      ask: ask,
      bidOfferSpread: bidOfferSpread,
      status: this.getStatus(),
      isLive: this.generateRandomBool(),
      rating: this.getRandomItem(this.getRatings()),
      tradeDate: tradeDate,
      settlementDate: this.addDays(tradeDate, this.generateRandomInt(3, 20)),
      bloombergAsk: this.roundTo4Dp(ask + this.generateRandomDouble()),
      bloombergBid: this.roundTo4Dp(bid - this.generateRandomDouble()),
      indicativeAsk: this.roundTo4Dp(ask + this.generateRandomDouble()),
      indicativeBid: this.roundTo4Dp(bid - this.generateRandomDouble()),
      markitAsk: this.roundTo4Dp(ask + this.generateRandomDouble()),
      markitBid: this.roundTo4Dp(bid - this.generateRandomDouble()),
    };
    return trade;
  }

  protected getMeaningfulDouble(): number {
    return this.roundTo4Dp(
      this.generateRandomInt(10, 150) + this.generateRandomDouble()
    );
  }
  protected getSmallDouble(): number {
    return this.roundTo4Dp(
      this.generateRandomInt(0, 150) + this.generateRandomDouble()
    );
  }

  protected generateCounterparty(): string {
    var counterparties = this.getCounterparties();
    return (counterparties[
      this.generateRandomInt(0, counterparties.length - 1)
    ] as any) as string;
  }

  protected generateCurrency(): string {
    var currencies = this.getCurrencies();
    return currencies[this.generateRandomInt(0, currencies.length - 1)];
  }

  protected getRandomItem(ary: any[], max?: number): any {
    if (max) {
      return ary[this.generateRandomInt(0, Math.min(max, ary.length - 1))];
    } else {
      return ary[this.generateRandomInt(0, ary.length - 1)];
    }
  }

  protected getNotionals(): number[] {
    var notionals = [
      500000,
      1000000,
      1500000,
      2000000,
      2500000,
      3000000,
      4000000,
      5000000,
      6000000,
      7500000,
      8000000,
      9000000,
      10000000,
    ];
    return notionals;
  }
  protected getBidOfferSpreads(): number[] {
    var counterparties = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5];
    return counterparties;
  }
  protected getCounterparties(): (string | null | undefined)[] {
    var counterparties = [
      'Goldman Sachs',
      'Societe Generale',
      'Bank of America',
      'RBS',
      'Barcap',
      'JP Morgan',
      'Morgan Stanley',
      'BNP',
      'Lloyds TSB',
      'MUFJ',
      'Rabobank',
      'Deutsche Bank',
      'Credit Suisse',
      'Nomura',
    ];
    return counterparties;
  }

  protected getCurrencies(): string[] {
    var currencies = ['EUR', 'USD', 'GBP', 'CHF', 'CAD', 'AUD', 'ZAR'];
    return currencies;
  }

  protected getCountries(): string[] {
    var countries = [
      'Australia',
      'Belgium',
      'Brazil',
      'Canada',
      'China',
      'France',
      'Germany',
      'Holland',
      'India',
      'Italy',
      'Japan',
      'Luxembourg',
      'Russia',
      'Spain',
      'United Kingdom',
      'United States',
    ];
    return countries;
  }

  protected getRatings(): string[] {
    return [
      'Aaa',
      'Aa1',
      'Aa2',
      'Aa3',
      'A1',
      'A2',
      'A3',
      'Baa1',
      'Baa2',
      'Baa3',
      'Ba1',
      'Ba2',
      'Ba3',
      'B1',
      'B2',
      'B3',
      'Caa',
      'Ca',
      'C',
      'WR',
      'NR',
    ];
  }

  protected generateRandomInt(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  }

  protected generateRandomBool(): boolean {
    var amount = this.generateRandomInt(0, 1);
    return amount === 0;
  }

  protected roundTo4Dp(val: number): number {
    return Math.round(val * 10000) / 10000;
  }

  protected generateRandomDateAndTime(minDays: number, maxDays: number): Date {
    var currentDate = new Date(); // Fix it
    var start = this.addDays(currentDate, minDays);
    var end = this.addDays(currentDate, maxDays);
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  protected generateRandomDouble(): number {
    return Math.random();
  }

  protected addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }

  protected getStatus(): string {
    const randomNumber = this.generateRandomInt(1, 9);
    if (randomNumber < 8) {
      return 'Pending';
    }
    if (randomNumber == 8) {
      return 'Completed';
    }
    if (randomNumber == 9) {
      return 'Rejected';
    }
    return '';
  }

  protected getMeaningfulPositiveNegativeDouble(): number {
    return this.roundTo4Dp(
      this.generateRandomInt(-150, 150) + this.generateRandomDouble()
    );
  }

  public startTickingDataagGridTrade(
    api: AdaptableApi,
    gridOptions: GridOptions,
    tickingFrequency: number,
    upperLevel: number
  ) {
    if (gridOptions != null && gridOptions.api != null) {
      setInterval(() => {
        let index: string = this.generateRandomInt(1, upperLevel).toString();
        let rowNode: RowNode = gridOptions.api!.getRowNode(index);
        if (rowNode) {
          // NOTE:  You need to make a COPY of the data that you are changing...
          const trade: ITrade = { ...rowNode.data };
          if (trade) {
            const randomInt = this.generateRandomInt(1, 2);
            const numberToAdd: number = randomInt == 1 ? -0.5 : 0.5;
            const directionToAdd: number = randomInt == 1 ? -0.01 : 0.01;
            const newPrice = this.roundTo4Dp(trade.price + numberToAdd); // numberToAdd
            const bidOfferSpread = trade.bidOfferSpread;
            const ask = this.roundTo4Dp(newPrice + bidOfferSpread / 2);
            const bid = this.roundTo4Dp(newPrice - bidOfferSpread / 2);
            const notional = this.getRandomItem(this.getNotionals());

            trade.price = newPrice;
            trade.bid = bid;
            trade.ask = ask;
            trade.bloombergAsk = this.roundTo4Dp(ask + directionToAdd);
            trade.bloombergBid = this.roundTo4Dp(bid - directionToAdd);
            trade.notional = notional;
            //    trade.notional = this.generateRandomInt(1, 50);
            trade.changeOnYear = this.getMeaningfulDouble();

            let config: DataUpdateConfig = {
              runAsync: true,
              // callback: test,
            };
            api.gridApi.updateGridData([trade], config);
            // gridOptions.api!.applyTransaction({ update: [trade] });
          }
        }
      }, tickingFrequency);
    }
  }
}
