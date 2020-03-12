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