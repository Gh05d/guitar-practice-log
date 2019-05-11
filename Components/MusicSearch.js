import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";

export default class MusicSearch extends React.Component {
  state = {
    song: "",
    title: "",
    songs: [],
    loading: false,
    songId: null,
    error: null
  };

  searchSong = async song => {
    await this.setState({ song });

    if (this.state.song.length > 2) {
      try {
        const res = await axios(
          `http://www.songsterr.com/a/ra/songs.json?pattern=${this.state.song}`
        );

        if (res.data.length > 0) {
          await this.setState({ songs: res.data });
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  fetchSong = async () => {
    await this.setState({ loading: true, error: null });
    const { title, songId } = this.state;
    try {
      const { data } = await axios(
        `http://www.songsterr.com/a/wa/song?id=${songId}`
      );

      await this.props.setSong({ title, songId, data, type: "tab" });
      this.props.closeModal();
    } catch (err) {
      await this.setState({ loading: false, error: err });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.song}
          placeholder="Search a Song"
          autoFocus={true}
          onChangeText={this.searchSong}
        />

        {this.state.songId && (
          <TouchableOpacity
            style={styles.tabContainer}
            onLongPress={this.fetchSong}>
            <WebView
              source={{
                uri: `http://www.songsterr.com/a/wa/song?id=${
                  this.state.songId
                }`
              }}
              renderLoading={() => (
                <Text>{`Loading ${this.state.song}...`}</Text>
              )}
              style={styles.webview}
            />
          </TouchableOpacity>
        )}

        {this.state.error && (
          <Text>Something went wrong. Couldn't save Song.</Text>
        )}

        {this.state.songs.length > 0 && (
          <ScrollView>
            {this.state.songs.map(song => (
              <View style={styles.song} key={song.id}>
                <Button
                  disabled={this.state.loading}
                  title={`${song.artist.nameWithoutThePrefix} - ${song.title}`}
                  color="midnightblue"
                  onPress={() =>
                    this.setState({ songId: song.id, title: song.title })
                  }
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  song: { marginTop: 10, marginBottom: 10 },
  tabContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: "center"
  },
  webview: {
    height: 200,
    width: 320,
    alignSelf: "stretch",
    flex: 1
  }
});
