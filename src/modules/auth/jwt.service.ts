import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";

export class JwtService {
  static sign(payload: object, secret: string, options?: SignOptions): string {
    return jwt.sign(payload, secret, options);
  }

  static verify<T>(token: string, secret: string, options?: VerifyOptions): T {
    return jwt.verify(token, secret, options) as T;
  }

  static verifyRefreshToken(token: string): { email: string } {
    return this.verify<{ email: string }>(
      token,
      process.env.JWT_REFRESH_SECRET as string,
      {
        algorithms: ["HS512"],
      }
    );
  }
}
