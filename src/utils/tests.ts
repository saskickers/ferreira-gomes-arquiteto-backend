import { number, z } from "zod"

const schema = z.object({
    a: z.preprocess(stringToArray, z.string().array())
})

function  parseToNumber(item: unknown) {

    const accepted = ['number', 'string']

    if (accepted.includes(typeof item)) { 
        return parseInt(item as string)
    }

    return item
}

function stringToArray(item: unknown) {
    
    if (typeof item == 'string') {
        return item.split(',')
    }
    return item
}


console.log(schema.parse({a: 'asd,dasda,asdas2'}))