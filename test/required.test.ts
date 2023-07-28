import { expect, test } from 'vitest'
import validator from './src/index'

test('required', async () => {
    
    expect(await validator([
        { "test field": "", rules: [ 'required'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": null, rules: [ 'required'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": undefined, rules: [ 'required'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "  ", rules: [ 'required'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "value", rules: [ 'required'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 33, rules: [ 'required'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 0, rules: [ 'required'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": -5, rules: [ 'required'] },
    ], false)).toBe(true)

})