import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Image,
  LogBox,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { Button, Menu, Divider, Title } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import firebase from "../utils/Firebase";
import "firebase/firestore";
import _ from "lodash";
import "firebase/storage";
import * as Random from "expo-random";
import { storage } from "firebase";
import * as yup from "yup";
import useStatsBar from "../utils/useStatusBar";

const { width, height } = Dimensions.get("screen");
//LogBox.ignoreAllLogs();

const itemSchema = yup.object({
  description: yup.string().required().min(4),
  price: yup.string().required(),
  roomName: yup.string().required(),
});

export default function AddItemForm({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageStorage, setImageStorage] = useState(null);

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
    db.collection("item")
      .add({
        values,
        category: category,
        image: imageStorage.photo,
      })
      .then((docref) => {
        docref
          .collection("THREADS")
          .add({
            name: values.roomName,
            latestMessage: {
              text: `You have joined the room ${values.roomName}.`,
              createdAt: new Date().getTime(),
            },
          })

          .then((docRef) => {
            docRef.collection("MESSAGES").add({
              text: `You have joined the room ${values.roomName}.`,
              createdAt: new Date().getTime(),
              system: true,
            });
            // navigation.navigate("Home");
          });
      });
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
  };

  let nullImageStorage = () => {
    if (imageStorage === null) {
      setImageStorage({
        photo:
          "https://firebasestorage.googleapis.com/v0/b/baracuda-a5d9f.appspot.com/o/images%2Fyardsale.jpg?alt=media&token=d87abe05-4239-47ec-85a9-c7e0592ceee8",
      });
    }
  };
  function handleButtonPress() {
    if (roomName.length > 0) {
      database
        .collection("THREADS")
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection("MESSAGES").add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true,
          });
          navigation.navigate("Home");
        });
    }
  }

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
    <ScrollView style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} color="blue">
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
      <Text style={styles.category}> {category} </Text>
      <Formik
        initialValues={{ description: "", price: "", roomName: "" }}
        validationSchema={itemSchema}
        onSubmit={(values, actions) => {
          nullImageStorage();
          if (selectedImage !== null) {
            uploadImage(selectedImage.localUri, randomName)
              .then(() => {
                console.log("it work");
              })
              .catch((error) => {
                console.log("it does not work");
                console.error(error);
              });
          }

          submitForm(values);
          actions.resetForm();
          setCategory("");
          setSelectedImage(null);
          navigation.navigate("Products");

          // console.log(values);
        }}
      >
        {(props) => (
          <View>
            <FormInput
              placeholder="description of item"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
              multiline
              numberOfLines={4}
              onBlur={props.handleBlur("description")}
            />
            <Text style={styles.valerror}>
              {props.touched.description && props.errors.description}
            </Text>
            <FormInput
              placeholder="price"
              onChangeText={props.handleChange("price")}
              value={props.values.price}
              keyboardType="numeric"
              onBlur={props.handleBlur("price")}
            />
            <Text style={styles.valerror}>
              {props.touched.price && props.errors.price}
            </Text>
            <Title>Create chat room </Title>
            <FormInput
              placeholder="chat room name"
              onChangeText={props.handleChange("roomName")}
              value={props.values.roomName}
              multiline
              numberOfLines={4}
              onBlur={props.handleBlur("roomName")}
            />
            <Text style={styles.valerror}>
              {props.touched.roomName && props.errors.roomName}
            </Text>
            <FormButton
              color="blue"
              mode="contained"
              onPress={openImagePickerAsync}
              title="pick an image"
            />
            {pic}
            <FormButton
              color="blue"
              mode="contained"
              onPress={props.handleSubmit}
              title="add item"
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  category: {
    marginTop: 10,
    //marginBottom: 10,
    width: width / 1,
    height: height / 15,
    fontWeight: "bold",
    color: "grey",
    fontSize: 20,
    fontFamily: "monospace",
  },
  thumbnail: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  container: {
    padding: 20,
  },
  valerror: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
