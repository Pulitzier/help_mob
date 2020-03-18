import React from "react";
import {
  Text,
  View,
  Platform,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from "react-native";
import PhoneInput from 'react-native-phone-input';
import users from '../constants/mock-users';

const { width, height } = Dimensions.get('window');

const isAndroid = () => (Platform.OS === 'ios');

const saveUserSession = async (user) => {
  try {
    if (user) AsyncStorage.setItem('@user', JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
};

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {
        phone: '',
        password: '',
        documentId: '',
      }
    };
  }

  sendRequest = async (phone) => users.filter(item => item.phone === phone);

  handleLoginSend = async () => {
    const phone = this.phone.getValue();
    if (phone.length === 13 && phone[0] === '+') {
      this.setState({ isLoading: true });
      const user = await this.sendRequest(phone);
      if (user) {
        await this.setState({ isLoading: false, user });
        await saveUserSession(user);
        await this.props.navigation.navigate('Main');
      } else {
        await this.setState({ isLoading: false });
        Alert.alert(
          'Ошибка!',
          'Такой номер телефона не существует',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false },
        );
      }
    } else {
      Alert.alert(
        'Неверный номер',
        'Проверьте, пожалуйста, номер телефона',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      );
    }
  };

  renderButton = () => (
    <TouchableOpacity
      style={styles.loginButtonStyle}
      onPress={() => this.handleLoginSend()}
    >
      <Text style={styles.loginButtonTextStyle}>LOGIN</Text>
    </TouchableOpacity>
  );

  handleTypeText = (text, type = 'phone') => {
    this.setState((prev, next) => ({
      user: Object.assign(prev.user, { [type]: text }),
    }));
  };

  renderInput = (props) => {
    const {
      type,
      placeholder,
      styles: {
        textContainer,
        titleStyle,
        placeholderColor,
        selectionColor,
        textStyle,
      },
      title,
    } = props;
    return (
      <View style={styles.inputContainer} key={title}>
        <View style={textContainer}>
          <Text style={titleStyle}>{title}</Text>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            selectionColor={selectionColor}
            onChangeText={text => this.handleTypeText(text, type)}
            style={textStyle}
          />
        </View>
      </View>
    )
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.shadow}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      );
    } else {
      return (
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaViewStyle}>
              <View style={styles.bottomContainer}>
                <View style={styles.inputContainer} key='Ваш телефон'>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleStyle}>Ваш телефон</Text>
                    <PhoneInput
                      ref={(node) => {this.phone = node;}}
                      initialCountry='by'
                      value='+375'
                      style={styles.textStyle}
                      onPressFlag={() => {}}
                    />
                  </View>
                </View>
              </View>
            </SafeAreaView>
            {this.renderButton()}
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
};

const styles = StyleSheet.create({
  shadow: {
    width,
    height,
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    padding: 10
  },
  container: {
    width,
    height,
    marginBottom: 32,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: 'center',
    justifyContent: "center"
  },
  bottomContainer: {
    height: 'auto',
    minHeight: 100,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 24,
    width: width * 0.9,
    alignSelf: "center",
    paddingVertical: 8,
  },
  inputContainer: {
    marginVertical: 4,
    marginHorizontal: 8,
    height: 75,
    width: "95%",
    borderRadius: 24,
    justifyContent: "center",
    backgroundColor: "white",
  },
  loginButtonStyle: {
    width: 150,
    height: 50,
    margin: 'auto',
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center"
  },
  loginButtonTextStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "800"
  },
  textContainer: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: isAndroid() ? 2 : null,
    marginLeft: 24,
    marginRight: 24,
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#c7c5c6",
    marginRight: 10,
    textAlign: 'right',
    alignSelf: 'stretch'
  },
  textStyle: {
    fontSize: 14,
    color: "black",
    fontWeight: "800",
    right: isAndroid() ? 5 : 0,
    marginTop: isAndroid() ? 0 : 3,
    height: isAndroid() ? 35 : null
  },
});
