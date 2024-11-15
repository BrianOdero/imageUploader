import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Switch, Alert, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import supabase from '@/DBconfig/supabaseClient';


const LoginRegisterScreens = () => {


  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [confirmPassword,setConfirmPassword] = useState<string>("")


  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setISLoading] = useState<boolean>(false)

  //sign in function
  const signIn = async () => {
    setISLoading(true)
    const {error} = await supabase.auth.signInWithPassword({email,password})
    
    if (error) Alert.alert("Error Signing In " + error.message)
      else Alert.alert("Successfully signed in")
      setEmail("")
      setPassword("")

      setISLoading(false)

    
  }

  const signUp = async () => {
    setISLoading(true)
    const {error} = await supabase.auth.signUp({email,password});

    if(error) Alert.alert("Error signing up. " + error.message)
    else Alert.alert("Signed up successfully")
    
    setEmail("")
    setPassword("")
    setISLoading(false)

  }

  if (loading) return <ActivityIndicator/>

  const toggleScreen = () => setIsLogin(!isLogin);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: isLogin ? '/placeholder.svg?height=200&width=200' : '/placeholder.svg?height=200&width=200' }}
        style={styles.image}
      />
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
      <Text style={styles.subtitle}>
        {isLogin ? 'Please sign in to continue.' : 'Please register to login.'}
      </Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#1e3a8a" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          
        />
      </View>
     
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#1e3a8a" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#1e3a8a" />
        </TouchableOpacity>
      </View>

      

      <View style={styles.rememberMeContainer}>
        <Text style={styles.rememberMeText}>Remember me</Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
          thumbColor={rememberMe ? "#1e3a8a" : "#f4f4f5"}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={isLogin ? signIn : signUp}>
         <Text style={styles.buttonText}>{isLogin ? 'Sign In'  : 'Sign Up'}</Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={toggleScreen} style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have account? " : "Already have account? "}
          <Text style={styles.toggleTextBold}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#1e3a8a',
  },
  eyeIcon: {
    padding: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rememberMeText: {
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#1e3a8a',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    marginTop: 10,
  },
  toggleText: {
    color: '#6b7280',
  },
  toggleTextBold: {
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
});

export default LoginRegisterScreens;