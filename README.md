# Software-rendszerek-tervezese

## Project Overview
This is a voting application that allows organizers to create votings and users to participate by casting their votes. Key features include creating new votings, retrieving active votings, and marking votings as inactive.

## Installation
1. Clone the repository:
   git clone <repository-url>

2. npm install

3. npm run dev


## API Endpoints
- **Create Voting**: `POST /api/votings/create`
- **Get Active Votings**: `GET /api/votings/active`
- **Set Voting Inactive**: `PATCH /api/votings/inactive/:id`

## Environment Variables
Ensure you set up the following environment variables:
MONGODB_URI=<...>
