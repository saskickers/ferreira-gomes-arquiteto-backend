import { Imoveis } from "@prisma/client";
import { z } from "zod";

export const criarImovelDTO = z.object({

    condicao: z.string(),
    finalidade: z.string(),
    tipo: z.string(),
    bairro: z.string(),
    rua: z.string(),
    titulo: z.string(),
    areaConstruida: z.string().optional(),
    areaTotal: z.string().optional(),
    caracteristicas: z.string().optional(),
    descricao: z.string().optional(),
    infoAdicionais: z.string().optional(),
    quartos: z.preprocess(parseToNumber, z.number()).optional(),
    garagem: z.preprocess(parseToNumber, z.number()).optional(),
    salaEstar: z.preprocess(parseToNumber, z.number()).optional(),
    salaTv: z.preprocess(parseToNumber, z.number()).optional(),
    suite: z.preprocess(parseToNumber, z.number()).optional(),
    iptu: z.string().optional(),
    condominio: z.string().optional(),
    valor: z.preprocess(parseToNumber, z.number()).optional()

})

export const updateImovelDTO = z.object({

    id: z.number(),
    condicao: z.string().optional(),
    finalidade: z.string().optional(),
    tipo: z.string().optional(),
    bairro: z.string().optional(),
    rua: z.string().optional(),
    titulo: z.string().optional(),
    areaConstruida: z.string().optional(),
    areaTotal: z.string().optional(),
    caracteristicas: z.string().array().optional(),
    descricao: z.string().optional(),
    infoAdicionais: z.string().optional(),
    quartos: z.string().optional(),
    garagem: z.string().optional(),
    salaEstar: z.string().optional(),
    salaTv: z.string().optional(),
    suite: z.string().optional(),
    iptu: z.string().optional(),
    condominio: z.string().optional(),
    valor: z.string().optional()

})

export const getImovelDTO = z.object({
    condicao: z.string(),
    finalidade: z.string(),
    tipo: z.string(),
    bairro: z.string(),
    rua: z.string(),
    titulo: z.string(),
    areaConstruida: z.string().optional(),
    areaTotal: z.string().optional(),
    caracteristicas: z.string().array().optional(),
    descricao: z.string().optional(),
    infoAdicionais: z.string().optional(),
    quartos: z.number().optional(),
    garagem: z.number().optional(),
    salaEstar: z.number().optional(),
    salaTv: z.number().optional(),
    suite: z.number().optional(),
    iptu: z.string().optional(),
    condominio: z.string().optional(),
    valor: z.number().optional(),
    fotos: z.preprocess(stringToArray, z.string().array())
})

export const getAllImoveisDTO = getImovelDTO.array()



export type IcriarImovelDTO = typeof criarImovelDTO._output
export type IupdateImovelDTO = typeof updateImovelDTO._output
export type IgetImovelDTO = typeof getImovelDTO._output
export type IgetAllImoveisDTO = typeof getAllImoveisDTO._output


export function parseToNumber(item: unknown) {

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

