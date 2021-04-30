import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "../utils/Firebase";
import "firebase/firestore";

import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import Data from "../components/Data";
import DetailScreen from "./DetailScreen";
import FormButton from "../components/FormButton";
import "intl";
import "intl/locale-data/jsonp/en";

const db = firebase.firestore();

export default function ListScreen({ navigation }) {
  const [product, setProduct] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FormButton
          onPress={() => {
            navigation.navigate("Add to YardSale");
          }}
          title="add item"
        />
      ),
    });
  }, [navigation]);

  const fetchProducts = () => {
    const myProduct = [];

    db.collection("item")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const { category, image, values } = doc.data();
          myProduct.push({
            id: doc.id,
            category,
            image,
            values,
          });
        });
        setProduct(myProduct);
      });
  };

  useEffect(() => {
    fetchProducts();
    //console.log(product);
  }, []);
  //console.log(product);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={product}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", {
                Id: item.id,
                category: item.category,

                image: item.image,
                description: item.values.description,

                price: item.values.price,
              })
            }
          >
            <Card style={styles.card}>
              <Card.Title title={item.category} />
              <Card.Cover source={{ uri: item.image }} />
              <Card.Content>
                <Paragraph style={styles.paragraph}>
                  {item.values.description}
                </Paragraph>

                <Title> {formatter.format(item.values.price)} </Title>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
    // <ScrollView style={styles.container}>
    //{product.map((item) => (
    // <View key={item.doc.id}>
    //<TouchableOpacity
    // onPress={() =>
    // navigation.navigate("Details", {
    //  itemId: item.doc.id,
    // HeaderTitle: item.doc.data().category,

    // image: item.doc.data().image,
    // MyTitle: item.doc.data().values.description,

    // price: item.doc.data().values.price,
    // })
    // }
    // >
    ///  <Card style={styles.card}>
    //  <Card.Title title={item.data.category} />
    //  <Card.Cover source={{ uri: item.doc.data().image }} />
    // <Card.Content>
    //   <Title> {item.doc.data().values.description} </Title>
    //   <Paragraph> {item.doc.data().values.price} </Paragraph>
    // </Card.Content>
    //</Card>
    // </TouchableOpacity>
    // </View>
    //))}
    //</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  card: {
    margin: 5,
  },
  paragraph: {
    //color: "teal",
    fontSize: 15,
    marginTop: 8,
  },
  title: {
    color: "teal",
  },
});
