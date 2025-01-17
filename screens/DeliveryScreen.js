import { View, Text, SafeAreaView, Image, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";

import { XCircleIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const dispatch = useDispatch();

  const onPressMobileNumberClick = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    
    <View className=" bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="justify-between items-center p-3">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="rounded-lg bg-white p-4 "
          >
            <Text className="text-center text-[#00CCBB] text-lg font-bold">
              Order More Food
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400 ">Estimated Arrival</Text>
              <Text className="text-2xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar size={50} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      

      

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Ricky</Text>
          <Text className="text-gray-400">Your Delivery Driver</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("tel:281-330-8004");
          }}
        >
          <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
