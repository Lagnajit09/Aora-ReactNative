import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getSavedVideos } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Search = () => {
  const { user } = useGlobalContext();
  const { data: savedVideos, reFetch } = useAppwrite(() =>
    getSavedVideos(user.$id)
  );
  const [refeshing, setRefreshing] = useState(false);

  console.log(savedVideos.documents);

  const onRefresh = async () => {
    setRefreshing(true);

    await reFetch();

    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={savedVideos.documents ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item.videos} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-2xl font-psemibold text-white">
              Saved Posts
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput placeholder="Search for your saved videos..." />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Results Found"
            subtitle="Save a video to find it here."
            buttonTitle="Explore Videos"
            routeTo="/home"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
