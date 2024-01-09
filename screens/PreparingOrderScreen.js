import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import {useNavigation} from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
const PreparingOrderScreen = () => {

const navigation = useNavigation();
const restaurant = useSelector(selectRestaurant)

useEffect(() => {
    setTimeout(()=> {
        navigation.navigate("Delivery")
    }, 6000)
},[])


  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center ">
      <Animatable.Image
        source={require("../assets/anim.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
      animation="slideInUp"
      iterationCount={1}
      className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for {restaurant.title} to accept your order!
      </Animatable.Text>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
