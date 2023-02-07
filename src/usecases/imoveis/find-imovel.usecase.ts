import { getAllImoveisDTO, IgetAllImoveisDTO } from "../../schemas/imovel.dto";
import { Database } from "../../utils/prismaInit";


export class findImovel {

    async findAll() : Promise<IgetAllImoveisDTO | Error> {
        try {
            const imoveis = await Database.imoveis.findMany()
            const parsedImoveis = getAllImoveisDTO.parse(imoveis)
            return parsedImoveis
        }
        catch (e: any) {
            throw e
        }
    }
}