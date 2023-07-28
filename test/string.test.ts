import { expect, test } from 'vitest'
import validator from './src/index'

test('string', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'string'] },
        { "test field": undefined, rules: [ 'string'] },
        { "test field": "", rules: [ 'string'] },
        { "test field": "  ", rules: [ 'string'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'string'] },
        { "test field": undefined, rules: [ 'required', 'string'] },
        { "test field": "", rules: [ 'required', 'string'] },
        { "test field": "  ", rules: [ 'required', 'string'] },
    ], false)).toBe(false)

          
    expect(await validator([
        { "test field": 22, rules: [ 'string'] },
    ], false)).toBe(false)
   
    expect(await validator([
        { "test field": 0, rules: [ 'string'] },
    ], false)).toBe(false)
          
    expect(await validator([
        { "test field": -5, rules: [ 'string'] },
    ], false)).toBe(false)
   
          
    expect(await validator([
        { "test field": ['a', 'b'], rules: [ 'string'] },
    ], false)).toBe(false)
          
    expect(await validator([
        { "test field": {'a':'b'}, rules: [ 'string'] },
    ], false)).toBe(false)
          
    expect(await validator([
        { "test field": "a", rules: [ 'string'] },
    ], false)).toBe(true)
   

})