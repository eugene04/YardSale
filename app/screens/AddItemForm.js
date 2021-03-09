import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Image,
  LogBox,
} from "react-native";
import { Formik } from "formik";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { Button, Menu, Divider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import firebase from "../utils/Firebase";
import "firebase/firestore";
import _ from "lodash";
import "firebase/storage";
import * as Random from "expo-random";
import { storage } from "firebase";

const { width, height } = Dimensions.get("screen");
//LogBox.ignoreAllLogs();

export default function AddItemForm() {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageRef, setImageRef] = useState("");
  const [imageStorage, setImageStorage] = useState("");

  const closeMenu = () => setVisible(false);
  function openMenu() {
    return setVisible(true);
  }
  const db = firebase.firestore();
  //const storage = firebase.storage();

  //set value of categoty input from Menu
  function handleSelection(value) {
    setCategory(value);
    setVisible(false);
  }

  //submit values from form to firebase database
  function submitForm(values) {
    db.collection("item").add({
      values,
      category: category,
      image: imageStorage.photo,
    });

    setSelectedImage(null);
    setImageRef("");
  }
  //pick an image and add it to form for submission
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("permission to access camera roll is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const randomName = Random.getRandomBytes(10);
  //let gsReference;
  let uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = firebase.storage().ref("images/" + imageName);

    storageRef.put(blob).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downLoadURL) => {
        console.log("file available at: ", downLoadURL);
        setImageStorage({ photo: downLoadURL });
      });
    });
    //const gsReference = firebase
    // .storage()
    // .refFromURL(`gs://bucket/images/${imageName}`);
    //console.log(storageRef.fullPath);
  };

  let pic;
  if (selectedImage !== null) {
    pic = (
      <Image
        source={{ uri: selectedImage.localUri }}
        style={styles.thumbnail}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} color="teal">
            touch me to select category
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            handleSelection("clothing");
          }}
          title="clothing"
        />
        <Menu.Item
          onPress={() => {
            handleSelection("food");
          }}
          title="food"
        />
        <Menu.Item
          onPress={() => {
            handleSelection("furniture");
          }}
          title="furniture"
        />
        <Menu.Item
          onPress={() => {
            handleSelection("vehicles and spares");
          }}
          title="vehicles and spares"
        />
      </Menu>
      <Text> {category} </Text>
      <Formik
        initialValues={{ description: "", price: "" }}
        onSubmit={(values, actions) => {
          uploadImage(selectedImage.localUri, randomName)
            .then(() => {
              console.log("it work");
            })
            .catch((error) => {
              console.log("it does not work");
              console.error(error);
            });
          submitForm(values);
          actions.resetForm();
          setCategory("");
          setImageStorage(null);
          // console.log(values);
        }}
      >
        {(props) => (
          <View>
            <FormInput
              placeholder="description of item"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />
            <FormInput
              placeholder="price"
              onChangeText={props.handleChange("price")}
              value={props.values.price}
              keyboardType="numeric"
            />
            <FormButton
              color="teal"
              mode="contained"
              onPress={openImagePickerAsync}
              title="pick an image"
            />
            {pic}
            <FormButton
              color="teal"
              mode="contained"
              onPress={props.handleSubmit}
              title="add item"
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1,
    height: height / 15,
    fontWeight: "bold",
  },
  thumbnail: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  container: {
    padding: 20,
  },
});
