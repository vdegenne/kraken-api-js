import got from 'got'
import {createHash,createHmac} from 'crypto'
import qs from 'qs'

// Public/Private method names
const KrakenMethods = {
  public: ['Time', 'Assets', 'AssetPairs', 'Ticker', 'Depth', 'Trades', 'Spread', 'OHLC'],
  private: ['Balance', 'TradeBalance', 'OpenOrders', 'ClosedOrders', 'QueryOrders', 'TradesHistory', 'QueryTrades', 'OpenPositions', 'Ledgers', 'QueryLedgers', 'TradeVolume', 'AddOrder', 'CancelOrder', 'DepositMethods', 'DepositAddresses', 'DepositStatus', 'WithdrawInfo', 'Withdraw', 'WithdrawStatus', 'WithdrawCancel', 'GetWebSocketsToken']
}

// Default options
const defaults = {
  url: 'https://api.kraken.com',
  version: 0,
  timeout: 5000
}

// Create a signature for a request
const getMessageSignature = (path:string, request:any, secret:string, nonce:string) => {
  const message = qs.stringify(request)
  const secret_buffer = Buffer.from(secret, 'base64')
  const hash = createHash('sha256')
  const hmac = createHmac('sha512', secret_buffer)
  // @ts-ignore
  const hash_digest = hash.update(nonce + message).digest('binary')
  // @ts-ignore
  const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64')

  return hmac_digest
}

// Send an API request
const rawRequest = async (url:string, headers:any, data:any, timeout:number) => {
  // Set custom User-Agent string
  headers['User-Agent'] = 'Kraken Javascript API Client'

  const options = { headers, timeout }

  Object.assign(options, {
    method: 'POST',
    body: qs.stringify(data)
  })

  const { body } = await got(url, options)
  const response = JSON.parse(body)

  if (response.error && response.error.length) {
    const error = response.error.filter((e:string) => e.startsWith('E')).map((e:string) => e.substr(1))

    if (!error.length) {
      throw new Error('Kraken API returned an unknown error')
    }

    throw new Error(error.join(', '))
  }

  return response
}

export type KrakenOptions = {
  url?:string
  version?:number
  timeout?:number
  otp?:string
  key?:string
  secret?:string
}

/**
 * KrakenClient connects to the Kraken.com API
 * @param {String}        key               API Key
 * @param {String}        secret            API Secret
 * @param {String|Object} [options={}]      Additional options. If a string is passed, will default to just setting `options.otp`.
 * @param {String}        [options.otp]     Two-factor password (optional) (also, doesn't work)
 * @param {Number}        [options.timeout] Maximum timeout (in milliseconds) for all API-calls (passed to `request`)
 */
class KrakenClient {

  protected config: any

  constructor(key:string, secret:string, options?:KrakenOptions|string) {
    // Allow passing the OTP as the third argument for backwards compatibility
    if (typeof options === 'string') {
      options = { otp: options }
    }

    this.config = Object.assign({ key, secret }, defaults, options)
  }

  /**
	 * This method makes a public or private API request.
	 * @param  {String}   method   The API method (public or private)
	 * @param  {Object}   params   Arguments to pass to the api call
	 * @param  {Function} callback A callback function to be executed when the request is complete
	 * @return {Object}            The request object
	 */
  api(method:string, params:Function|any = {}, callback?:Function) {
    // Default params to empty object
    if (typeof params === 'function') {
      callback = params
      params = {}
    }

    if (KrakenMethods.public.includes(method)) {
      return this.publicMethod(method, params, callback)
    } else if (KrakenMethods.private.includes(method)) {
      return this.privateMethod(method, params, callback)
    } else {
      throw new Error(method + ' is not a valid API method.')
    }
  }

  /**
	 * This method makes a public API request.
	 * @param  {String}   method   The API method (public or private)
	 * @param  {Object}   params   Arguments to pass to the api call
	 * @param  {Function} callback A callback function to be executed when the request is complete
	 * @return {Object}            The request object
	 */
  publicMethod(method:string, params:any, callback?:Function) {
    params = params || {}

    // Default params to empty object
    if (typeof params === 'function') {
      callback = params
      params = {}
    }

    const path = '/' + this.config.version + '/public/' + method
    const url = this.config.url + path
    const response = rawRequest(url, {}, params, this.config.timeout)

    if (callback !== undefined && typeof callback === 'function') {
      response.then(result => (callback as Function)(null, result)).catch(error => (callback as Function)(error, null))
    }

    return response
  }

  /**
	 * This method makes a private API request.
	 * @param  {String}   method   The API method (public or private)
	 * @param  {Object}   params   Arguments to pass to the api call
	 * @param  {Function} callback A callback function to be executed when the request is complete
	 * @return {Object}            The request object
	 */
  privateMethod(method:string, params:any, callback?:Function) {
    params = params || {}

    // Default params to empty object
    if (typeof params === 'function') {
      callback = params
      params = {}
    }

    const path = '/' + this.config.version + '/private/' + method
    const url = this.config.url + path

    if (!params.nonce) {
      params.nonce = +new Date() * 1000 // spoof microsecond
    }

    if (this.config.otp !== undefined) {
      params.otp = this.config.otp
    }

    const signature = getMessageSignature(path, params, this.config.secret, params.nonce)

    const headers = {
      'API-Key': this.config.key,
      'API-Sign': signature
    }

    const response = rawRequest(url, headers, params, this.config.timeout)

    if (callback !== undefined && typeof callback === 'function') {
      response.then(result => (callback as Function)(null, result)).catch(error => (callback as Function)(error, null))
    }

    return response
  }
}

export { KrakenMethods, KrakenClient }
