// класс-клиент для SWAPI
// инкапсуляция всего сетевого кода
class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  async getResourse(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = await res.json();
    return body;
  };


  async getAllPeople() {
    const res = await this.getResourse(`/people`);
    return res.results;
  };
  async getPerson(id) {
    return this.getResourse(`/people/${id}/`);
  };


  async getAllPlanets() {
    const res = await this.getResourse(`/planets`);
    return res.results;
  };
  async getPlanet(id) {
    return this.getResourse(`/planets/${id}/`);
  };


  async getAllStarships() {
    const res = await this.getResourse(`/starships`);
    return res.results;
  };
  async getStarship(id) {
    return this.getResourse(`/starships/${id}/`);
  };

};
