import { expect, test } from 'vitest'
import validator from './src/index'

test('in', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'in:a,b'] },
        { "test field": undefined, rules: [ 'in:a,b'] },
        { "test field": "", rules: [ 'in:a,b'] },
        { "test field": "  ", rules: [ 'in:a,b'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'in:a,b'] },
        { "test field": undefined, rules: [ 'required', 'in:a,b'] },
        { "test field": "", rules: [ 'required', 'in:a,b'] },
        { "test field": "  ", rules: [ 'required', 'in:a,b'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "abc", rules: [ 'in:a,b'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 1, rules: [ 'in:a,b'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": true, rules: [ 'in:a,b'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": false, rules: [ 'in:a,b'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": " a", rules: [ 'in:a,b'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "a", rules: [ 'in:a,b'] },
    ], false)).toBe(true)
    
    expect(await validator([
        { "test field": "a", rules: [ 'in: a,b'] },
    ], false)).toBe(true)
    
    expect(await validator([
        { "test field": "b", rules: [ 'in:a, b'] },
    ], false)).toBe(true)
  
  
        
})