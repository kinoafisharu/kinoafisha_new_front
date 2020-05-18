import service from '@/api/base.ts'
import { FilmModel } from "@/film-model"
import { BriefFilm } from "@/film-model"


export const getListOfFilms = async () => {
  let response = await service.get('https://new-new-api.herokuapp.com/films')
  console.log(response)
  return response.data
}

export const getFilmById = async (id: number) => {
  let response = await service.get<FilmModel[]>(
    'https://new-new-api.herokuapp.com/',
    { params: { id } }
  )
  console.log(response)
  return response.data[0]
}

export const getFilmsScheduleByСity = async (city: string) => {
  let response = await service.get<FilmModel[]>(
    'http://kinoinfo.ru/api/film', //todo schedule/?city=Казань
    { params: { city } }
  )
  let films = response.data.map(film=>{
    let thousand = Math.trunc(film.id / 1000) + 1 // какая тысяча. используется в URL.
    film.poster="http://posters.kinoafisha.ru/" + thousand + "/" + film.id + "-000.jpg" //TODO тут или "-001.jpg"
    return film
  })
  console.log(films)
  return films
}

