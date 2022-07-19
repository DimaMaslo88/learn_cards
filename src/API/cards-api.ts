import {instance} from "./instance";


export const cardsApi = {
    getPacks(params: PacksParamsType) {
        return instance.get<ResponsePackType>("/cards/pack", {params})
    },
    packCreate(name: string) {
        return instance.post<ResponsePackType>('cards/pack', {cardsPack: {name}})
    },
    deletePack(id: string) {
        return instance.delete<ResponsePackType>("cards/pack", {params:{id}})
    },
    updatePack(_id:string,name:string){
        return instance.put<ResponsePackType>("cards/pack",{cardsPack:{_id,name}})
    }
}

export type CreatePackParams = {
    cardsPack: {
        name: string
        deckCover?: string
        private: boolean
    }
}


export type PacksParamsType = {
    packName?: string// не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks: string// не обязательно
    page: number // не обязательно
    pageCount: number // не обязательно


    user_id: string
}
export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string


}
export type ResponsePackType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number
}