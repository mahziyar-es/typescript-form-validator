import { expect, test } from 'vitest'
import validator from './src/index'

test('not_in', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'not_in:a,b'] },
        { "test field": undefined, rules: [ 'not_in:a,b'] },
        { "test field": "", rules: [ 'not_in:a,b'] },
        { "test field": "  ", rules: [ 'not_in:a,b'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'not_in:a,b'] },
        { "test field": undefined, rules: [ 'required', 'not_in:a,b'] },
        { "test field": "", rules: [ 'required', 'not_in:a,b'] },
        { "test field": "  ", rules: [ 'required', 'not_in:a,b'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "a", rules: [ 'not_in:a,b'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "b", rules: [ 'not_in:a, b'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": " a", rules: [ 'not_in:a,b'] },
    ], false)).toBe(true)
  
    expect(await validator([
        { "test field": "abc", rules: [ 'not_in:a,b'] },
    ], false)).toBe(true)
  
        
})