import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IResquest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: IResquest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      console.log("teste 1");
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.log("teste 2");
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "fac03859db223ec7b1b54e6e99a4b546", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}
export { AuthenticateUserUseCase };
