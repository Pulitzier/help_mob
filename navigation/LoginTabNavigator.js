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
} from "react-native";

const { width, height } = Dimensions.get('window');

const loginBackground = "https://dev-storage-box.s3.eu-central-1.amazonaws.com/mountains-of-chamonix-alps-1579349462rwJ.jpg";
const bUrl = 'https://rjjt56u7fb.execute-api.eu-central-1.amazonaws.com/stage';

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

  sendRequest = async () => {
    if (this.state.user && this.state.user.phone) {
      const params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: this.state.user.phone }),
      };
      try {
        let response = await fetch(bUrl, params);
        let responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.requested) return responseJson.requested;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  };

  handleLoginSend = async () => {
    this.setState({ isLoading: true });
    const user = await this.sendRequest();
    const oldUser = this.state.user;
    if (user) {
      await this.setState({ isLoading: false, user: Object.assign({}, oldUser, { full: user }) });
      await saveUserSession(this.state.user);
      await this.props.navigation.navigate('Main');
    }
  };

  renderButton = () => (
    <TouchableOpacity
      style={styles.loginButtonStyle}
      onPress={this.handleLoginSend}
    >
      <Text style={styles.loginButtonTextStyle}>LOGIN</Text>
    </TouchableOpacity>
  );

  handleTypeText = (type, text) => {
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
            onChangeText={text => this.handleTypeText(type, text)}
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
            <ImageBackground
              borderRadius={24}
              resizeMode="cover"
              style={styles.imageBackgroundStyle}
              source={{
                uri: loginBackground,
                cache: 'only-if-cached',
              }}
            >
              <View style={styles.blackoverlay}>
                <SafeAreaView style={styles.safeAreaViewStyle}>
                  <View style={styles.bottomContainer}>
                    {
                      [
                        { title: "Ваш телефон", placeholder: "Phone", type: 'phone' },
                        { title: "Пароль", placeholder: "Password", type: 'password' }
                      ]
                        .map(item => this.renderInput({
                          type: item.type,
                          placeholder: item.placeholder,
                          styles: {
                            ...styles,
                            placeholderTextColor: "#ccc",
                            selectionColor: "#757575",
                          },
                          title: item.title,
                        }))
                    }
                  </View>
                </SafeAreaView>
              </View>
            </ImageBackground>
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
    backgroundColor: "#282828"
  },
  bottomContainer: {
    height: 'auto',
    minHeight: 100,
    bottom: 100,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 24,
    width: width * 0.9,
    alignSelf: "center",
    position: "absolute",
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
    left: 0,
    right: 0,
    bottom: 10,
    height: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  loginButtonTextStyle: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
  },
  imageBackgroundStyle: {
    width,
    flex: 1,
    zIndex: -1,
    height: height * 0.9,
    ...StyleSheet.absoluteFillObject
  },
  blackoverlay: {
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  safeAreaViewStyle: {
    flex: 1
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
