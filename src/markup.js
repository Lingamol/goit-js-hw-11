export function markupCountrys(countrys) {
  return countrys

    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="list-item"> <img
                  class="flags__img"
                  srcset=""
                  src="${svg}"
                  alt="flags"
                   width="30" height="20"/>
                <p class="country-title">${official}</p>    
         
        </li>`;
    })
    .join('');
}

export function markupCountryInfo({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  const langList = Object.values(languages);
  return `<div class="country-info__thumb">
          <img
                  class="flags__img"
                  srcset=""
                  src="${svg}"
                  alt="flag"
                  width="40" height="30"
                /><p class="country-title-info">${official}</p></div>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${langList}</p>
        `;
}
