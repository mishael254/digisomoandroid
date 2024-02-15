import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
  'digisomo.db',
  
);

const UserDataService = {
  saveUserData: (userData) => {
    return new Promise((resolve, reject) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        gender,
        age,
        occupation,
        category,
        latitude,
        longitude,
        location,
        project,
        group,
        language,
      } = userData;

      db.transaction(
        (tx) => {
           // Create 'members' table if it doesn't exist
           tx.executeSql(
            'CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, phone TEXT, gender TEXT, age TEXT, occupation TEXT, category TEXT, latitude TEXT, longitude TEXT, location TEXT, project TEXT, group TEXT, language TEXT)',
            []
          );
            //insert data into 'members'
          tx.executeSql(
            'INSERT INTO members (firstName, lastName, email, phone, gender, age, occupation, category, latitude, longitude, location, project, group, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, phone, gender, age, occupation, category, latitude, longitude, location, project, group, language],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                console.log('member data inserted successfully');
                resolve();
              } else {
                console.error('Failed to insert member data');
                reject('Failed to insert member data');
              }
            },
            (_, error) => {
              console.error('Error executing SQL statement:', error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error('Transaction error:', error);
          reject(error);
        },
        () => {
          // Additional success callback if needed
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
