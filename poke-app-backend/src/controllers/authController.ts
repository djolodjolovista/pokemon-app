import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const demoUser: User = {
  id: 1,
  firstName: "test_ime",
  lastName: "test_prezime",
  email: "test@gmail.com",
  password: "test9876",
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const refreshTokens: string[] = [];

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email !== demoUser.email || password !== demoUser.password)
    return res.status(401).json({ message: "Invalid email or password" });

  const accessToken = jwt.sign({ id: demoUser.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: demoUser.id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "2d",
  });
  refreshTokens.push(refreshToken);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/api/auth/refresh",
    })
    .json({
      data: {
        accessToken,
        user: {
          firstName: demoUser.firstName,
          lastName: demoUser.lastName,
          email: demoUser.email,
        },
      },
    });
};

export const logout = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const index = refreshTokens.indexOf(token);
    if (index > -1) refreshTokens.splice(index, 1);
  }
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  res.json({ message: "Logged out" });
};

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });
  if (!refreshTokens.includes(token))
    return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as { id: number };
    const accessToken = jwt.sign({ id: payload.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    res.json({
      data: {
        accessToken,
        user: {
          firstName: demoUser.firstName,
          lastName: demoUser.lastName,
          email: demoUser.email,
        },
      },
    });
  } catch {
    return res.status(403).json({ message: "Refresh token expired" });
  }
};
