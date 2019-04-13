import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";

export default class MusicSearch extends React.Component {
  state = { song: "", songs: [], loading: false, songId: null };

  searchSong = async song => {
    await this.setState({ song });

    if (this.state.song.length > 3) {
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

  fetchSong = async songId => {
    await this.setState({ loading: true });
    try {
      const songUrl = await axios(
        `http://www.songsterr.com/a/wa/song?id=${songId}`
      );

      await this.setState({ songUrl, loading: false });
    } catch (err) {
      console.warn(err);
      await this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.songId) {
      return (
        <WebView
          source={{
            uri: `http://www.songsterr.com/a/wa/song?id=${this.state.songId}`
          }}
          onLoad={syntheticEvent => console.warn(syntheticEvent)}
          onLoadEnd={syntheticEvent => console.warn("Ended", syntheticEvent)}
          renderError={errorName => <Error name={errorName} />}
          startInLoadingState={true}
          renderLoading={() => <Text>Loading...</Text>}
          //  style={{marginTop: 20}}
        />
      );
    }

    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.song}
          placeholder="Search a Song"
          autoFocus={true}
          onChangeText={this.searchSong}
        />
        {this.state.songs.length > 0 && (
          <ScrollView>
            {this.state.songs.map(song => (
              <View style={styles.song} key={song.id}>
                <Button
                  disabled={this.state.loading}
                  title={`${song.artist.nameWithoutThePrefix} - ${song.title}`}
                  color="lightcoral"
                  onPress={() => this.setState({ songId: song.id })}
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
  song: { marginTop: 10, marginBottom: 10 }
});
