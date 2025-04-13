import Cookies from 'cookies';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { CustomRequest } from '../types';
import type { NextFunction, Response } from 'express';
import ErrorResponse from '../helper/errorResponse';

export const verifyUser = (req: CustomRequest, res: Response, next: NextFunction) => {
   const publicKey = process.env.CLERK_PEM_PUBLIC_KEY!;
   console.log(publicKey);

   // Retrieve session token from either `__session` cookie for a same-origin request
   // or from the `Authorization` header for cross-origin requests
   const tokenCrossOrigin = req.headers.authorization?.split(' ')[1];

   if (!tokenCrossOrigin) return next(new ErrorResponse('Token not provided', 404));

   try {
      let decoded;

      const permittedOrigins = ['http://localhost:3000', 'https://example.com'];

      decoded = jwt.verify(tokenCrossOrigin, publicKey, { algorithms: ['RS256'] });

      // Validate the token's expiration (exp) and not before (nbf) claims
      const currentTime = Math.floor(Date.now() / 1000);
      // if (decoded.exp < currentTime || decoded.nbf > currentTime) {
      //   throw new Error("Token is expired or not yet valid");
      // }

      // // Validate the token's authorized party (azp) claim
      // if (decoded.azp && !permittedOrigins.includes(decoded.azp)) {
      //   throw new Error("Invalid 'azp' claim");
      // }
      console.log(decoded);

      res.status(200).json({ sessionToken: decoded });
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(`Internal server error`, 500));
   }
};
