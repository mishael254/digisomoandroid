import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
  'digisomo.db',
  
);

const UserDataService = {
  //fetching projects lists from the api
  getProjects: () => {
    return fetch('https://tathmini.live/api/project/')
      .then((response) => response.json())
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        return Promise.reject(error);
      });
  },
  //saving user or member data gotten from the register form and auto creating a database
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
          /*
          //droping table if things get bad
          tx.executeSql('DROP TABLE IF EXISTS members', []);
          **/
          
          // Create 'members' table if it doesn't exist
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, phone TEXT, gender TEXT, age TEXT, occupation TEXT, category TEXT, latitude TEXT, longitude TEXT, location TEXT, project TEXT, [group] TEXT, language TEXT)',
            []
          );
          
            //insert data into 'members'
          tx.executeSql(
            'INSERT INTO members (firstName, lastName, email, phone, gender, age, occupation, category, latitude, longitude, location, project, [group], language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        // Extract latitude and longitude from userData
        const { latitude, longitude, ...postData } = userData;

        // Update group, language, and project with valid PK values
        postData.group = null; // Replace with the valid PK for the group
        postData.language = 1; // Replace with the valid PK for the language
        postData.project = 1; // Replace with the valid PK for the project

        // Add latitude and longitude to postData
        postData.latitude = latitude;
        postData.longitude = longitude;

        return fetch('https://tathmini.live/api/member/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
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
