import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import FormButton from "../components/FormButton";

export default function DetailScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { description } = route.params;
  const { price } = route.params;
  const { image } = route.params;
  const { category } = route.params;
  const { MyParagraph } = route.params;
  //const { price } = route.params;
  const { name } = route.params;
  const { address } = route.params;
  return (
    <View>
      <Card>
        <Card.Title
          title={category}
          //subtitle={MySubtitle}
          left={(props) => <Avatar.Icon {...props} icon="cart" />}
        />
        <Card.Cover source={{ uri: image }} />
        <Card.Content>
          <Title style={styles.title2}>{category}</Title>
          <Paragraph>{price}</Paragraph>
          <Title style={styles.seller}>seller's details</Title>
          <Title style={styles.title}> my name is {name} </Title>
          <Title style={styles.title}>
            You can view the product at {address}
          </Title>
        </Card.Content>

        <FormButton
          title="join chat room here"
          modeValue="text"
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => navigation.navigate("chatroom", { _id: itemId })}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    //color: "teal",
    fontSize: 15,
  },
  seller: {
    color: "red",
    textDecorationLine: "underline",
  },
  title2: {
    color: "teal",
    fontSize: 17,
  },
});
