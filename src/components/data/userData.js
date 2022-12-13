import firebase from '../firebase/db';
import User from '../model/user';
const firestore = firebase.firestore();

export const getUsers = async () => {
  try {
    const response = await firestore.collection('users');
    const data = await response.get();
    let array = [];
    data.forEach((doc) => {
      const user = new User(
        doc.id,
        doc.data().firstname,
        doc.data().lastname,
        doc.data().country,
        doc.data().datetime,
        doc.data().time
      );

      array.push(user);
    });
    return array;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    await firestore.collection('users').doc().set(user);
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const user = await firestore.collection('users').doc(id);
    const data = await user.get();
    return data.data();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const user = await firestore.collection('users').doc(id);
    await user.update(data);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (firstname) => {
  try {
    await firestore.collection('users').doc(firstname).delete();
  } catch (error) {
    throw error;
  }
};
