import { expect, test } from 'vitest'
import validator from './src/index'

test('file', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'file'] },
        { "test field": undefined, rules: [ 'file'] },
        { "test field": "", rules: [ 'file'] },
        { "test field": "  ", rules: [ 'file'] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required', 'file'] },
        { "test field": undefined, rules: [ 'required', 'file'] },
        { "test field": "", rules: [ 'required', 'file'] },
        { "test field": "  ", rules: [ 'required', 'file'] },
    ], false)).toBe(false)

      
    expect(await validator([
        { "test field": 123, rules: [ 'file'] },
    ], false)).toBe(false)

    expect(await validator([
        { "test field": "a", rules: [ 'file'] },
    ], false)).toBe(false)

       
})


