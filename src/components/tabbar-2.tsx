import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import Icons from "./icons";

const TabBarComponent = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
//   const screens = state.routeNames.filter(route => route.includes("(screens)"))

  const currentRoute = state.routes[state.index].name;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    // Cleanup
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <>
      {!isKeyboardVisible && (
        <View className=" h-20 bg-black flex flex-row items-center justify-center mx-10 rounded-full absolute bottom-0 left-0 right-0"
       
        >
          {/* HOME */}
          <TouchableOpacity
            onPress={() => navigation.navigate("index")}
            className={`flex h-full w-1/4 items-center justify-center $`}
          >
            <Icons
              name={"House"}
              color={currentRoute === "index" ? "#FA0250" : "#a1a1aa"}
            />
          </TouchableOpacity>

          {/* EXPLORE */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Explore")}
            className={`flex h-full w-1/4 items-center justify-center`}
          >
            <Icons
              name={"Search"}
              color={currentRoute === "Explore" ? "#FA0250" : "#a1a1aa"}
            />
          </TouchableOpacity>

          {/* NOTIFICATIONS */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            className={` flex h-full w-1/4 items-center justify-center`}
          >
            <Icons
              name={"Bell"}
              color={currentRoute === "Notifications" ? "#FA0250" : "#a1a1aa"}
            />
          </TouchableOpacity>

          {/* PROFILE */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            className={` flex h-full w-1/4 items-center justify-center`}
          >
            <Icons
              name={"UserRound"}
              color={currentRoute === "Profile" ? "#FA0250" : "#a1a1aa"}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default TabBarComponent;