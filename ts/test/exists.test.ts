
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ThrowawayEmailSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ThrowawayEmailSDK.test()
    equal(testsdk instanceof ThrowawayEmailSDK, true,
      'ThrowawayEmailSDK.test() must return a client synchronously')
  })

})
