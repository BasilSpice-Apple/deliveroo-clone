import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  clearBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import {
  ArrowLeftIcon,
} from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { PreparingOrderScreen } from "./PreparingOrderScreen";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const finalBasketTotal = basketTotal + basketTotal * .10 + 6.99;
  const salesTax = basketTotal * .10;
  
 

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="pb-7 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Cart</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-white absolute top-3 left-5"
            >
            <ArrowLeftIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
          <View className="rounded-full bg-white justify-between items-center p-2 absolute  right-5">
          <TouchableOpacity
            onPress={() => {dispatch(clearBasket())}}
            className="rounded-lg bg-white p-4 border-2 border-[#00CCBB] shadow-sm"
          >
            <Text className="text-center text-[#00CCBB] text-md ">
              Empty Cart
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-5 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Estimated Delivery Time: </Text>
         
            <Text className="text-[#00CCBB]">50-75 min</Text>
          
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x </Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Text>${items[0]?.price}</Text>
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Text>{parseFloat(basketTotal.toFixed(2))}</Text>
              {/* parseFloat("10.547892").toFixed(2) */}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Text>$6.99</Text>
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Sales Tax</Text>
            <Text className="text-gray-400">
              <Text>${parseFloat(salesTax).toFixed(2)}</Text>
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Total</Text>
            <Text className="font-extrabold">
              <Text className="extra-bold">
                ${parseFloat(finalBasketTotal).toFixed(2)}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => { navigation.navigate("PreparingOrder"); dispatch(clearBasket()); }
            }
            className="rounded-lg bg-[#00CCBB] p-4"
            
          >
            
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
