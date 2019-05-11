import React from "react";
import {
  View,
  Text,
  Image as ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { WebView } from "react-native-webview";
import YTSearch from "youtube-api-search";
import { YOUTUBE_API } from "../apiKeys";

export default class VideoSearch extends React.Component {
  state = { video: "", videos: [] };

  searchVideo = async video => {
    await this.setState({ video });

    if (this.state.video.length > 3) {
      try {
        await YTSearch(
          { key: YOUTUBE_API, term: `${this.state.video} guitar tutorial` },
          videos => {
            if (videos.length > 0) {
              this.setState({ videos });
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.video}
          placeholder="Search a Video"
          autoFocus={true}
          onChangeText={this.searchVideo}
        />

        {this.state.videos.length > 0 && (
          <ScrollView>
            {this.state.videos.map(video => (
              <TouchableOpacity
                key={video.etag}
                style={styles.videoContainer}
                disabled={this.state.loading}
                onLongPress={() => {
                  this.props.setVideo({
                    title: video.snippet.title,
                    data: {
                      videoId: video.id.videoId,
                      uri: video.snippet.thumbnails.medium.url,
                      height: video.snippet.thumbnails.medium.height
                    },
                    type: "youtube"
                  });

                  this.props.closeModal();
                }}>
                <Text style={styles.videoTitle}>{video.snippet.title}</Text>

                <WebView
                  source={{
                    uri: `https://youtube.com/embed/${video.id.videoId}`
                  }}
                  renderLoading={() => (
                    <Text>{`Loading ${video.snippet.title}...`}</Text>
                  )}
                  style={styles.webview}
                />
                <Text>{video.snippet.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  videoContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "lightcoral",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 1
  },
  videoTitle: { color: "black" },
  webview: {
    marginTop: 20,
    height: 200,
    width: 320,
    alignSelf: "stretch",
    flex: 1
  }
});
