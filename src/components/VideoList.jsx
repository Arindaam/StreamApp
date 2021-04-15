import React from "react";
import { Grid } from "@material-ui/core";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, getSelectedVideo }) => {
  return (
    <Grid container spacing={6}>
      {videos.map((video, index) => (
        <VideoItem
          key={index}
          video={video}
          getSelectedVideo={getSelectedVideo}
        />
      ))}
    </Grid>
  );
};

export default VideoList;
