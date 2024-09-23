import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
//Form validation
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('Length is required')
})

export default function App() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordstring = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    console.log(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    console.log("Result :", result)
    return result
  }

  const resetPasswordstate = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.top}>
            <Text style={styles.title}>Password Generator</Text>
          </View>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={PasswordSchema}
              onSubmit={(values) => {
                console.log(values)
                Keyboard.dismiss(); //close the keyboard when button is pressed
                generatePasswordstring(Number(values.passwordLength))
              }}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                handleReset
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={[styles.heading, { marginBottom: 10 }]}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>{errors.passwordLength}</Text>
                      )}
                      <TextInput
                        style={styles.inputStyle}
                        value={values.passwordLength}
                        onChangeText={handleChange('passwordLength')}
                        placeholder='Ex. 8'
                        keyboardType='numeric'
                        onBlur={handleBlur('passwordLength')}
                      />
                    </View>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Lowercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Uppercase letters</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => setupperCase(!upperCase)}
                      fillColor="#FED85D"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#db2d16"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#0790f2"
                    />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryBtn}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.primaryBtnTxt}>
                        Generate Password
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => {
                        handleReset();
                        resetPasswordstate();
                      }}
                    >
                      <Text style={styles.secondaryBtnTxt}>
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
          {isPassGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result :</Text>
              <Text style={styles.description}>&#40; Long Press to Copy &#x29;
              </Text>
              <Text
                selectable={true}
                style={styles.generatedPassword}>{password}</Text>
            </View>
          ) : null}
        </SafeAreaView>
      </ScrollView >
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  top: {
    flex: 1,
    marginTop: 15,
    marginRight: 30,
    paddingVertical: 1,
    backgroundColor: '#0479d9',
    marginBottom: 10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100
  },
  title: {
    fontSize: 27,
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
    paddingLeft: 15
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
    color: '#0a0a0a'
  },
  description: {
    fontSize: 15,
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
    color: '#0a0a0a'
  },
  inputWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    columnGap: 10
  },
  inputColumn: {
    flexDirection: 'column',
    // rowGap: 10
  },
  inputStyle: {
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 13,
    color: '#ff0d10',
    marginBottom: 5
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  },
  primaryBtn: {
    // width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#1773e3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  secondaryBtn: {
    // width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#838784',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: 'white'
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  }
})