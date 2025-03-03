// import { IAuthResponse } from '@modules/auth/interface/auth.interface';
// import { IUser, IUserKey } from '@modules/users/interfaces/user.interface';
// import { UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';
// import * as dotenv from 'dotenv';
// import { Model } from 'mongoose';
// import { appConfig } from './../../configuration/app.config';
// import { ExceptionHelper } from './ExceptionHelper';
// import { NestHelper } from './NestHelper';
// dotenv.config();
// export class AuthHelper {
//     private static instance: AuthHelper;
//     // constructor() {}

//     static getInstance(): AuthHelper {
//         AuthHelper.instance = AuthHelper.instance || new AuthHelper();
//         return AuthHelper.instance;
//     }

//     generateToken = (user: IUser, jwt: JwtService, company: string = null): IAuthResponse => {
//         delete user.password;

//         const accessToken = AuthHelper.getInstance().generateAccessToken(user, jwt, company);
//         const refreshToken = AuthHelper.getInstance().generateRefreshToken(user, jwt, company);
//         return {
//             auth: {
//                 accessToken: accessToken,
//                 refreshToken: refreshToken,
//             },
//             user: user,
//         };
//     };

//     generateAccessToken = (user: IUser, jwt: JwtService, company: string): string => {
//         return jwt.sign(
//             {
//                 email: user.email,
//                 userId: user._id,
//                 company: company,
//                 scopes: user?.scopes ? user.scopes : [],
//             },
//             { expiresIn: appConfig.jwtResetCodeExpire, secret: appConfig.jwtAccessToken }
//         );
//     };

//     generateRefreshToken = (user: IUser, jwt: JwtService, company: string): string => {
//         return jwt.sign(
//             {
//                 email: user.email,
//                 userId: user['id'],
//                 company: company,
//             },
//             { expiresIn: appConfig.jwtResetCodeExpire, secret: appConfig.jwtAccessToken }
//         );
//     };

//     async processRefreshToken(token: string, jwt: JwtService, userModel: Model<IUser, IUserKey>): Promise<any> {
//         try {
//             const jwtObject = await jwt.verify(token, { secret: appConfig.jwtAccessToken });
//             if (jwtObject) {
//                 const usr = await userModel.findOne({ email: jwtObject['email'] }).exec();
//                 const companyId = jwtObject['company'];
//                 if (!NestHelper.getInstance().isEmpty(companyId)) {
//                     usr[0]['companyId'] = companyId;
//                 }
//                 return usr[0];
//             } else {
//                 return null;
//             }
//         } catch (err) {
//             throw new UnauthorizedException('Invalid token');
//         }
//     }

//     checkPassword = async (email: string, password: string, userModel: Model<IUser, IUserKey>): Promise<IUser> => {
//         const usr = await userModel.findOne({ email }).exec();
//         if (!NestHelper.getInstance().isEmpty(usr[0]?.password)) {
//             if (usr[0] && (await bcrypt.compare(password, usr[0].password))) {
//                 return usr[0];
//             }
//         } else {
//             ExceptionHelper.getInstance().userDoesNotExist();
//         }
//         return null;
//     };
//     static isPasswordMatched = async (password: string, userPass: string): Promise<boolean> => {
//         const match = await bcrypt.compare(password, userPass);
//         if (!match) return false;
//         return true;
//     };

//     static hashPassword = async (password: string): Promise<string> => {
//         // const salt = await bcrypt.genSalt();
//         return await bcrypt.hash(password, 10);
//     };
// }
