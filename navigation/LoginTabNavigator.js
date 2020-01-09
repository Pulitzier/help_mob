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
} from "react-native";

const { width, height } = Dimensions.get('window');

const loginBackground = "https://www.devostock.com/static11/preview2/stock-photo-devostock-nature-wood-190932-4kjpeg-152395.jpg";

const isAndroid = () => (Platform.OS === 'ios');

const saveUserSession = async (user) => {
  try {
    if (user) AsyncStorage.setItem('@user', JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
}

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        phone: '',
        password: '',
        documentId: '',
      }
    };
  }

  renderButton = () => (
    <TouchableOpacity style={styles.loginButtonStyle} onPress={() => {
      saveUserSession(this.state.user);
      this.props.navigation.navigate('Main');
    }}>
      <Text style={styles.loginButtonTextStyle}>LOGIN</Text>
    </TouchableOpacity>
  )

  handleTypeText = (type, text) => {
    this.setState((prev, next) => ({
      user: Object.assign(prev.user, { [type]: text }),
    }));
  }

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
      onChangeText,
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
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
          <ImageBackground
            borderRadius={24}
            resizeMode="cover"
            style={styles.imageBackgroundStyle}
            source={{ uri: loginBackground }}
          >
            <View style={styles.blackoverlay}>
              <SafeAreaView style={styles.safeAreaViewStyle}>
                <View style={styles.bottomContainer}>
                  {
                    [
                      { title: "Номер договора", placeholder: "Case Num.", type: 'documentId' },
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
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    marginBottom: 32,
    backgroundColor: "#282828"
  },
  bottomContainer: {
    height: 265,
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
