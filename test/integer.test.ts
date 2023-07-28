import { expect, test } from 'vitest'
import validator from './src/index'

test('integer', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'integer'] },
        { "test field": undefined, rules: [ 'integer'] },
        { "test field": "", rules: [ 'integer'] },
        { "test field": "  ", rules: [ 'integer'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'integer'] },
        { "test field": undefined, rules: [ 'required', 'integer'] },
        { "test field": "", rules: [ 'required', 'integer'] },
        { "test field": "  ", rules: [ 'required', 'integer'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "aa", rules: [ 'integer'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "22a", rules: [ 'integer'] },
    ], false, true)).toBe(false)

    expect(await validator([
        { "test field": "22.5", rules: [ 'integer'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 22.5, rules: [ 'integer'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "22", rules: [ 'integer'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 22, rules: [ 'integer'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 0, rules: [ 'integer'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": -5, rules: [ 'integer'] },
    ], false)).toBe(true)
    
})