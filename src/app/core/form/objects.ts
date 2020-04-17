import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

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
}

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
}
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
}

export const $country =
    [
        {
            value: 'Afganistán',
            viewValue: 'Afganistán'
        },
        {
            value: 'Albania',
            viewValue: 'Albania',
        },
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
]
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