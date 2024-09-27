
# Video Library Assignment Frontend

## Overview
This React application serves as the frontend for a Video Library API. It allows users to view, search, and manage video content fetched from a backend service. The app includes features like pagination, sorting, and the ability to start/stop a cron job for video updates.

## Features
- View a paginated list of videos.
- Search videos by title or description.
- Sort videos by publication date (newest/oldest).
- Adjust the number of videos displayed per page.
- Start and stop a cron job for background video updates.

## Tech Stack
- **React**: For building user interfaces.
- **Axios**: For making HTTP requests.
- **Tailwind CSS**: For styling and responsive design.

## Installation

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/VanshWadhwa/youtube-assignment-frontend
   cd youtube-assignment-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## Usage
- On the main page, you'll see a list of videos with their titles, descriptions, and thumbnails.
- Use the search bar to filter videos by title or description.
- Select sorting options to change the order of videos displayed.
- Adjust the number of videos shown per page.
- Use the "Start Cron Job" and "Stop Cron Job" buttons to manage background updates for videos.

## API Integration
This frontend interacts with the following endpoints of the backend:
- `GET /api/video`: Fetch paginated videos.
- `GET /api/video/search`: Search videos by query.
- `POST /api/cron/start`: Start the cron job.
- `POST /api/cron/stop`: Stop the cron job.
