import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
