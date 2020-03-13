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

export const $res: FieldConfig = {
    label: '¿Estudiante de tiempo completo?',
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

export const $country  =
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
