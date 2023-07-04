import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      email: "user@test.com",
      password: "1234",
      driver_license: "AXB-123",
    };

    await createUserUseCase.execute(user);

    const userAuth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userAuth).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@mail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with a incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User Test Password Error",
        email: "passwordError@test.com",
        password: "1234",
        driver_license: "AXB-123",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
