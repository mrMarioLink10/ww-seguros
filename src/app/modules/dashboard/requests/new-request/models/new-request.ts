export interface Associated {
    name: string;
    lastName: string;
    weight: string;
    height: string;
    sex: string;
    id: string;
    company: string;
    position: string;
    direction: string;
    city: string;
    dependentsNumber: number;
    dependents: Array<Dependent>;
}

export interface Dependent {
    name: string;
    lastName: string;
    family: string;
    weight: string;
    height: string;
    sex: string;
    birtday: string;
    student: boolean;
    telUnivercity: string;
}