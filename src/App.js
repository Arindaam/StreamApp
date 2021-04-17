import React, { useState } from "react";
import youtube from "./api";
import { Grid } from "@material-ui/core";
import { SearchBar, VideoList, VideoDetail } from "./components";
// authenticate().then(loadClient());
function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getSearchTerm = async (searchTerm) => {
    const {
      data: { items },
    } = await youtube.get("search", {
      params: {
        q: searchTerm,
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyCRvevVKgDMrmU9Y_HeLvLmQKbCrgUJUaA",
      },
    });
    setVideos(items);
    setSelectedVideo(items[0]);    
  };
  const getSelectedVideo = (video) => {
    // console.log(video);
    setSelectedVideo(video);
  };  
  return (
    <Grid container justify="center" spacing={10}>
      <Grid item xs={12}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar getSearchTerm={getSearchTerm} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} getSelectedVideo={getSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default App;
