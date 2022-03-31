import { sign, verify } from 'jsonwebtoken';

const APP_SECRET = 'GraphQL-is-aw3some';
const EXPIRAION_TIME = '20m';

export const generateToken = (userId: string) => {
  return sign({ userId }, process.env.APP_SECRET || APP_SECRET, {
    expiresIn: EXPIRAION_TIME,
  });
};

export const getUserId = (token: string) => {
  try {
    const { userId } = verify(token, process.env.APP_SECRET || APP_SECRET) as {
      userId: string;
    };
    return userId;
  } catch (e) {
    return null;
  }
};

/**
 * Verifies that the email is valid
 *
 * @param email The email to verify
 * @returns {Promise<Boolean>}
 */
export const isEmail = (email: string): Boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validate a password following the rules:
 * - Must be at least 10 characters long
 * - Must contain at least one lowercase letter
 * - Must contain at least one uppercase letter
 * - Must contain at least one of the following characters: !, @, #, ? or ]
 *
 * @param {string} password The password to validate
 * @returns {Promise<{ userId: string; token: string }>}
 */
export const isValidPassword = (password: string): Boolean => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$?]).{10,}$/;
  return re.test(password);
};
