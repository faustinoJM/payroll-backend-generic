interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    avatar?: string;
    id?: string;
    is_admin?: boolean;
    company_id?: string;
    company_name?: string;

}

export { ICreateUserDTO };