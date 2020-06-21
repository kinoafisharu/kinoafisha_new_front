const DB_NAME = 'main'
const STORAGE_NAME = 'films'
const DB_VERSION = 1
let DB


export default {

// Получение текущей базы данных на стороне клиента
  async getDb () {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB)
      }
      if (!window.indexedDB) {
          alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION)
      request.onerror = e => {
        console.log('Error opening db', e)
        reject('Error')
      }
      request.onsuccess = e => {
        DB = e.target.result
        resolve(DB)
      }
      request.onupgradeneeded = e => {
        let db = e.target.result
        db.createObjectStore(STORAGE_NAME, { autoIncrement: true, keyPath: 'id' })
      }
    })
  },

// Удаление фильмов из бд
async deleteFilms(film) {
  const db = await this.getDb()
  return new Promise(resolve => {
    const trans = db.transaction([STORAGE_NAME], 'readwrite')
    trans.oncomplete = () => {
      resolve()
    }
    const store = trans.objectStore(STORAGE_NAME)
    store.delete(film.id)
  })
},
//Получение фильмов из бд по номеру страницы
async getFilms (page) {
  let db = await this.getDb()
  return new Promise(resolve => {
    let trans = db.transaction([STORAGE_NAME], 'readonly')
    trans.oncomplete = () => {
      resolve(films)
    }
    const store = trans.objectStore(STORAGE_NAME)
    let films = []
      var request = store.get(page);
      request.onerror = function() {
      };
      request.onsuccess = function() {
        if (request.result) {
          films = request.result.films
        } else {
          films = null
        }
      };

  })
},
// Сохранение обьекта фильмов привязанного к странице в бд
async saveFilms (films, id) {
  let db = await this.getDb()
  return new Promise(resolve => {
    let trans = db.transaction([STORAGE_NAME], 'readwrite')
    trans.oncomplete = () => {
      resolve()
    }
    let store = trans.objectStore(STORAGE_NAME)
    if (id) {
      let fms = {id: id, films: films}
      console.log(fms);
      store.put(fms)
    }


  })
}
}
