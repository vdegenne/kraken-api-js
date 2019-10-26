# kraken-api-js

JavaScript full support of [`kraken-api`](https://github.com/nothingisdead/npm-kraken-api).  
Originally `kraken-api` is **CommonJS** friendly only. This package is a port for **CommonJS**, **ES2015 Module** and **TypeScript** support.

## Imports

### CommonJS

```javascript
const KrakenClient = require('kraken-api-js')
```

### ES-Module

```javascript
import { KrakenClient } from 'kraken-api-js'
```

### TypeScript (typings included)

```javascript
import { KrakenClient } from 'kraken-api-js'
```

## Usage

```javascript
const key = '' // your API key
const privateKey = '' // your API private key
const kraken = new KrakenClient(key, privateKey)

/* examples */
const main = async () => {
  // public endpoint
  const json = await kraken.api('Ticker', { pair: 'XRPUSD' })
  console.log(json.result.XXRPZUSD.c) // print current USD value of XRP

  // private endpoint
  const json = await kraken.api('Balance')
  console.log(json.result.XXBT) // print how much bitcoins you have on your account right now
}

main()
```
---

*Below is a list of the different methods you can call. To see the parameters you have to provide to each method please refer to the official [Kraken API page](https://www.kraken.com/features/api)*

### public methods

`Time` `Assets` `AssetPairs` `Ticker` `Depth` `Trades` `Spread` `OHLC`

### private methods

`Balance` `TradeBalance` `OpenOrders` `ClosedOrders` `QueryOrders` `TradesHistory` `QueryTrades` `OpenPositions` `Ledgers` `QueryLedgers` `TradeVolume` `AddOrder` `CancelOrder` `DepositMethods` `DepositAddresses` `DepositStatus` `WithdrawInfo` `Withdraw` `WithdrawStatus` `WithdrawCancel`

## Author

Valentin Degenne

vdegenne (at) gmail (dot) com

bitcoin:3KfrLBhWgKxnNH9hoC8ipSPYi3LW3Qrj8i  
ethereum:0x2b168Ec72b8B6168E3A0BAFa3A2f356374C880C5