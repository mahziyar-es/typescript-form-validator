import { expect, test } from 'vitest'
import validator from './src/index'

test('starts_with', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'starts_with:start'] },
        { "test field": undefined, rules: [ 'starts_with:start'] },
        { "test field": "", rules: [ 'starts_with:start'] },
        { "test field": "  ", rules: [ 'starts_with:start'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'starts_with:start'] },
        { "test field": undefined, rules: [ 'required', 'starts_with:start'] },
        { "test field": "", rules: [ 'required', 'starts_with:start'] },
        { "test field": "  ", rules: [ 'required', 'starts_with:start'] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "a", rules: [ 'starts_with:start'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "sta", rules: [ 'starts_with:start'] },
    ], false)).toBe(false)
    
    expect(await validator([
        { "test field": "starttt", rules: [ 'starts_with:start'] },
    ], false)).toBe(true)
    

        
})