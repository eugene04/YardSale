import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import FormButton from "../components/FormButton";

export default function DetailScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { HeaderTitle } = route.params;
  const { MySubtitle } = route.params;
  const { image } = route.params;
  const { MyTitle } = route.params;
  const { MyParagraph } = route.params;
  const { price } = route.params;
  const { name } = route.params;
  const { address } = route.params;
  return (
    <View>
      <Card>
        <Card.Title
          title={HeaderTitle}
          subtitle={MySubtitle}
          left={(props) => <Avatar.Icon {...props} icon="cart" />}
        />
        <Card.Cover source={image} />
        <Card.Content>
          <Title style={styles.title2}>
            {MyTitle} {price}
          </Title>
          <Paragraph>{MyParagraph}</Paragraph>
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
          onPress={() => navigation.navigate("AddItemForm")}
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
