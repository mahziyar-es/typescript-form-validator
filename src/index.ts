import messageGenerator from "./messageGenerator"

var config :
{
    consider_number_strings: boolean,
    throw_exception: boolean,
    lang: "english" | "persian",
}
= {
    consider_number_strings: true,
    throw_exception: true,
    lang: "english" ,
} 

const validator =  async (
    fields : {
        [index: string]: any,
        rules: (
            "required" 
            |"integer" 
            |"float" 
            |"string"
            |"number"
            |"boolean"
            |"array"
            |"file"
            |`min:${number}` 
            |`max:${number}` 
            |`min_length:${number}` 
            |`max_length:${number}` 
            |`equal:${string|number}` 
            |`not_equal:${number|string}` 
            |`in:${string}` 
            |`not_in:${string}` 
            |`regex:${string}`
            |`ends_with:${string}`
            |`starts_with:${string}`
            |`required_if:${boolean}`
        )[],
        messages?: {[index:string]:string}
    }[],
    throwException=true,
    considerNumberStrings=true,
    lang:"english"|"persian" = "english"
)=>{

    config.throw_exception = throwException
    config.consider_number_strings = considerNumberStrings
    config.lang = lang

    try{
        fields.map(field=>{
            const fieldname = Object.keys(field)[0]
            let fieldValue = field[fieldname]
            const rules = field['rules']
            const messages = field['messages']

            if(rules.indexOf('required') != -1) validateRequired(fieldname, fieldValue, messages?.['required'])
            else if(rules.indexOf(`required_if:${true}`) != -1) validateRequired(fieldname, fieldValue, messages?.['required_if'])
            else if(isEmpty(fieldValue)) return

            rules.map(rule=>{
                if(rule == 'string') validateString(fieldname, fieldValue, messages?.['string'])
                if(rule == 'number') validateNumber(fieldname, fieldValue, messages?.['number'])
                if(rule == 'integer') validateInteger(fieldname, fieldValue, messages?.['integer'])
                if(rule == 'float') validateFloat(fieldname, fieldValue, messages?.['float'])
                if(rule == 'boolean') validateBoolean(fieldname, fieldValue, messages?.['boolean'])
                if(rule == 'array') validateArray(fieldname, fieldValue, messages?.['array'])
                if(rule == 'file') validateFile(fieldname, fieldValue, messages?.['file'])
                if(rule.startsWith('min:')) validateMin(fieldname, fieldValue, rule, messages?.['min'])
                if(rule.startsWith('max:')) validateMax(fieldname, fieldValue, rule, messages?.['max'])
                if(rule.startsWith('min_length:')) validateMinLength(fieldname, fieldValue, rule, messages?.['min_length'])
                if(rule.startsWith('max_length:')) validateMaxLength(fieldname, fieldValue, rule, messages?.['max_length'])
                if(rule.startsWith('in:')) validateIn(fieldname, fieldValue, rule, messages?.['in'])
                if(rule.startsWith('not_in:')) validateNotIn(fieldname, fieldValue, rule, messages?.['not_in'])
                if(rule.startsWith('equal:')) validateEqual(fieldname, fieldValue, rule, messages?.['equal'])
                if(rule.startsWith('not_equal:')) validateNotEqual(fieldname, fieldValue, rule, messages?.['not_equal'])
                if(rule.startsWith('ends_with:')) validateEndsWith(fieldname, fieldValue, rule, messages?.['ends_with'])
                if(rule.startsWith('starts_with:')) validateStartsWith(fieldname, fieldValue, rule, messages?.['starts_with'])
                if(rule.startsWith('regex:')) validateRegex(fieldname, fieldValue, rule, messages?.['regex'])
            })
        
        })
    }
    catch(error: any){
        if(config.throw_exception) throw new Error(error.message)
        else return false
    }

    return true
}


const messageGen = (field: string, params: string[])=>{
    return messageGenerator(field,params, config.lang)
}

const isEmpty = (value: any)=>{
    try{ value = value.trim() }catch(err){}
    if(!isBoolean(value) && !value && value !== 0) return true 
    return false
}

const isBoolean = (value: any)=>{
    if(typeof value === 'boolean') return true 
    return false
}

const isNumber = (value: any)=>{
    try{ value = value.trim() }catch(err){}
    if(!isBoolean(value) && !isEmpty(value) && value/Number(value) === 1) return true 
    return false
}

const isString = (value: any)=>{
    try{ value = value.trim() }catch(err){}
    if(!isBoolean(value) && !isEmpty(value) && (typeof value === 'string')) return true 
    return false
}

const validateRequired = (fieldname: string, value: any, message ?: string)=>{
    if(isEmpty(value)) throw new Error(message ||  messageGen('required', [fieldname]) )
}

const validateString = (fieldname: string, value: any, message ?: string)=>{
    if(typeof value != 'string') throw new Error(message ||  messageGen('string', [fieldname]))
}

const validateInteger = (fieldname: string, value: any, message ?: string)=>{
    if(config.consider_number_strings && isNumber(value)) value = Number(value)
    if(!Number.isInteger(value)) throw new Error(message ||  messageGen('integer', [fieldname]) )
}

const validateFloat = (fieldname: string, value: any, message ?: string)=>{
    if(config.consider_number_strings && isNumber(value)) value = Number(value)
    const cond1 = !(Number(value) === value && value % 1 !== 0)
    if(cond1 || typeof value != 'number') throw new Error( message ||  messageGen('float', [fieldname]) )
}

const validateBoolean = (fieldname: string, value: any, message ?: string)=>{
    if(!isBoolean(value)) throw new Error(message ||  messageGen('boolean', [fieldname]))
}

const validateArray = (fieldname: string, value: any, message ?: string)=>{
    if(!Array.isArray(value)) throw new Error(message ||  messageGen('array', [fieldname]))
}

const validateFile = (fieldname: string, value: any, message ?: string)=>{
    if (!(value instanceof File)) throw new Error(message ||  messageGen('file', [fieldname]))
}

const validateNumber = (fieldname: string, value: any, message ?: string)=>{
    if (typeof value !== 'number') throw new Error(message ||  messageGen('number', [fieldname]))
}

const validateMin = (fieldname: string, value: any, rule: string, message ?: string)=>{
    if(config.consider_number_strings && isNumber(value)) value = Number(value)
    let minValue
    try { 
        minValue = rule.split('min:')[1].trim()
        if(!isNumber(minValue)) throw new Error()
    } 
    catch(err){ console.error(`Incorrect format for "min:" `) }
    if((minValue && value < minValue) || !isNumber(value)) throw new Error(message ||  messageGen('min', [fieldname, minValue as string]))
}

const validateMax = (fieldname: string, value: any, rule: string, message ?: string)=>{
    if(config.consider_number_strings && isNumber(value)) value = Number(value)
    let maxValue
    try { 
        maxValue = rule.split('max:')[1].trim()
        if(!isNumber(maxValue)) throw new Error()
    } 
    catch(err){ console.error(`Incorrect format for "max:" `) }
    if((maxValue && value > maxValue) || !isNumber(value)) throw new Error(message ||  messageGen('max', [fieldname, maxValue as string]))
}

const validateEqual = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let comparableValue
    let comparableFieldName
    try { 
        const comparable = rule.split('equal:')[1].trim() 
        const comparableParts = comparable.split(',')
        if(comparableParts[1]){
            comparableFieldName = comparableParts[0].trim()
            comparableValue = comparableParts[1].trim()
        }
        else {
            comparableValue = comparableParts[0].trim()
        }
    } 
    catch(err){ console.error(`Incorrect format for "equal:" `) }
    if(comparableValue && value != comparableValue) throw new Error(message ||  messageGen('equal', [fieldname, comparableFieldName || comparableValue as string]))
}

const validateNotEqual = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let comparableValue
    let comparableFieldName
    try { 
        const comparable = rule.split('not_equal:')[1].trim() 
        const comparableParts = comparable.split(',')
        if(comparableParts[1]){
            comparableFieldName = comparableParts[0].trim()
            comparableValue = comparableParts[1].trim()
        }
        else {
            comparableValue = comparableParts[0].trim()
        }
    } 
    catch(err){ console.error(`Incorrect format for "not_equal:" `) }
    if(comparableValue && value == comparableValue) throw new Error(message ||  messageGen('not_equal', [fieldname, comparableFieldName || comparableValue as string]))
}


const validateRegex = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let regex
    try { regex = new RegExp(rule.split('regex:')[1].trim()) } 
    catch(err){ console.error(`Incorrect format for "regex:" `) }
    if(regex && !regex.test(value)) throw new Error(message ||  messageGen('regex', [fieldname]))
}

const validateMinLength = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let len
    try { 
        len = rule.split('min_length:')[1].trim()
        if(!isNumber(len)) throw new Error()
    } 
    catch(err){ console.error(`Incorrect format for "min_length:" `) }
    if(!isString(value) || (len && value.length < len)) throw new Error(message ||  messageGen('min_length', [fieldname, len as string]))
}

const validateMaxLength = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let len
    try { 
        len = rule.split('max_length:')[1].trim()
        if(!isNumber(len)) throw new Error()
    } 
    catch(err){ console.error(`Incorrect format for "max_length:" `) }
    if(!isString(value) || (len && value.length > len)) throw new Error(message ||  messageGen('max_length', [fieldname, len as string]))
}

const validateIn = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let valuesString
    let valuesArray
    try { 
        valuesString = rule.split('in:')[1].trim()
        valuesArray = valuesString.split(',')
        valuesArray = valuesArray.map(v=> v.trim())
        if(valuesArray.length == 0) throw new Error()
    } 
    catch(err){ console.error(`Incorrect format for "in:" `) }
    if(valuesArray && valuesArray.indexOf(value) == -1) throw new Error(message ||  messageGen('in', [fieldname, valuesString as string]))
}

const validateNotIn = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let valuesString
    let valuesArray
    try { 
        valuesString = rule.split('not_in:')[1].trim()
        valuesArray = valuesString.split(',')
        valuesArray = valuesArray.map(v=> v.trim())
        if(valuesArray.length == 0) throw new Error()
    } 
    catch(err){ console.error(`Incorrect format for "not_in:" `) }
    if(valuesArray && valuesArray.indexOf(value) != -1) throw new Error(message ||  messageGen('not_in', [fieldname, valuesString as string]))
}

const validateEndsWith = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let endValue
    try {
        endValue = rule.split('ends_with:')[1].trim()
    } 
    catch(err){ console.error(`Incorrect format for "ends_with:" `) }
    if(endValue && !value.endsWith(endValue)) throw new Error(message ||  messageGen('ends_with', [fieldname, endValue as string]))
}

const validateStartsWith = (fieldname: string, value: any, rule: string, message ?: string)=>{
    let startValue
    try {
        startValue = rule.split('starts_with:')[1].trim()
    } 
    catch(err){ console.error(`Incorrect format for "starts_with:" `) }
    if(startValue && !value.startsWith(startValue)) throw new Error(message ||  messageGen('starts_with', [fieldname, startValue as string]))
}









await validator([
    {"name": undefined, rules: ['required'], messages: {'required': 'enter the name'} },
])

// const res = await validator([
//     {"fieldname": "asd", rules: ['regex:^[a-zA-Z]*$']},
// ], false)


export default validator