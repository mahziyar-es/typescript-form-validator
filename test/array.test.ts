import { expect, test } from 'vitest'
import validator from './src/index'

test('array', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'array'] },
        { "test field": undefined, rules: [ 'array'] },
        { "test field": "", rules: [ 'array'] },
        { "test field": "  ", rules: [ 'array'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'array'] },
        { "test field": undefined, rules: [ 'required', 'array'] },
        { "test field": "", rules: [ 'required', 'array'] },
        { "test field": "  ", rules: [ 'required', 'array'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "abc", rules: [ 'array'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": 123, rules: [ 'array'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": {a:1, b:"2"}, rules: [ 'array'] },
    ], false)).toBe(false)
  
    expect(await validator([
        { "test field": [1, 2], rules: [ 'array'] },
    ], false)).toBe(true)
  
    expect(await validator([
        { "test field": ["a", "b"], rules: [ 'array'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": [1, "b"], rules: [ 'array'] },
    ], false)).toBe(true)
  
        
})