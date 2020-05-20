import service from "@/api/base.js"


export const getFilmById =  (id) => {
  service.get(
    'films/',
    { params: { id } }
  )
  .then(
    response => {
      return response.data
    }
  )
}
