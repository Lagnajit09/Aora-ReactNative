import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { useGlobalContext } from "../context/GlobalProvider";
import { saveVideoDB } from "../lib/appwrite";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [showOpts, setShowOpts] = useState(false);

  const savePost = async (videoId) => {
    try {
      const result = await saveVideoDB(user.$id, videoId);
      setShowOpts(false);
      Alert.alert("Saved", "Video saved successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start relative">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg p-0.5 justify-center items-center border border-secondary">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="contain"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs  text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowOpts(!showOpts)}>
          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {showOpts && (
          <View className=" bg-gray-800 flex flex-col gap-3 items-center justify-center pr-3 pb-3 rounded-md absolute z-10 top-10 right-0">
            <TouchableOpacity onPress={() => savePost($id)}>
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-white">Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl  mt-3 "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
