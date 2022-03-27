import jwt from "jsonwebtoken";
export default class JWT {
  static encode(id: string, email: string, expiresIn: number): string {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET!, {
      expiresIn: expiresIn,
    });
    return token;
  }

  static decode(token: string): any {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken;
  }
}
