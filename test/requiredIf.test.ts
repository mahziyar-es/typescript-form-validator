import { expect, test } from 'vitest'
import validator from './src/index'

test('required_if', async () => {

    expect(await validator([
        { "test field": null, rules: [ 'required_if:false' ] },
        { "test field": undefined, rules:  [ 'required_if:false' ] },
        { "test field": "", rules: [ 'required_if:false' ] },
        { "test field": "  ", rules:  [ 'required_if:false' ] },
    ], false)).toBe(true)

    expect(await validator([
        { "test field": null, rules: [ 'required_if:true' ] },
        { "test field": undefined, rules: [ 'required_if:true' ] },
        { "test field": "", rules: [ 'required_if:true' ] },
        { "test field": "  ", rules: [ 'required_if:true' ] },
    ], false)).toBe(false)

    
    expect(await validator([
        { "test field": "a", rules: [ 'required_if:false' ] },
    ], false)).toBe(true)
    
    
    expect(await validator([
        { "test field": "a", rules: [ 'required_if:true' ] },
    ], false)).toBe(true)
    
    expect(await validator([
        { "test field": 1, rules: [ 'required_if:true' ] },
    ], false)).toBe(true)
    


        
})