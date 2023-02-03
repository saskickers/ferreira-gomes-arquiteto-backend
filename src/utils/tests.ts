import { number, z } from "zod"

const schema = z.object({
    a: z.preprocess(parseToNumber, z.string())
})

function  parseToNumber(item: unknown) {

    const accepted = ['number', 'string']

    if (accepted.includes(typeof item)) { 
        return parseInt(item as string)
    }

    return item
}

console.log(schema.parse({a: '[2,3]'}))