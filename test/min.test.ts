import { expect, test } from 'vitest'
import validator from './src/index'

test('min', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'min:2'] },
        { "test field": undefined, rules: [ 'min:2'] },
        { "test field": "", rules: [ 'min:2'] },
        { "test field": "  ", rules: [ 'min:2'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'min:2'] },
        { "test field": undefined, rules: [ 'required', 'min:2'] },
        { "test field": "", rules: [ 'required', 'min:2'] },
        { "test field": "  ", rules: [ 'required', 'min:2'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "asd", rules: [ 'min:2'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "1", rules: [ 'min:2'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 1, rules: [ 'min:2'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 3, rules: [ 'min:2'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": "3", rules: [ 'min:2'] },
    ], false)).toBe(true)

        
})

