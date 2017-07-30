import gravatarUrl from 'gravatar-url';

export default function (email) {
  return gravatarUrl(email, {size: 200});

  //return 'https://api.adorable.io/avatars/256/' + email + '.png';
}
