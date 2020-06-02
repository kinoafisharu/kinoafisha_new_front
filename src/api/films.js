import service from '@/api/base.js'


const likeFilm = (id) => {

  service.post(`films/${id}/like/`, {
    evaluation: 5,
  })
}

export default likeFilm
