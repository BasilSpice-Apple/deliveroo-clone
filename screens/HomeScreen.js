import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import { SanityClient } from "@sanity/client";
import CategoryCard from "../components/CategoryCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
  ...,
  restaurants[]=>{
    ...,
    dishes[]->}
}`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="pt-5 bg-white ">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 rounded-full"
        />

        <View className="flex-grow">
          <Text className="font-bold text-gray-400 text-xs">Delivering To</Text>
          <Text className="font-bold text-xl">
            Home 
            {/* <HouseIcon size={20} color="#00CCBB" /> */}
          </Text>
        </View>
        <HomeIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      {/* <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-grow space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <MagnifyingGlassIcon size={20} color="#00CCBB" />
      </View> */}

      {/* Body */}
      <ScrollView className="bg-gray-100" contentContainerStyle={{paddingBottom: 100,}}>
        {/* Categories */}
        {/* <Categories /> */}
        {/* {Featured Rows} */}

        {featuredCategories?.map((category, index) => {
          return (
            <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category?.short_description}
          />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
