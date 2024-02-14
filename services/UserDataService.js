// services/UserDataService.js


import NetInfo from '@react-native-community/netinfo';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase({
  name: 'digisomo.db',
  location: 'default',
  createFromLocation: '~digisomo.db',
});

const UserDataService = {
  saveUserData: (userData) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO users (firstName, lastName, email,phone, gender, age, occupation) VALUES (?, ?, ?, ?, ?, ?)',
            [
              userData.firstName,
              userData.lastName,
              userData.email,
              userData.phone,
              userData.gender,
              userData.age,
              userData.occupation,
            ],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log('User data inserted successfully');
                resolve();
              } else {
                console.error('Failed to insert user data');
                reject('Failed to insert user data');
              }
            },
            (error) => {
              console.error('Error executing SQL statement:', error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error('Transaction error:', error);
          reject(error);
        }
      );
    });
  },

  postUserData: (userData) => {
    return NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        return fetch('https://tathmini.live/api/member/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('POST success:', data);
            return Promise.resolve(data);
          })
          .catch((error) => {
            console.error('POST error:', error);
            return Promise.reject(error);
          });
      } else {
        console.log('No internet connection');
        return Promise.reject('No internet connection');
      }
    });
  },
};

export default UserDataService;
