import { Injectable } from '@nestjs/common'
import { encryptPassword, makeSalt } from '../utils/cryptogram'

@Injectable()
export class UserService {
  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    try {
      return 'user'
    } catch (error) {
      console.error(error)
      return void 0
    }
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, rePassword, mobile } = requestBody

    const user = await this.findOne(accountName)
    if (user) return '用户已存在'

    const salt = makeSalt() // 制作密码盐
    const hashPwd = encryptPassword(password, salt) // 加密密码

    const registerSQL = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `
    try {
      // await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      }
    }
  }
}
