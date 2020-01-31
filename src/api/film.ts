import service from '@/api/base.ts'
import { FilmModel } from "@/film-model"

export const getFilmById = async (id: number) => {
  let response = await service.get<FilmModel[]>(
    '/film',
    { params: { id } }
  )
  console.log(response)
  return response.data[0]
}
