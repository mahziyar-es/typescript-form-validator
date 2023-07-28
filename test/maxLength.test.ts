import { expect, test } from 'vitest'
import validator from './src/index'

test('max_length', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'max_length:5'] },
        { "test field": undefined, rules: [ 'max_length:5'] },
        { "test field": "", rules: [ 'max_length:5'] },
        { "test field": "  ", rules: [ 'max_length:5'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'max_length:5'] },
        { "test field": undefined, rules: [ 'required', 'max_length:5'] },
        { "test field": "", rules: [ 'required', 'max_length:5'] },
        { "test field": "    ", rules: [ 'required', 'max_length:5'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "abcdef", rules: [ 'max_length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "111111", rules: [ 'max_length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 111111, rules: [ 'max_length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "abcde", rules: [ 'max_length:5'] },
    ], false)).toBe(true)
    
    expect(await validator([
        { "test field": "abc", rules: [ 'max_length:5'] },
    ], false)).toBe(true)

      
  
        
})

