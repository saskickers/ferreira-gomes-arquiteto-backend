import { z } from "zod";

export const imovelDTO = z.object({
    endereco: z.string(),
    valor: z.number(),
    informacoes: z.string().array().optional(),
    especif: z.object({name: z.string(), value: z.string()}).array().optional(),
    tipo: z.string(),
    titulo: z.string()
})

export type ImovelDTO = typeof imovelDTO._output