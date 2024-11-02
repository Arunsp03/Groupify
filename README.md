# Collaborative Playlist Streaming Platform

This project is a collaborative SaaS platform that allows users to create and listen to a shared playlist of videos from YouTube. It's designed for streamers and contributors to seamlessly interact in building a dynamic playlist.

## Features

- **Collaborative Playlist Creation**: Both streamers and viewers can add videos to the playlist by sharing YouTube URLs, creating an interactive and dynamic queue.
- **Streamer-Controlled Playback**: Only the streamer has the ability to start and control video playback, ensuring synchronized viewing for all participants.
- **Long-Polling Communication**: The platform operates using long-polling to maintain real-time interactions between users, providing updates on new additions and current video status.

## How It Works

1. **Adding Videos**: Users (both streamers and contributors) add YouTube video links to the playlist queue.
2. **Starting the Playlist**: The streamer controls playback, beginning video streams for the group.
3. **Real-Time Updates**: The long-polling mechanism ensures everyone stays in sync with the playlist and current video.

## PS
**Inspired from Muzer by @hkirat**


