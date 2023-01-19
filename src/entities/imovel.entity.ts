
export class Imovel {
    
    endereço: string;
    valor: number;
    especif?: { name: string; value: string; }[];
    informacoes?: string[];
    id: number;
    tipo: string;
    titulo: string;


    constructor (titulo: string, tipo: 'venda' | 'aluguel', endereço: string, valor: number, id: number, especif?: {name: string, value: string}[], informacoes?: string[]) {
        this.id = id
        this.endereço = endereço,
        this.valor = valor,
        this.especif = especif,
        this.informacoes = informacoes,
        this.tipo = tipo,
        this.titulo = titulo
    }

    getAll() {
        return this.valor
    }
}