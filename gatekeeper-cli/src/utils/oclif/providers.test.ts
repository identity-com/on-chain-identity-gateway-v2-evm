import {BaseProvider, JsonRpcProvider} from '@ethersproject/providers'
import {getProvider, getLocalhostProvider} from './providers'
import assert = require('assert');

describe('Check ethers provider', function () {
  let provider: BaseProvider
  const mainnetNetworkID = 1
  const goerliNetworkID = 5

  it('Try connect to localhost provider, check connection URL', () => {
    const provider: JsonRpcProvider = getLocalhostProvider()
    assert.equal(provider.connection.url, 'http://localhost:8545')
  })
})
