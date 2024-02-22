import React from 'react';
import NetInfo from "@react-native-community/netinfo";
import UserDataService from '../services/UserDataService';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Register extends React.Component {
  state = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    gender:null,
    age:null,
    occupation:'',
    //this fields should be filled or detected automatically
    category:null,
    latitude:'',
    longitude:'',
    project:null,
    group:null,
    language:null,
  }
  handleInputChange = (key,value)=> {
    if (key === 'latitude' || key === 'longitude') {
      // Handle latitude and longitude separately if needed
      this.setState({ [key]: value });
    } else {
      this.setState({ [key]: value, location: `${this.state.longitude} ${this.state.latitude}` });
    }
  }
  handleRegister = () => {
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      gender: this.state.gender,
      age: this.state.age,
      occupation: this.state.occupation,
      category: this.state.category,
      latitude: this.state.latitude, // Make sure to include latitude
      longitude: this.state.longitude, // Make sure to include longitude
      location: `${this.state.longitude} ${this.state.latitude}`, // Concatenate latitude and longitude
      project: this.state.project,
      group: this.state.group,
      language: this.state.language,
      
    };
  
    // Save user data locally
    UserDataService.saveUserData(userData)
      .then(() => {
        // Successfully saved to SQLite

        // Check for network connection
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            // Network is available, perform post to API
            return UserDataService.postUserData(userData)
              .then(() => {
                // Successfully posted to API
                // Do any additional actions or navigation here
                console.log('User data saved and posted successfully');
                this.props.navigation.navigate('Home');
              })
              .catch((error) => {
                // Handle errors during API post
                console.error('Error during API post:', error);
              });
          } else {
            // No internet connection, post will be attempted later
            console.log('No internet connection');
            // Navigate to Home screen even if post to API is not performed
            this.props.navigation.navigate('Home');
          }
        });
      })
      .catch((error) => {
        // Handle errors during local data storage
        console.error('Error during local data storage:', error);
      });
  };

  
  render() {
    return (
      <DismissKeyboard>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
      
        
        <Block flex middle>
          
        <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
            resizeMode="cover"
          >
            
            <Block flex middle >
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.5} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Register
                      </Text>
                    </Block>

                    <Block flex={0.9} row middle space="between" style={{ marginBottom: 15 }}>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="twitter"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.TWITTER}
                        style={[styles.social, styles.shadow]}
                      />

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="dribbble"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.DRIBBBLE}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.FACEBOOK}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block>
                  </Block>
                  <Block flex={0} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      or be classical
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="First Name"
                              style={styles.inputs}
                              value={this.state.firstName}
                              onChangeText={(text) => this.handleInputChange('firstName', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Last Name"
                              style={styles.inputs}
                              value={this.state.lastName}
                              onChangeText={(text) => this.handleInputChange('lastName', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Email"
                              style={styles.inputs}
                              value={this.state.email}
                              onChangeText={(text) => this.handleInputChange('email', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Phone"
                              style={styles.inputs}
                              value={this.state.phone}
                              onChangeText={(text) => this.handleInputChange('phone', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="phone"
                                  family="IconNowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.inputContainer}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Select gender...',
                                value:null,
                              }}
                              onValueChange={(value) => this.handleInputChange('gender', value)}
                                items={[
                                    { label: 'Male', value: 'Male' },
                                    { label: 'Female', value: 'Female' },
                                    // ... (add more options based on your API response)
                                  ]}
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.inputContainer}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Select Age...',
                                value:null,
                              }}
                              onValueChange={(value) => this.handleInputChange('age', value)}
                                items={[
                                    { label: '12-below', value: '12-below' },
                                    { label: '13-17', value: '13-17' },
                                    { label: '18-22', value: '18-22' },
                                    { label: '23-27', value: '23-27' },
                                    { label: '28-32', value: '28-32' },
                                    { label: '33-37', value: '33-37' },
                                    { label: '38-42', value: '38-42' },
                                    { label: '43-47', value: '43-47' },
                                    { label: '48-52', value: '48-52' },
                                    { label: '53-57', value: '53-57' },
                                    { label: '58-above', value: '58-above' },
                                    // ... (add more options based on your API response)
                                  ]}
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Occupation"
                              style={styles.inputs}
                              value={this.state.occupation}
                              onChangeText={(text) => this.handleInputChange('occupation', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="filter"
                                  family="IconNowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.inputContainer}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Select Category...',
                                value: null,
                              }}
                              onValueChange={(value) => this.handleInputChange('category', value)}
                              items={[
                                { label: 'Member', value: 'Member' },
                                { label: 'Leader', value: 'Leader' },
                                // ... (add more options based on your API response)
                              ]}
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Latitude"
                              style={styles.inputs}
                              value={this.state.latitude}
                              onChangeText={(text) => this.handleInputChange('latitude', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="edit"
                                  family="IconNowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Longitude"
                              style={styles.inputs}
                              value={this.state.longitude}
                              onChangeText={(text) => this.handleInputChange('longitude', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="edit"
                                  family="IconNowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.inputContainer}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Select Project...',
                                value: null,
                              }}
                              onValueChange={(value) => this.handleInputChange('project', value)}
                              items={[
                                { label: 'Ukulima True, Subukia', value: 'Ukulima True, Subukia' },
                                { label: 'Piga Nduru, Nairobi', value: 'Piga Nduru, Nairobi' },
                                // ... (add more options based on your API response)
                              ]}
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.inputContainer}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Select Group...',
                                value: null,
                              }}
                              onValueChange={(value) => this.handleInputChange('group', value)}
                              items={[
                                { label: '1', value: '1' },
                                { label: '2', value: '2' },
                                // ... (add more options based on your API response)
                              ]}
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.inputContainer}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Select Language...',
                                value: null,
                              }}
                              onValueChange={(value) => this.handleInputChange('language', value)}
                              items={[
                                { label: 'Kikuyu', value: 'Kikuyu' },
                                { label: 'Kiswahili', value: 'Kiswahili' },
                                { label: 'Kalenjin', value: 'Kalenjin' },
                                // ... (add more options based on your API response)
                              ]}
                            />
                          </Block>
                          <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                            row
                            width={width * 0.75}
                          >
                            <Checkbox
                              checkboxStyle={{
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              }}
                              color={nowTheme.COLORS.PRIMARY}
                              labelStyle={{
                                color: nowTheme.COLORS.HEADER,
                                fontFamily: 'montserrat-regular'
                              }}
                              label="I agree to the terms and conditions."
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                              onPress={this.handleRegister}
                            >
                              Get Started
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
            </ImageBackground>
        </Block>
      </ScrollView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    
  },
  scrollViewContent: {
    flexGrow: 1, // Allow content to expand within the ScrollView
    minHeight: height,
    padding: theme.SIZES.BASE,
  },
  imageBackgroundContainer: {
    flex:1,
    width:width,
    height: null,
    padding: 1,
    zIndex: 1
  },
  imageBackground: {
    flex:1

  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    //height: height < 1000 ? height * 1.0 : height * 1.0,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
    flexGrow:1
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    marginBottom: 5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 20
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default Register;