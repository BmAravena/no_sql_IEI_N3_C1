use("IEI_N3_C1");

db.createCollection("paises");

db.paises.insertMany([
    { nombre: "Afganistán", nacionalidad: "Afgana", iso_2: "AF" },
    { nombre: "Albania", nacionalidad: "Albanesa", iso_2: "AL" },
    { nombre: "Alemania", nacionalidad: "Alemana", iso_2: "DE" },
    { nombre: "Andorra", nacionalidad: "Andorrana", iso_2: "AD" },
    { nombre: "Arabia Saudita", nacionalidad: "Saudí", iso_2: "SA" },
    { nombre: "Argentina", nacionalidad: "Argentina", iso_2: "AR" },
    { nombre: "Australia", nacionalidad: "Australiana", iso_2: "AU" },
    { nombre: "Austria", nacionalidad: "Austríaca", iso_2: "AT" },
    { nombre: "Bélgica", nacionalidad: "Belga", iso_2: "BE" },
    { nombre: "Bolivia", nacionalidad: "Boliviana", iso_2: "BO" },
    { nombre: "Brasil", nacionalidad: "Brasileña", iso_2: "BR" },
    { nombre: "Canadá", nacionalidad: "Canadiense", iso_2: "CA" },
    { nombre: "Chile", nacionalidad: "Chilena", iso_2: "CL" },
    { nombre: "China", nacionalidad: "China", iso_2: "CN" },
    { nombre: "Colombia", nacionalidad: "Colombiana", iso_2: "CO" },
    { nombre: "Corea del Sur", nacionalidad: "Surcoreana", iso_2: "KR" },
    { nombre: "Costa Rica", nacionalidad: "Costarricense", iso_2: "CR" },
    { nombre: "Cuba", nacionalidad: "Cubana", iso_2: "CU" },
    { nombre: "Dinamarca", nacionalidad: "Danesa", iso_2: "DK" },
    { nombre: "Ecuador", nacionalidad: "Ecuatoriana", iso_2: "EC" },
    { nombre: "Egipto", nacionalidad: "Egipcia", iso_2: "EG" },
    { nombre: "El Salvador", nacionalidad: "Salvadoreña", iso_2: "SV" },
    { nombre: "España", nacionalidad: "Española", iso_2: "ES" },
    { nombre: "Estados Unidos", nacionalidad: "Estadounidense", iso_2: "US" },
    { nombre: "Filipinas", nacionalidad: "Filipina", iso_2: "PH" },
    { nombre: "Finlandia", nacionalidad: "Finlandesa", iso_2: "FI" },
    { nombre: "Francia", nacionalidad: "Francesa", iso_2: "FR" },
    { nombre: "Grecia", nacionalidad: "Griega", iso_2: "GR" },
    { nombre: "Guatemala", nacionalidad: "Guatemalteca", iso_2: "GT" },
    { nombre: "Honduras", nacionalidad: "Hondureña", iso_2: "HN" },
    { nombre: "India", nacionalidad: "India", iso_2: "IN" },
    { nombre: "Indonesia", nacionalidad: "Indonesia", iso_2: "ID" },
    { nombre: "Irlanda", nacionalidad: "Irlandesa", iso_2: "IE" },
    { nombre: "Italia", nacionalidad: "Italiana", iso_2: "IT" },
    { nombre: "Japón", nacionalidad: "Japonesa", iso_2: "JP" },
    { nombre: "México", nacionalidad: "Mexicana", iso_2: "MX" },
    { nombre: "Nicaragua", nacionalidad: "Nicaragüense", iso_2: "NI" },
    { nombre: "Noruega", nacionalidad: "Noruega", iso_2: "NO" },
    { nombre: "Nueva Zelanda", nacionalidad: "Neozelandesa", iso_2: "NZ" },
    { nombre: "Países Bajos", nacionalidad: "Neerlandesa", iso_2: "NL" },
    { nombre: "Panamá", nacionalidad: "Panameña", iso_2: "PA" },
    { nombre: "Paraguay", nacionalidad: "Paraguaya", iso_2: "PY" },
    { nombre: "Perú", nacionalidad: "Peruana", iso_2: "PE" },
    { nombre: "Polonia", nacionalidad: "Polaca", iso_2: "PL" },
    { nombre: "Portugal", nacionalidad: "Portuguesa", iso_2: "PT" },
    { nombre: "Reino Unido", nacionalidad: "Británica", iso_2: "GB" },
    { nombre: "República Dominicana", nacionalidad: "Dominicana", iso_2: "DO" },
    { nombre: "Rumania", nacionalidad: "Rumana", iso_2: "RO" },
    { nombre: "Rusia", nacionalidad: "Rusa", iso_2: "RU" },
    { nombre: "Sudáfrica", nacionalidad: "Sudafricana", iso_2: "ZA" },
    { nombre: "Suecia", nacionalidad: "Sueca", iso_2: "SE" },
    { nombre: "Suiza", nacionalidad: "Suiza", iso_2: "CH" },
    { nombre: "Turquía", nacionalidad: "Turca", iso_2: "TR" },
    { nombre: "Uruguay", nacionalidad: "Uruguaya", iso_2: "UY" },
    { nombre: "Venezuela", nacionalidad: "Venezolana", iso_2: "VE" }
]);

db.paises.createIndex(
    { iso_2: 1 },
    { unique: true, name: "uk_iso2" }
);

print("Países insertados correctamente.");