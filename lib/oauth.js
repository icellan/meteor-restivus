import { Meteor } from 'meteor/meteor';
import { OAuthMeteorModel } from 'meteor/leaonline:oauth2-server/lib/model/model';

export const loginWithBearerToken = async (token) => {
  const model = new OAuthMeteorModel();

  //OAuth2Server.
  const accessToken = await model.getAccessToken(token)
  if (!accessToken) {
    throw new Meteor.Error(401, 'Unauthorized');
  }

  const expiresAt = new Date(accessToken.accessTokenExpiresAt);
  if (expiresAt < new Date()) {
    throw new Meteor.Error(401, 'Unauthorized 2');
  }

  const userId = accessToken.user?.id;
  const user = Meteor.users.findOne(userId);
  if (!user) {
    throw new Meteor.Error(401, 'Unauthorized 3');
  }

  if (user.oauth?.authorizedClients) {
    if (!user.oauth?.authorizedClients.includes(accessToken.client.id)) {
      throw new Meteor.Error(401, 'Unauthorized 4');
    }
  }

  return user;
}
