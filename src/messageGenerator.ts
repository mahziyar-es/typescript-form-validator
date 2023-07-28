import english from './lang/english'
import persian from './lang/persian'

const messageGenerator = (field: string, params: string[], lang: "english" | "persian" = "english")=>{

    let langFile : {[index:string]:string}
    if(lang == 'english') langFile = english
    else if(lang == 'persian') langFile = persian
    else {
        console.error('typescript form validator message language undefined')
        return
    }

    const rawMessage = langFile![field]

    if(!rawMessage){
        console.error('message field not found')
        return
    }

    let m = rawMessage

    params.map(p=>{
        m = m.replace(':p', p)
    })

    return m;
}


export default messageGenerator