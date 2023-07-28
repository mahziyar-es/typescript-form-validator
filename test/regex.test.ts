import { expect, test } from 'vitest'
import validator from './src/index'

test('regex', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'regex:/^[A-Za-z]+$/'] },
        { "test field": undefined, rules: [ 'regex:/^[A-Za-z]+$/'] },
        { "test field": "", rules: [ 'regex:/^[A-Za-z]+$/'] },
        { "test field": "  ", rules: [ 'regex:/^[A-Za-z]+$/'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'regex:/^[A-Za-z]+$/'] },
        { "test field": undefined, rules: [ 'required', 'regex:/^[A-Za-z]+$/'] },
        { "test field": "", rules: [ 'required', 'regex:/^[A-Za-z]+$/'] },
        { "test field": "  ", rules: [ 'required', 'regex:/^[A-Za-z]+$/'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "a1", rules: [ 'regex:^[A-Za-z]+$'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": 11, rules: [ 'regex:^[A-Za-z]+$'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "a", rules: [ 'regex:^[A-Za-z]+$'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": "abc", rules: [ 'regex:^[A-Za-z]+$'] },
    ], false)).toBe(true)
    

        
})