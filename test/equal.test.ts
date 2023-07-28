import { expect, test } from 'vitest'
import validator from './src/index'

test('equal', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'equal:abc'] },
        { "test field": undefined, rules: [ 'equal:abc'] },
        { "test field": "", rules: [ 'equal:abc'] },
        { "test field": "  ", rules: [ 'equal:abc'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'equal:abc'] },
        { "test field": undefined, rules: [ 'required', 'equal:abc'] },
        { "test field": "", rules: [ 'required', 'equal:abc'] },
        { "test field": "  ", rules: [ 'required', 'equal:abc'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "abd", rules: [ 'equal:abc'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 12, rules: [ 'equal:11'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 1, rules: [ 'equal:compareable field,11'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 'abc', rules: [ 'equal:compareable field,abd'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "11", rules: [ 'equal:11'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 11, rules: [ 'equal:11'] },
    ], false)).toBe(true)
    
    expect(await validator([
        { "test field": "abc", rules: [ 'equal:abc'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 'abc', rules: [ 'equal:compareable field,abc'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": 1, rules: [ 'equal:compareable field,1'] },
    ], false)).toBe(true)

  
        
})