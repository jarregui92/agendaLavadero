        // OBTENGO EL SELECT DEL MODAL PARA LUEGO AGREGARLE LAS OPCIONES
        let countrySelect = document.getElementById('countrySelect');

        // FUNCION ASINCRONA PARA REALIZAR EL FETCH Y LLENAR EL SELECT
        async function fetchData() {
            try {
                let response = await fetch('https://restcountries.com/v3.1/all');
                let data = await response.json();

                let sortedCountries = data
                    //SE FILTRA PARA QUE TENGAN LOS DATOS NECESARIOS PARA LISTARLOS Y NO TIRE ERROR EL FOREACH
                    .filter(country => country.idd && country.idd.root && country.idd.suffixes && country.idd
                        .suffixes.length > 0)
                    //ORDENO EL RESULTADO PARA UNA MEJOR LECTURA EN LA SELECCION
                    .sort((a, b) => {
                        let altSpellingsA = a.altSpellings && a.altSpellings.length > 0 ? a.altSpellings[0] :
                        '';
                        let altSpellingsB = b.altSpellings && b.altSpellings.length > 0 ? b.altSpellings[0] :
                        '';
                        return altSpellingsA.localeCompare(altSpellingsB);
                    });

                // ITERO SOBRE LA LISTA YA ORDENADA Y LOS AGREGO AL SELECT
                sortedCountries.forEach(country => {
                    let option = document.createElement('option');

                    let altSpellingsText = country.altSpellings && country.altSpellings.length > 0 ? country
                        .altSpellings[0] : '';

                    option.value = `${country.idd.root}${country.idd.suffixes[0]}`;
                    option.text = `${altSpellingsText} ${country.idd.root}${country.idd.suffixes[0]}`;

                    countrySelect.add(option);
                });

                // COMO SOY DE URURUGAY BUSCO EL QUE TENGA "UY" Y SI EXISTE LO PONGO COMO SELECCIONADO
                let selectedOption = [...countrySelect.options].find(option => option.text.includes("UY"));
                if (selectedOption) {
                    selectedOption.selected = true;
                }
            } catch (error) {
                console.error('Error al obtener datos de la API:', error);
            }
        }

        // CUANDO CARGA EJECUTO LA FUNCION DEL FETCH
        window.onload = fetchData;