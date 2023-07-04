import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";

interface IUsersRepository {
  create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void>;

  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;
}

export { IUsersRepository };
