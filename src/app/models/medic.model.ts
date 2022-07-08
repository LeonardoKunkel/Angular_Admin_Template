import { Hospital } from "./hospital.model";

interface _MedicUser {
    _id: string;
    name: string;
    img: string;
}

export class Medic {

    constructor(
        public name: string,
        public lastname?: string,
        public _id?: string,
        public img?: string,
        public user?: _MedicUser,
        public hospital?: Hospital
    ) {}

}

export interface MedicInterface {

    ok: boolean;
    msg: string;
    allMedics: Medics[]

}

export interface MedicByIdInterface {

    ok: boolean;
    msg: string;
    medic: Medic

}

export interface Medics {

    _id: string;
    name: string;
    lastname: string;
    user: _MedicUser;
    hospital: Hospital;

}
