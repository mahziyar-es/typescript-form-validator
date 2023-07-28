import { expect, test } from 'vitest'
import validator from './src/index'

test('ends_with', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'ends_with:end'] },
        { "test field": undefined, rules: [ 'ends_with:end'] },
        { "test field": "", rules: [ 'ends_with:end'] },
        { "test field": "  ", rules: [ 'ends_with:end'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'ends_with:end'] },
        { "test field": undefined, rules: [ 'required', 'ends_with:end'] },
        { "test field": "", rules: [ 'required', 'ends_with:end'] },
        { "test field": "  ", rules: [ 'required', 'ends_with:end'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "a", rules: [ 'ends_with:end'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 11, rules: [ 'ends_with:end'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "abcend", rules: [ 'ends_with:end'] },
    ], false)).toBe(true)
    
    
    

        
})