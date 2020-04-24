import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
// tslint:disable: quotemark

export const $sex: FieldConfig = {
    label: 'Sexo',
    options: [
        {
            value: 'Femenino',
            viewValue: 'Femenino'
        },
        {
            value: 'Masculino',
            viewValue: 'Masculino'
        }
    ]
};

export const $family: FieldConfig = {
    label: 'Parentezco',
    name: 'family',
    options: [
        {
            value: 'conyuge',
            viewValue: 'Cónyuge'
        },
        {
            value: 'hijo',
            viewValue: 'Hijo'
        },
        {
            value: 'padre',
            viewValue: 'Padre'
        },
        {
            value: 'madre',
            viewValue: 'Madre'
        },
        {
            value: 'hermano',
            viewValue: 'Hermano'
        },
        {
            value: 'hermana',
            viewValue: 'Hermana'
        },
    ]
};

export const $res: FieldConfig = {
    options: [
        {
            value: true,
            viewValue: 'Si'
        },
        {
            value: false,
            viewValue: 'No'
        }
    ]
};

export const $weightTypes = [
    {
        value: 'kilogramos',
        viewValue: "kg"
    },
    {
        value: 'libras',
        viewValue: "lb",
    },
];

export const $heightTypes = [
    {
        value: 'pies',
        viewValue: 'pies'
    },
    {
        value: 'centimetros',
        viewValue: "cm",
    },
];

export const $country =
    [
        {value: "Afganistán", viewValue: "Afganistán"},
{value: "Alandia", viewValue: "Alandia"},
{value: "Albania", viewValue: "Albania"},
{value: "Alemania", viewValue: "Alemania"},
{value: "Andorra", viewValue: "Andorra"},
{value: "Angola", viewValue: "Angola"},
{value: "Anguilla", viewValue: "Anguilla"},
{value: "Antigua y Barbuda", viewValue: "Antigua y Barbuda"},
{value: "Antártida", viewValue: "Antártida"},
{value: "Arabia Saudí", viewValue: "Arabia Saudí"},
 {value: "Argelia", viewValue: "Argelia"},
 {value: "Argentina", viewValue: "Argentina"},
 {value: "Armenia", viewValue: "Armenia"},
 {value: "Aruba", viewValue: "Aruba"},
 {value: "Australia", viewValue: "Australia"},
 {value: "Austria", viewValue: "Austria"},
 {value: "Azerbaiyán", viewValue: "Azerbaiyán"},
 {value: "Bahamas", viewValue: "Bahamas"},
 {value: "Bahrein", viewValue: "Bahrein"},
 {value: "Bangladesh", viewValue: "Bangladesh"},
 {value: "Barbados", viewValue: "Barbados"},
 {value: "Belice", viewValue: "Belice"},
 {value: "Benín", viewValue: "Benín"},
 {value: "Bermudas", viewValue: "Bermudas"},
 {value: "Bielorrusia", viewValue: "Bielorrusia"},
 {value: "Bolivia", viewValue: "Bolivia"},
 {value: "Bonaire, San Eustaquio y Saba", viewValue: "Bonaire, San Eustaquio y Saba"},
 {value: "Bosnia y Herzegovina", viewValue: "Bosnia y Herzegovina"},
 {value: "Botswana", viewValue: "Botswana"},
 {value: "Brasil", viewValue: "Brasil"},
 {value: "Brunei", viewValue: "Brunei"},
 {value: "Bulgaria", viewValue: "Bulgaria"},
 {value: "Burkina Faso", viewValue: "Burkina Faso"},
 {value: "Burundi", viewValue: "Burundi"},
 {value: "Bután", viewValue: "Bután"},
 {value: "Bélgica", viewValue: "Bélgica"},
 {value: "Cabo Verde", viewValue: "Cabo Verde"},
 {value: "Camboya", viewValue: "Camboya"},
 {value: "Camerún", viewValue: "Camerún"},
 {value: "Canadá", viewValue: "Canadá"},
 {value: "Catar", viewValue: "Catar"},
 {value: "Chad", viewValue: "Chad"},
 {value: "Chile", viewValue: "Chile"},
 {value: "China", viewValue: "China"},
 {value: "Chipre", viewValue: "Chipre"},
 {value: "Colombia", viewValue: "Colombia"},
 {value: "Comoras", viewValue: "Comoras"},
 {value: "Congo", viewValue: "Congo"},
 {value: "Congo (Rep. Dem.)", viewValue: "Congo (Rep. Dem.)"},
 {value: "Corea del Norte", viewValue: "Corea del Norte"},
 {value: "Corea del Sur", viewValue: "Corea del Sur"},
 {value: "Costa de Marfil", viewValue: "Costa de Marfil"},
 {value: "Costa Rica", viewValue: "Costa Rica"},
 {value: "Croacia", viewValue: "Croacia"},
 {value: "Cuba", viewValue: "Cuba"},
 {value: "Curazao", viewValue: "Curazao"},
 {value: "Dinamarca", viewValue: "Dinamarca"},
 {value: "Dominica", viewValue: "Dominica"},
 {value: "Ecuador", viewValue: "Ecuador"},
 {value: "Egipto", viewValue: "Egipto"},
 {value: "El Salvador", viewValue: "El Salvador"},
 {value: "Emiratos Árabes Unidos", viewValue: "Emiratos Árabes Unidos"},
 {value: "Eritrea", viewValue: "Eritrea"},
 {value: "Eslovenia", viewValue: "Eslovenia"},
 {value: "España", viewValue: "España"},
 {value: "Estados Unidos", viewValue: "Estados Unidos"},
 {value: "Estonia", viewValue: "Estonia"},
 {value: "Etiopía", viewValue: "Etiopía"},
 {value: "Filipinas", viewValue: "Filipinas"},
 {value: "Finlandia", viewValue: "Finlandia"},
 {value: "Fiyi", viewValue: "Fiyi"},
 {value: "Francia", viewValue: "Francia"},
 {value: "Gabón", viewValue: "Gabón"},
 {value: "Gambia", viewValue: "Gambia"},
 {value: "Georgia", viewValue: "Georgia"},
 {value: "Ghana", viewValue: "Ghana"},
 {value: "Gibraltar", viewValue: "Gibraltar"},
 {value: "Grecia", viewValue: "Grecia"},
 {value: "Grenada", viewValue: "Grenada"},
 {value: "Groenlandia", viewValue: "Groenlandia"},
 {value: "Guadalupe", viewValue: "Guadalupe"},
 {value: "Guam", viewValue: "Guam"},
 {value: "Guatemala", viewValue: "Guatemala"},
 {value: "Guayana Francesa", viewValue: "Guayana Francesa"},
 {value: "Guernsey", viewValue: "Guernsey"},
 {value: "Guinea", viewValue: "Guinea"},
 {value: "Guinea Ecuatorial", viewValue: "Guinea Ecuatorial"},
 {value: "Guinea-Bisáu", viewValue: "Guinea-Bisáu"},
 {value: "Guyana", viewValue: "Guyana"},
 {value: "Haiti", viewValue: "Haiti"},
 {value: "Honduras", viewValue: "Honduras"},
 {value: "Hong Kong", viewValue: "Hong Kong"},
 {value: "Hungría", viewValue: "Hungría"},
 {value: "India", viewValue: "India"},
 {value: "Indonesia", viewValue: "Indonesia"},
 {value: "Irak", viewValue: "Irak"},
 {value: "Iran", viewValue: "Iran"},
 {value: "Irlanda", viewValue: "Irlanda"},
 {value: "Isla Bouvet", viewValue: "Isla Bouvet"},
 {value: "Isla de Man", viewValue: "Isla de Man"},
 {value: "Isla de Navidad", viewValue: "Isla de Navidad"},
 {value: "Isla de Norfolk", viewValue: "Isla de Norfolk"},
 {value: "Islandia", viewValue: "Islandia"},
 {value: "Islas Caimán", viewValue: "Islas Caimán"},
 {value: "Islas Cocos o Islas Keeling", viewValue: "Islas Cocos o Islas Keeling"},
 {value: "Islas Cook", viewValue: "Islas Cook"},
 {value: "Islas Faroe", viewValue: "Islas Faroe"},
 {value: "Islas Georgias del Sur y Sandwich del Sur", viewValue: "Islas Georgias del Sur y Sandwich del Sur"},
 {value: "Islas Heard y McDonald", viewValue: "Islas Heard y McDonald"},
 {value: "Islas Malvinas", viewValue: "Islas Malvinas"},
 {value: "Islas Marianas del Norte", viewValue: "Islas Marianas del Norte"},
 {value: "Islas Marshall", viewValue: "Islas Marshall"},
 {value: "Islas Pitcairn", viewValue: "Islas Pitcairn"},
 {value: "Islas Salomón", viewValue: "Islas Salomón"},
 {value: "Islas Svalbard y Jan Mayen", viewValue: "Islas Svalbard y Jan Mayen"},
 {value: "Islas Tokelau", viewValue: "Islas Tokelau"},
 {value: "Islas Turks y Caicos", viewValue: "Islas Turks y Caicos"},
 {value: "Islas Ultramarinas Menores de Estados Unidos", viewValue: "Islas Ultramarinas Menores de Estados Unidos"},
 {value: "Islas Vírgenes de los Estados Unidos", viewValue: "Islas Vírgenes de los Estados Unidos"},
 {value: "Islas Vírgenes del Reino Unido", viewValue: "Islas Vírgenes del Reino Unido"},
 {value: "Israel", viewValue: "Israel"},
 {value: "Italia", viewValue: "Italia"},
 {value: "Jamaica", viewValue: "Jamaica"},
 {value: "Japón", viewValue: "Japón"},
 {value: "Jersey", viewValue: "Jersey"},
 {value: "Jordania", viewValue: "Jordania"},
 {value: "Kazajistán", viewValue: "Kazajistán"},
 {value: "Kenia", viewValue: "Kenia"},
 {value: "Kirguizistán", viewValue: "Kirguizistán"},
 {value: "Kiribati", viewValue: "Kiribati"},
 {value: "Kosovo", viewValue: "Kosovo"},
 {value: "Kuwait", viewValue: "Kuwait"},
 {value: "Laos", viewValue: "Laos"},
 {value: "Lesotho", viewValue: "Lesotho"},
 {value: "Letonia", viewValue: "Letonia"},
 {value: "Liberia", viewValue: "Liberia"},
 {value: "Libia", viewValue: "Libia"},
 {value: "Liechtenstein", viewValue: "Liechtenstein"},
 {value: "Lituania", viewValue: "Lituania"},
 {value: "Luxemburgo", viewValue: "Luxemburgo"},
 {value: "Líbano", viewValue: "Líbano"},
 {value: "Macao", viewValue: "Macao"},
 {value: "Macedonia", viewValue: "Macedonia"},
 {value: "Madagascar", viewValue: "Madagascar"},
 {value: "Malasia", viewValue: "Malasia"},
 {value: "Malawi", viewValue: "Malawi"},
 {value: "Maldivas", viewValue: "Maldivas"},
 {value: "Mali", viewValue: "Mali"},
 {value: "Malta", viewValue: "Malta"},
 {value: "Marruecos", viewValue: "Marruecos"},
 {value: "Martinica", viewValue: "Martinica"},
 {value: "Mauricio", viewValue: "Mauricio"},
 {value: "Mauritania", viewValue: "Mauritania"},
 {value: "Mayotte", viewValue: "Mayotte"},
 {value: "Micronesia", viewValue: "Micronesia"},
 {value: "Moldavia", viewValue: "Moldavia"},
 {value: "Mongolia", viewValue: "Mongolia"},
 {value: "Montenegro", viewValue: "Montenegro"},
 {value: "Montserrat", viewValue: "Montserrat"},
 {value: "Mozambique", viewValue: "Mozambique"},
 {value: "Myanmar", viewValue: "Myanmar"},
 {value: "México", viewValue: "México"},
 {value: "Mónaco", viewValue: "Mónaco"},
 {value: "Namibia", viewValue: "Namibia"},
 {value: "Nauru", viewValue: "Nauru"},
 {value: "Nepal", viewValue: "Nepal"},
 {value: "Nicaragua", viewValue: "Nicaragua"},
 {value: "Nigeria", viewValue: "Nigeria"},
 {value: "Niue", viewValue: "Niue"},
 {value: "Noruega", viewValue: "Noruega"},
 {value: "Nueva Caledonia", viewValue: "Nueva Caledonia"},
 {value: "Nueva Zelanda", viewValue: "Nueva Zelanda"},
 {value: "Níger", viewValue: "Níger"},
 {value: "Omán", viewValue: "Omán"},
 {value: "Pakistán", viewValue: "Pakistán"},
 {value: "Palau", viewValue: "Palau"},
 {value: "Palestina", viewValue: "Palestina"},
 {value: "Panamá", viewValue: "Panamá"},
 {value: "Papúa Nueva Guinea", viewValue: "Papúa Nueva Guinea"},
 {value: "Paraguay", viewValue: "Paraguay"},
 {value: "Países Bajos", viewValue: "Países Bajos"},
 {value: "Perú", viewValue: "Perú"},
 {value: "Polinesia Francesa", viewValue: "Polinesia Francesa"},
 {value: "Polonia", viewValue: "Polonia"},
 {value: "Portugal", viewValue: "Portugal"},
 {value: "Puerto Rico", viewValue: "Puerto Rico"},
 {value: "Reino Unido", viewValue: "Reino Unido"},
 {value: "República Centroafricana", viewValue: "República Centroafricana"},
 {value: "República Checa", viewValue: "República Checa"},
 {value: "República de Sudáfrica", viewValue: "República de Sudáfrica"},
 {value: "República Dominicana", viewValue: "República Dominicana"},
 {value: "República Eslovaca", viewValue: "República Eslovaca"},
 {value: "Reunión", viewValue: "Reunión"},
 {value: "Ruanda", viewValue: "Ruanda"},
 {value: "Rumania", viewValue: "Rumania"},
 {value: "Rusia", viewValue: "Rusia"},
 {value: "Sahara Occidental", viewValue: "Sahara Occidental"},
 {value: "Saint Martin", viewValue: "Saint Martin"},
 {value: "Samoa", viewValue: "Samoa"},
 {value: "Samoa Americana", viewValue: "Samoa Americana"},
 {value: "San Bartolomé", viewValue: "San Bartolomé"},
  {value: "San Cristóbal y Nieves", viewValue: "San Cristóbal y Nieves"},
  {value: "San Marino", viewValue: "San Marino"},
  {value: "San Martín (Países Bajos)", viewValue: "San Martín (Países Bajos)"},
  {value: "San Pedro y Miquelón", viewValue: "San Pedro y Miquelón"},
  {value: "San Vicente y Granadinas", viewValue: "San Vicente y Granadinas"},
  {value: "Santa Helena", viewValue: "Santa Helena"},
  {value: "Santa Lucía", viewValue: "Santa Lucía"},
  {value: "Santa Sede", viewValue: "Santa Sede"},
  {value: "Santo Tomé y Príncipe", viewValue: "Santo Tomé y Príncipe"},
  {value: "Senegal", viewValue: "Senegal"},
  {value: "Serbia", viewValue: "Serbia"},
  {value: "Seychelles", viewValue: "Seychelles"},
  {value: "Sierra Leone", viewValue: "Sierra Leone"},
  {value: "Singapur", viewValue: "Singapur"},
  {value: "Siria", viewValue: "Siria"},
  {value: "Somalia", viewValue: "Somalia"},
  {value: "Sri Lanka", viewValue: "Sri Lanka"},
  {value: "Suazilandia", viewValue: "Suazilandia"},
  {value: "Sudán", viewValue: "Sudán"},
  {value: "Sudán del Sur", viewValue: "Sudán del Sur"},
  {value: "Suecia", viewValue: "Suecia"},
  {value: "Suiza", viewValue: "Suiza"},
  {value: "Surinam", viewValue: "Surinam"},
  {value: "Tailandia", viewValue: "Tailandia"},
  {value: "Taiwán", viewValue: "Taiwán"},
  {value: "Tanzania", viewValue: "Tanzania"},
  {value: "Tayikistán", viewValue: "Tayikistán"},
  {value: "Territorio Británico del Océano Índico", viewValue: "Territorio Británico del Océano Índico"},
  {value: "Tierras Australes y Antárticas Francesas", viewValue: "Tierras Australes y Antárticas Francesas"},
  {value: "Timor Oriental", viewValue: "Timor Oriental"},
  {value: "Togo", viewValue: "Togo"},
  {value: "Tonga", viewValue: "Tonga"},
  {value: "Trinidad y Tobago", viewValue: "Trinidad y Tobago"},
  {value: "Turkmenistán", viewValue: "Turkmenistán"},
  {value: "Turquía", viewValue: "Turquía"},
  {value: "Tuvalu", viewValue: "Tuvalu"},
  {value: "Túnez", viewValue: "Túnez"},
  {value: "Ucrania", viewValue: "Ucrania"},
  {value: "Uganda", viewValue: "Uganda"},
  {value: "Uruguay", viewValue: "Uruguay"},
  {value: "Uzbekistán", viewValue: "Uzbekistán"},
  {value: "Vanuatu", viewValue: "Vanuatu"},
  {value: "Venezuela", viewValue: "Venezuela"},
  {value: "Vietnam", viewValue: "Vietnam"},
  {value: "Wallis y Futuna", viewValue: "Wallis y Futuna"},
  {value: "Yemen", viewValue: "Yemen"},
  {value: "Yibuti", viewValue: "Yibuti"},
  {value: "Zambia", viewValue: "Zambia"},
  {value: "Zimbabue", viewValue: "Zimbabue"}
    ]
export const $time = [
    {
        value: 'Mes',
        viewValue: 'Mes'
    },
    {
        value: 'Día',
        viewValue: 'Día',
    },
    {
        value: 'año',
        viewValue: 'Año',
    }
];

export const $allFamily = {
    label: 'Parentezco',
    name: 'family',
    options: [
        {
            value: 'Padre',
            viewValue: 'Padre'
        },
        {
            value: 'Madre',
            viewValue: 'Madre',
        },
        {
            value: 'Hermanos',
            viewValue: 'Hermanos/as',
        },
        {
            value: 'Hijos',
            viewValue: 'Hijos/as',
        }
    ]
}
