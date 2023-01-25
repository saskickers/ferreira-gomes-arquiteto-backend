
import { Imoveis, Prisma } from "@prisma/client";
import { ImovelDTO } from "../schemas/imovel.dto";
import { Database } from "../utils/prismaInit";
import multer from 'multer'
import fs from 'fs'



export class criarImovel {

    async execute(imovelDTO: ImovelDTO, fotos: string[]) {

        console.log(imovelDTO)
        
        const imovel = await Database.imoveis.create({
            data: {
                ...imovelDTO,
                valor: typeof imovelDTO.valor == 'string'? parseInt(imovelDTO.valor) : imovelDTO.valor,
                especif: String(imovelDTO.especif ?? '[]'),
                informacoes: String(imovelDTO.informacoes ?? '[]'),
                createdAt: new Date().toISOString(),
                fotos: String(fotos)
            }
        }).catch(e => {
            return e as Prisma.RejectPerOperation
        }).then( imovel => {
            console.log(imovel)
            return imovel
        })



        return imovel
    }
    
}

