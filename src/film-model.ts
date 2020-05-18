export interface FilmModelOldApi {
  comment: string;
  description: string;
  site: string;
  imdb_id: number;
  persons: any[];
  year: number;
  id: number;
  ratings: Rating[];
  genres: Genre[];
  name: string;
  limits: string;
  countries: Country[];
  datelastupd: string;
  release: string;
  runtime: number;
  original: string;
  poster : string;
}

export interface FilmList {
  BriefFilm[];
}

export interface BriefFilm {
  id: number;
  year: number;
  imdb_id: number;
  kid: number;
}

export interface FilmModel {
  id: number;
  year: number;
  note: string; // to change in api
  type: string // to change in api
  runtime: number;
  rated: number;
  budget_id: number; // to change in api
  imdb_id: number;
  imdb_rate: number;
  imdb_votes: number;
  kid: number;
  generated: number;
  generated_dtime: string; // to change in api
}

export interface Rating {
  source: string;
  rate: string;
  votes: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
}


