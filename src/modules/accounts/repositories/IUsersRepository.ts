import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../entities/User";

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
