import { expect, test } from 'vitest'
import validator from './src/index'


test('float', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'float'] },
        { "test field": undefined, rules: [ 'float'] },
        { "test field": "", rules: [ 'float'] },
        { "test field": "  ", rules: [ 'float'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'float'] },
        { "test field": undefined, rules: [ 'required', 'float'] },
        { "test field": "", rules: [ 'required', 'float'] },
        { "test field": "  ", rules: [ 'required', 'float'] },
    ], false)).toBe(false)


    expect(await validator([
        { "test field": "33a", rules: [ 'float'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "33.1a", rules: [ 'float'] },
    ], false)).toBe(false)
  
    expect(await validator([
        { "test field": "33", rules: [ 'float'] },
    ], false)).toBe(false)
  
    expect(await validator([
        { "test field": 33, rules: [ 'float'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 0, rules: [ 'float'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "33.1", rules: [ 'float'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 33.1, rules: [ 'float'] },
    ], false)).toBe(true)

   
})