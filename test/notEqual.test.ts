import { expect, test } from 'vitest'
import validator from './src/index'

test('not_equal', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'not_equal:abc'] },
        { "test field": undefined, rules: [ 'not_equal:abc'] },
        { "test field": "", rules: [ 'not_equal:abc'] },
        { "test field": "  ", rules: [ 'not_equal:abc'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'not_equal:abc'] },
        { "test field": undefined, rules: [ 'required', 'not_equal:abc'] },
        { "test field": "", rules: [ 'required', 'not_equal:abc'] },
        { "test field": "  ", rules: [ 'required', 'not_equal:abc'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "abc", rules: [ 'not_equal:abc'] },
    ], false)).toBe(false)
  
    expect(await validator([
        { "test field": "11", rules: [ 'not_equal:11'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 11, rules: [ 'not_equal:11'] },
    ], false)).toBe(false)
  
    expect(await validator([
        { "test field": 11, rules: [ 'not_equal:compareable,11'] },
    ], false)).toBe(false)
  
    expect(await validator([
        { "test field": "ab", rules: [ 'not_equal:compareable,ab'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "abd", rules: [ 'not_equal:abc'] },
    ], false)).toBe(true)
  
  
        
})