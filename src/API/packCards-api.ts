import { AxiosResponse } from 'axios';
import { InitialStateType } from 'reducers/packCards-reducer';
import { instance } from './instance';

export const packCardsAPI = {
  getCards(params: GetParamsRequestType) {
    return instance.get<GetParamsRequestType, AxiosResponse<InitialStateType>>('cards/card/', { params });
  },
  addCard(question: string, answer: string, cardsPackId: string) {
    return instance.post('cards/card/', { card: { question, answer, cardsPackId } });
  },
  deleteCard(id:string) {
    return instance.delete<AxiosResponse<ResponseDeleteType>>('cards/card', { params: { id } });
  },
  updateCard(_id:string, question:string) {
    return instance.put<AxiosResponse<UpdateResponseType>>('cards/card', { card: { _id, question } });
  },
  createGrade(grade:number, cardId:string) {
    return instance.put<ResponseGradeType>('cards/grade', { grade, cardId });
  },
};

// types
export type GetParamsRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type ResponseGradeType = {
     updatedGrade: {
         _id: string
         cardsPack_id: string
         card_id: string
         user_id: string
         grade: number
         shots:number
     }
}

export type ResponseDeleteType={
    id: string
}
export type UpdateResponseType={
    id:string
    question: string
    comments?: string
}
export type RequestGradeType={
    grade: number
    card_id: string
}
