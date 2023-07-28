import { expect, test } from 'vitest'
import validator from './src/index'

test('min_length', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'min_length:5'] },
        { "test field": undefined, rules: [ 'min_length:5'] },
        { "test field": "", rules: [ 'min_length:5'] },
        { "test field": "  ", rules: [ 'min_length:5'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'min_length:5'] },
        { "test field": undefined, rules: [ 'required', 'min_length:5'] },
        { "test field": "", rules: [ 'required', 'min_length:5'] },
        { "test field": "    ", rules: [ 'required', 'min_length:5'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "abc", rules: [ 'min_length:5'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "11", rules: [ 'min_length:5'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 11, rules: [ 'min_length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 111111, rules: [ 'min_length:5'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "abcde", rules: [ 'min_length:5'] },
    ], false)).toBe(true)
    
    expect(await validator([
        { "test field": "11111", rules: [ 'min_length:5'] },
    ], false)).toBe(true)
    
  
        
})

