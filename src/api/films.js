import service from '@/api/base.js'


const likeFilm = (id) => {

  service.post(`kinoinfo/films/${id}/like/`, {
    evaluation: 5,
  })
}

export default likeFilm
