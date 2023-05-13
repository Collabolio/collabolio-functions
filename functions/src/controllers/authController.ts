import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createUserRecord = functions.auth
  .user()
  .onCreate(async (user, context) => {
    try {
      const userRef = await admin.firestore().collection('users').doc(user.uid);
      await userRef.set({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        providerData: user.providerData,
        createdAt: context.timestamp,
        updatedAt: context.timestamp,
        deletedAt: null,
        isAdmin: false,
        isBanned: false,
        isDeleted: false,
        lastLoginAt: null,
      });
      return console.log(`User ${user.uid} created successfully`);
    } catch (error) {
      return console.log(`Error creating user ${user.uid} : `, error);
    }
  });