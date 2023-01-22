
import { Imoveis } from "@prisma/client";
import { ImovelDTO } from "../schemas/imovel.dto";
import { Database } from "../utils/prismaInit";
import fs from 'fs'



export class criarImovel {

    async execute(imovelDTO: ImovelDTO) {

        
        const imovel : Imoveis = await Database.imoveis.create({
            data: {
                ...imovelDTO,
                especif: String(imovelDTO.especif ?? '[]'),
                informacoes: String(imovelDTO.informacoes ?? '[]'),
                createdAt: new Date().toISOString(),
                folder: 'Not yet created.'
            }
        })
        .catch(e => {
            return e
        })


        return imovel
    }
    
}