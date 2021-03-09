import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import Data from "../components/Data";
import DetailScreen from "./DetailScreen";

export default function ListScreen({ navigation }) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    setProduct(Data);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {product.map((item) => (
        <View key={item.id}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", {
                itemId: item.id,
                HeaderTitle: item.HeaderTitle,
                MySubtitle: item.MySubtitle,
                image: item.image,
                MyTitle: item.MyTitle,
                MyParagraph: item.MyParagraph,
                price: item.price,
                name: item.name,
                address: item.address,
              })
            }
          >
            <Card style={styles.card}>
              <Card.Title title={item.HeaderTitle} subtitle={item.MySubtitle} />
              <Card.Cover source={item.image} />
              <Card.Content>
                <Title> {item.MyTitle} </Title>
                <Paragraph> {item.MyParagraph} </Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  card: {
    margin: 5,
  },
});
