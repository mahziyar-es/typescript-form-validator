import { expect, test } from 'vitest'
import validator from './src/index'

test('boolean', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'boolean'] },
        { "test field": undefined, rules: [ 'boolean'] },
        { "test field": "", rules: [ 'boolean'] },
        { "test field": "  ", rules: [ 'boolean'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'boolean'] },
        { "test field": undefined, rules: [ 'required', 'boolean'] },
        { "test field": "", rules: [ 'required', 'boolean'] },
        { "test field": "  ", rules: [ 'required', 'boolean'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 1, rules: [ 'boolean'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "a", rules: [ 'boolean'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": false, rules: [ 'boolean'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": true, rules: [ 'boolean'] },
    ], false)).toBe(true)
        
})