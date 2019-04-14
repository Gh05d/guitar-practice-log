import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default class MusicSearch extends React.Component {
  state = { song: "", songs: [], loading: false, songId: null, error: null };

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

  fetchSong = async (songId, title) => {
    await this.setState({ loading: true, error: null });

    try {
      const { data } = await axios(
        `http://www.songsterr.com/a/wa/song?id=${songId}`
      );

      await this.props.setSong({ title, data, type: "tab" });
      this.props.closeModal();
    } catch (err) {
      console.log("LOG: MusicSearch -> fetchSong -> err", err);
      await this.setState({ loading: false, error: err });
    }
  };

  render() {
    // if (this.state.songUrl) {
    //   console.log(this.state.songUrl.data);
    //   Object.keys(this.state.songUrl).map(url => console.log(url));
    //   return (
    //     <WebView
    //       originWhitelist={["*"]}
    //       source={{
    //         html: this.state.songUrl.data
    //         //  uri: `http://www.songsterr.com/a/wa/song?id=${this.state.songId}`
    //       }}
    //       onLoad={syntheticEvent => console.log(syntheticEvent)}
    //       onLoadEnd={syntheticEvent => console.log("Ended", syntheticEvent)}
    //       renderError={errorName => <Error name={errorName} />}
    //       startInLoadingState={true}
    //       renderLoading={() => <Text>Loading...</Text>}
    //       //  style={{marginTop: 20}}
    //     />
    //   );
    // }

    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.song}
          placeholder="Search a Song"
          autoFocus={true}
          onChangeText={this.searchSong}
        />

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
                  color="lightblue"
                  onPress={() => this.fetchSong(song.id, song.title)}

                  // onPress={() => this.setState({ songId: song.id })}
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
