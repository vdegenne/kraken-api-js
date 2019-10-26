# kraken-js

JavaScript full support of [`kraken-api`](https://github.com/nothingisdead/npm-kraken-api).  
Originally `kraken-api` is **CommonJS** friendly only. This package is a port for **CommonJS**, **ES2015 Module** and **TypeScript** support.

## Imports

### CommonJS

```javascript
const KrakenClient = require('kraken-js')
```

### ES-Module

```javascript
import { KrakenClient } from 'kraken-js'
```

### TypeScript (typings included)

```javascript
import { KrakenClient } from 'kraken-js'
```

## Usage

```javascript
const key = '' // your API key
const privateKey = '' // your API private key
const kraken = new KrakenClient(key, privateKey)

// example
const main = async () => {
  /* public endpoint */
  const json = await kraken.api('Ticker', { pair: 'XRPUSD' })
  console.log(json.result.XXRPZUSC.c) // print current value of XRP

  /* private endpoint */
  const json = await kraken.api('Balance')
  console.log(json.result.XXBT) // print how much Bitcoin you have on your account right now
}

main()
```

Below is a list of the different methods you can call. To see the parameters you have to provide to each method please refer to the official [Kraken API page](https://www.kraken.com/features/api)

### public methods

`Time` `Assets` `AssetPairs` `Ticker` `Depth` `Trades` `Spread` `OHLC`

### private methods

`Balance` `TradeBalance` `OpenOrders` `ClosedOrders` `QueryOrders` `TradesHistory` `QueryTrades` `OpenPositions` `Ledgers` `QueryLedgers` `TradeVolume` `AddOrder` `CancelOrder` `DepositMethods` `DepositAddresses` `DepositStatus` `WithdrawInfo` `Withdraw` `WithdrawStatus` `WithdrawCancel`

## Contact

vdegenne (at) gmail (dot) com

## support

BTC donation address : 3KfrLBhWgKxnNH9hoC8ipSPYi3LW3Qrj8i  
ETH donation address : 0x2b168Ec72b8B6168E3A0BAFa3A2f356374C880C5