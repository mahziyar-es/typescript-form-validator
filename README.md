# Typescript Form Validator
A simple yet handy tool to validate your form fields.

you can use this validator in React, Vue and plain Typescript .

<br />


## Install
```typescript
npm i typescript-form-validator
```

## Import
```typescript
import validator from 'typescript-form-validator'
```

## Simple usage
```typescript
try{
    await validator([
        { "name": "john", rules:['required'] },
    ])

    console.log('validation passed')
}
catch(err){
    console.log('validation error:', err.message)
}
```

## Rules
<span style="color:red">Note: </span>
<span> rules will be checked only if the field has a NON empty value </span>
<p>
meaning if you use the rule "integer" without the "required", validator will only check the field to be "integer" if it has a value.  
</p>
<p style="color:orange">these values are considered empty : null, undefined, "", "   " </p>


```typescript
try{
    await validator([
    // checks if the field has a value
    // NOTE: null, undefined, "", "  " are considered empty and "required" rule will throw an error 
    {"fieldname": "field value", rules: ['required']},

    // value is required if true, not required if false
    // you can call a function instead of manually passing true
    // e.g. `required_if:${myFunction()}`
    {"fieldname": "typescript", rules: ['required_if:true']},

    // value should be a valid integer number
    {"fieldname": 1, rules: ['integer']},

    // value should be a valid float number
    {"fieldname": 1.5, rules: ['float']},

    // value should be a valid string
    // number values will cause an exception
    {"fieldname": "some string", rules: ['string']},

    // value should be a valid number
    // string values will cause an exception
    {"fieldname": 1, rules: ['number']},

    // value should be a valid boolean
    // anything other than true or false will cause an exception
    {"fieldname": true, rules: ['boolean']},

    // value should be a valid array
    {"fieldname": [1, 2, 'a', 'b'], rules: ['array']},

    // value should be a valid file
    {"fieldname": file, rules: ['file']},

    // value should be a numeric >= 2
    {"fieldname": 3, rules: ['min:2']},

    // value should be a numeric <= 2
    {"fieldname": 1, rules: ['max:2']},

    // value should be an string with a length >= 5 chars
    {"fieldname": "abcdefg", rules: ['min_length:5']},

    // value should be an string with a length <= 5 chars
    {"fieldname": "abc", rules: ['max_length:5']},

    // value should be equal to the specified value
    // if equal is used with one value e.g equal:abc
    // the validation error will be like this:
    //  fieldname should be equal to 'abc' .
    {"fieldname": "abc", rules: ['equal:abc']},
    // however, you can use equal as below too:
    {"fieldname1": "abc", rules: ['equal:fieldname2,abc']},
    // this way, abc and abc will be compared but the error will be:
    // fieldname1 should be equal to fieldname2
    // this is useful for comparing things like password and password confirmation

    // value should NOT be equal to the specified value
    // same usage as "equal" rule...
    {"fieldname": "123", rules: ['not_equal:abc']},

    // value should be one of the specified values
    {"fieldname": "2", rules: ['in:a,2,hi']},

    // value should NOT be one of the specified values
    {"fieldname": "00", rules: ['not_in:a,2,hi']},

    // value should follow the regex pattern
    {"fieldname": "a", rules: ['regex:^[a-zA-Z]*$']},

    // value should be an string ending with the specified value
    {"fieldname": "faked", rules: ['ends_with:ed']},

    // value should be an string starting with the specified value
    {"fieldname": "typescript", rules: ['starts_with:ty']},
   
])

    console.log('validation passed')
}
catch(err){
    console.log('validation error:', err.message)
}
```


## Throwing exception
default behaviour of validator is to throw an Error Exception, But you can override this behaviour by passing false to the second argument of the "validator" function

```typescript
const result = await validator([
    {"fieldname": "abc", rules: ['required']},
], false)

// result will be true if validation rules all pass
// and false if one of the rules fails
console.log(result)
```


## "1" and 1
default behaviour of validator is to treat string values that are numeric as numbers. meaning that any string that is numeric will pass the validations meant for numbers.

e.g. "4" and 4 will pass "integer" rule but

you can override this behaviour by passing false to third argument of the validator function

```typescript
const result = await validator([
    {"fieldname": "4", rules: ['integer']},
], false, false)    

// result will be false because "4" is a string
console.log(result)
```


## language
currently validator only supports English and Persian, BUT more languages will be added in the future.

you can select the english or persian by passing the name to the fourth argument
```typescript
const result = await validator([
    {"fieldname": "4", rules: ['integer']},
], false, false, "english")    
```


however, you can pass your own message for each field validation rule
```typescript
await validator([
    {"name": undefined, rules: ['required'], messages: {'required': 'enter the name'} },
])
```