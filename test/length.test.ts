import { expect, test } from 'vitest'
import validator from './src/index'

test('length', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'length:5'] },
        { "test field": undefined, rules: [ 'length:5'] },
        { "test field": "", rules: [ 'length:5'] },
        { "test field": "  ", rules: [ 'length:5'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'length:5'] },
        { "test field": undefined, rules: [ 'required', 'length:5'] },
        { "test field": "", rules: [ 'required', 'length:5'] },
        { "test field": "    ", rules: [ 'required', 'length:5'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "abcdef", rules: [ 'length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "111111", rules: [ 'length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 111111, rules: [ 'length:5'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "abc", rules: [ 'length:5'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "abcefgh", rules: [ 'length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "abcde", rules: [ 'length:5'] },
    ], false)).toBe(true)
    
})

