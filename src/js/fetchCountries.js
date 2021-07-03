export default function fetchCountries(searchQuery) {
  const url = 'https://restcountries.eu/rest/v2/name/';
  return fetch(url + searchQuery)
    .then(response => {
      if (response.status === 200) return response.json();
      else return Promise.reject('REQUEST ERROR');
    })
    .catch(error => {
      throw new Error(error);
    });
}
