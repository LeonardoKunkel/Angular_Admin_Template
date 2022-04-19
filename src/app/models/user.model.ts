import { environment } from "src/environments/environment";

const apiUrl = environment.baseUrl;

export class User {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

    get imgUrl() {
        if (this.img) {
            return `${ apiUrl }/upload/users/${ this.img }`;
        } else {
            return `${ apiUrl }/upload/users/no-image`;
        }
    }

}
