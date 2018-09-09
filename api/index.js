import fetch from "isomorphic-fetch";

export function fetchCountries() {
    return fetch("http://localhost:4000/countries")
      .then(res => res.json())
      .then(res => { 
        console.info('Result : ', res)
        return res
      });
}
