import { Profile, ProfileRequest } from '../interfaces/authApi';
import { UserFieldType } from '../interfaces/authForms';

export const getUpdatedUserFields = (
  user: Profile,
  field: UserFieldType
): ProfileRequest => {
  const profile: ProfileRequest = {};

  if (user.email.trim() !== field.email.trim()) {
    profile.email = field.email.trim();
  }
  if (user.username.trim() !== field.name.trim()) {
    profile.username = field.name.trim();
  }
  if (user.phoneNumber.trim() !== field.phone.trim()) {
    profile.phoneNumber = field.phone.trim();
  }

  return profile;
};

export const shouldUserUpdate = (user: Profile, field: UserFieldType) => {
  return (
    user.email.trim() !== field.email.trim() ||
    user.username.trim() !== field.name.trim() ||
    user.phoneNumber.trim() !== field.phone.trim()
  );
};
