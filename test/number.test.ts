import { expect, test } from 'vitest'
import validator from './src/index'

test('number', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'number'] },
        { "test field": undefined, rules: [ 'number'] },
        { "test field": "", rules: [ 'number'] },
        { "test field": "  ", rules: [ 'number'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'number'] },
        { "test field": undefined, rules: [ 'required', 'number'] },
        { "test field": "", rules: [ 'required', 'number'] },
        { "test field": "  ", rules: [ 'required', 'number'] },
    ], false)).toBe(false)

          
    expect(await validator([
        { "test field": ['a', 'b'], rules: [ 'number'] },
    ], false)).toBe(false)
          
    expect(await validator([
        { "test field": {'a':'b'}, rules: [ 'number'] },
    ], false)).toBe(false)
          
    expect(await validator([
        { "test field": "a", rules: [ 'number'] },
    ], false)).toBe(false)
          
    expect(await validator([
        { "test field": "22", rules: [ 'number'] },
    ], false)).toBe(false)


    expect(await validator([
        { "test field": 22, rules: [ 'number'] },
    ], false)).toBe(true)
   
    expect(await validator([
        { "test field": 0, rules: [ 'number'] },
    ], false)).toBe(true)
          
    expect(await validator([
        { "test field": -5, rules: [ 'number'] },
    ], false)).toBe(true)
   

})