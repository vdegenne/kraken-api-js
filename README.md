# kraken-api-js

JavaScript full support of [`kraken-api`](https://github.com/nothingisdead/npm-kraken-api).  
Originally `kraken-api` is **CommonJS** friendly only. This package is a port for **CommonJS**, **ES2015 Module** and **TypeScript** support.

## Imports

### CommonJS

```javascript
const { KrakenClient } = require('kraken-api-js')
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
  const {result} = await kraken.api('Ticker', { pair: 'XRPUSD' })
  console.log(result.XXRPZUSD.c) // print current USD value of XRP

  // private endpoint
  const {result} = await kraken.api('Balance')
  console.log(result.XXBT) // print how much bitcoins you have on your account right now
}

main()
```
---

*Below is a list of the different methods you can call. To see the parameters you have to provide to each method please refer to the official [Kraken API page](https://www.kraken.com/features/api)*

### public methods

`Time` `Assets` `AssetPairs` `Ticker` `Depth` `Trades` `Spread` `OHLC`

### private methods

`Balance` `TradeBalance` `OpenOrders` `ClosedOrders` `QueryOrders` `TradesHistory` `QueryTrades` `OpenPositions` `Ledgers` `QueryLedgers` `TradeVolume` `AddOrder` `CancelOrder` `DepositMethods` `DepositAddresses` `DepositStatus` `WithdrawInfo` `Withdraw` `WithdrawStatus` `WithdrawCancel` `GetWebSocketsToken`

### import methods list

The array of both public and private methods can be imported into your project

```javascript
/* commonjs */
const { KrakenMethods } = require('kraken-api-js')

/* es-module & typescript */
import { KrakenMethods } from 'kraken-api-js'
```


## Errors handling

In `kraken-api` if the response from the API contains an error the `api` method will throw an `Error`.
In this version, the response is always a json object, giving you more freedom to handle the errors :

```javascript
try {
  const {result, error} = await client.api('Ticker', { pair: 'fakePair' })
  if (error.length > 0) {
    console.log(`Response contains errors [ ${error.join(', ')} ]`)
    return
  }
  else if (result) {
    console.log('Response is clean')
    console.log(result)
  }
} catch (e) {
  // this piece of code will only get executed if the API couldn't be reached
  // (e.g. if the network has no connection to internet)
  console.log('the API couldn\'t be reached')
}
```

## Author

Valentin Degenne

vdegenne (at) gmail (dot) com

bitcoin:3KfrLBhWgKxnNH9hoC8ipSPYi3LW3Qrj8i  
ethereum:0x2b168Ec72b8B6168E3A0BAFa3A2f356374C880C5