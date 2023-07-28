import { expect, test } from 'vitest'
import validator from './src/index'

test('max', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'max:5'] },
        { "test field": undefined, rules: [ 'max:5'] },
        { "test field": "", rules: [ 'max:5'] },
        { "test field": "  ", rules: [ 'max:5'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'max:5'] },
        { "test field": undefined, rules: [ 'required', 'max:5'] },
        { "test field": "", rules: [ 'required', 'max:5'] },
        { "test field": "  ", rules: [ 'required', 'max:5'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "asd", rules: [ 'max:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "6", rules: [ 'max:5'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 6, rules: [ 'max:5'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "5", rules: [ 'max:5'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 5, rules: [ 'max:5'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": -5, rules: [ 'max:5'] },
    ], false)).toBe(true)
        
})

