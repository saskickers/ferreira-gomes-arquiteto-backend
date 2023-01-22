import { z } from "zod";

export const imovelDTO = z.object({
    endereco: z.string(),
    valor: z.number(),
    informacoes: z.string().array().optional(),
    especif: z.object({name: z.string(), value: z.string()}).array().optional(),
    tipo: z.string(),
    titulo: z.string()
})

export const updateImovelDTO = z.object({
    id: z.number(),
    endereco: z.string().optional(),
    valor: z.number().optional(),
    informacoes: z.string().array().optional(),
    especif: z.object({name: z.string(), value: z.string()}).array().optional(),
    tipo: z.string().optional(),
    titulo: z.string().optional()
})

export type ImovelDTO = typeof imovelDTO._output
export type IupdateImovelDTO = typeof updateImovelDTO._output