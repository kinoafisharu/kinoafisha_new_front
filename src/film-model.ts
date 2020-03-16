export interface FilmModel {
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


