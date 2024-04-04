// Error

export const LOGIN_CREDENTIALS_INVALID = 'email or password is not correct';

export const INTERNAL_SERVER_ERROR = 'Internal server error';

export const OLD_PASSWORD_INVALID = 'old password is not correct';

export const ACCOUNT_TYPE_ALREADY_SET = 'your account type is set already set';

export const USER_WITH_EMAIL_NOT_EXIST =
  'a user with this email does not exist';

export const USER_WITH_EMAIL_EXIST = 'a user with this email already exists';

export const USER_WITH_USERNAME_EXIST =
  'a user with this username already exists';

export const WAITLIST_EMAIL_EXIST = 'you are on the waitlist already';
export const MENTOR_EMAIL_EXIST = 'you have made a request already';

export const PASSWORD_RESET_LINK_EXPIRED = 'password reset link has expired';

export const EMAIL_VERIFICATION_LINK_EXPIRED =
  'email verification link has expired';

export const EMAIL_ALREADY_VERIFIED = 'your email has already been verified';

export const RECORD_NOT_FOUND = (recordName: string) =>
  `${recordName} does not exists`;

// Success

export const REGISTRATION_SUCCESS = 'account created successfully';
export const WAITLIST_REGISTRATION_SUCCESS =
  'you have successfully joined the waitlist';
export const MENTOR_REQUEST_SUCCESS =
  'you have successfully submitted request to become a mentor';

export const ACCOUNT_TYPE_SET = 'account type updated successfully';

export const LOGIN_SUCCESS = 'login successful';

export const EMAIL_VERIFIED = 'email successfully verified';

export const EMAIL_VERIFICATION_SENT = (email: string) =>
  `verification email sent to ${email.replace(
    /(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm,
    '*',
  )}, please check your email`;

export const PASSWORD_RESET_SUCCESS = 'password reset successfully';

export const CHECK_MAIL = 'check your email';

export const DATA_RETRIEVED = (record: string) => `${record} retrieved`;

export const DATA_UPDATED = (record: string) => `${record} updated`;

export const DATA_CREATED = (record: string) => `${record} created`;

export const DATA_DELETED = (record: string) => `${record} deleted`;
