# Software-rendszerek-tervezese

## Project Overview
This is a voting application that allows organizers to create votings and users to participate by casting their votes. Key features include creating new votings, retrieving active votings, and marking votings as inactive.

# Back-End Overview

## Installation
1. Clone the repository:
   git clone <repository-url>

2. cd ./back-end

3. npm install

4. npm run dev

## API Endpoints

### **Register User**
- **Endpoint**: `POST /api/auth/register`
- **Description**: Registers a new user.
- **Request Body**:
  - `first_name` (string): The first name of the user.
  - `last_name` (string): The last name of the user.
  - `id_number` (string): The ID number of the user.
  - `cnp` (string): The CNP of the user.
  - `nationality` (string): The nationality of the user.
  - `password` (string): The password of the user.
  - `confirmPassword` (string): The password confirmation of the user.
- **Response**:
  - **Success**:
    ```json
    {
      "message": "User registered successfully",
      "data": { /* User Object */ }
    }
    ```
  - **Errors**:
    - `400`: Invalid password.
      ```json
      { "message": "Passwords do not match" }
      ```
    - `409`: User already exists.
      ```json
      { "message": "User already exists." }
      ```
    - `500`: Failed to register the user.
      ```json
      { "message": "Internal Server Error." }
      ```


### **Login User**

- **Endpoint**: `POST /api/auth/login`
- **Description**: Logs in a user.
- **Request Body**:
  - `id_number` (string): The ID number of the user.
  - `password` (string): The password of the user.

- **Response**:
  - **Success**:
    ```json
    {
      "message": "User logged in successfully",
      "data": { /* User Object */ }
    }
    ```
  - **Errors**:
    - `400`: Invalid password.
      ```json
      { "message": "Invalid password." }
      ```
    - `400`: User not found.
      ```json
      { "message": "User not found." }
      ```
    - `500`: Failed to log in the user.
      ```json
      { "message": "Internal Server Error." }
      ```

### **1. Create Voting**
- **Endpoint**: `POST /api/votings/create`
- **Description**: Creates a new voting.
- **Request Body**:
  ```json
  {
    "name": "voting name",
    "description": "voting description",
    "isActive": true,
    "region": "city",
    "regionName": "tg mures",
    "candidates": [
      { "name": "name1", "party": "party1" },
      { "name": "name2", "party": "party2" }
    ],
    "totalVotes": 0,
    "startDate": "Date()",
    "endDate": "Date()",
    "voters": []
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Voting created successfully",
      "data": { /* Voting Object */ }
    }
    ```
  - **Errors**:
    - `500`: Failed to create the voting.
      ```json
      { "message": "Failed to create a new voting." }
      ```

### **2. Get Active Votings**
- **Endpoint**: `GET /api/votings/active`
- **Description**: Fetches all active votings.
- **Response**:
  - **Success**:
    ```json
    {
      "data": [
        {
          "_id": "mongodb_id",
          "name": "voting name",
          "description": "voting description",
          "region": "city",
          "regionName": "tg mures",
          "candidates": [
            { "_id": "mongodb_id", "name": "name1", "votes": 0, "party": "party1" },
            { "_id": "mongodb_id", "name": "name2", "votes": 2, "party": "party2" }
          ],
          "totalVotes": 2,
          "startDate": "Date()",
          "endDate": "Date",
          "voters": ["user1", "user2"]
        }
      ]
    }
    ```
  - **Errors**:
    - `500`: Failed to fetch active votings.
      ```json
      { "message": "Failed to fetch active votings." }
      ```

### **3. Set Voting Inactive**
- **Endpoint**: `PATCH /api/votings/inactive/:id`
- **Description**: Sets a voting as inactive.
- **Path Parameter**:
  - `id` (string): the mongodbId of the voting
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Voting set to inactive",
      "data": { /* Updated Voting Object */ }
    }
    ```
  - **Errors**:
    - `404`: Voting not found.
      ```json
      { "message": "Voting not found." }
      ```
    - `500`: Failed to set the voting as inactive.
      ```json
      { "message": "Failed to set voting to inactive." }
      ```

### **4. Vote for a Candidate**
- **Endpoint**: `POST /api/votings/vote/:votingId/:candidateId`
- **Description**: Allows a user to a vote
- **Path Parameters**:
  - `votingId` (string): id of the voting
  - `candidateId` (string): id of the candidate
- **Request Body**:
  ```json
  {
    "userId": "mongodb_id"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Vote registered successfully",
      "data": { /* Updated Voting Object */ }
    }
    ```
  - **Errors**:
    - `404`: Voting or candidate not found.
      ```json
      { "message": "Voting or candidate not found." }
      ```
    - `400`: User has already voted.
      ```json
      { "message": "User has already voted in this voting." }
      ```
    - `500`: Failed to register vote.
      ```json
      { "message": "Failed to vote for the candidate." }
      ```

### **5. Get User Voting History**
- **Endpoint**: `GET /api/votings/history/:userId`
- **Description**: fetch user voting history
- **Path Parameters**:
  - `userId` (string): id of the user
- **Response**:
  - **Success**:
    ```json
    {
      "data": [
        {
          "_id": "mongodb_id",
          "name": "voting name",
          "region": "city",
          "regionName": "tg mures",
          "candidates": [
            { "_id": "mongodb_id", "name": "name1", "votes": 0, "party": "party1" },
            { "_id": "mongodb_id", "name": "name2", "votes": 2, "party": "party2" }
          ],
          "totalVotes": 2,
          "startDate": "Date()",
          "endDate": "Date",
          "voters": ["user1", "user2"]
        }
      ]
    }
    ```
  - **Errors**:
    - `404`: Failed to fetch user voting history.
      ```json
      { "message": "Failed to fetch user voting history." }
      ```
      
### **6. Image Processing**: 
- **Endpoint**: `POST /api/process-image`
- **Description**: process image
- **Request Body**:
  ```json
  {
    "image": "base64 encoded image"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Image processed successfully",
      "data": { /* Python script result */ }
    }
    ```
  - **Errors**:
    - `500`: Failed to process the image.
      ```json
       { "message": "Error processing the image." }
      ```
    - `400`: No image provided.
      ```json
      { "message": "No image provided." }
      ```

### **7. Get All Cities**
- **Endpoint**: `GET /api/cities`
- **Description**: get all cities.
- **Response**:
  - **Success**:
    ```json
    {
      "data": [
        {
          "_id": "mongodb_id",
          "name": "city_name"
        },
        {
          "_id": "mongodb_id",
          "name": "another_city_name"
        }
      ]
    }
    ```
  - **Errors**:
    - `500`: Failed to retrieve cities.
      ```json
      { "message": "Failed to fetch cities." }
      ```

### **8. Insert City**
- **Endpoint**: `POST /api/cities`
- **Description**: insert a new city.
- **Request Body**:
  ```json
  {
    "name": "city_name"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "City added successfully",
      "data": { /* City Object */ }
    }
    ```
  - **Errors**:
    - `500`: Failed to add the city.
      ```
      { "message": "Failed to add the city." }
      ```
    - `400`: City already exists.
      ```
      { "message": "City already exists." }
      ```


### **9. Get All Counties**

- **Endpoint**: `GET /api/counties`
- **Description**: get all counties.
- **Response**:
  - **Success**:
    ```json
    {
      "data": [
        {
          "_id": "mongodb_id",
          "name": "county_name"
        },
        {
          "_id": "mongodb_id",
          "name": "another_county_name"
        }
      ]
    }
    ```
  - **Errors**:
    - `500`: Failed to retrieve counties.
      ```json
      { "message": "Failed to fetch counties." }
      ```

### **10. Insert County**

- **Endpoint**: `POST /api/counties`
- **Description**: insert a new county.
- **Request Body**:
  ```json
  {
    "name": "county_name"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "County added successfully",
      "data": { /* County Object */ }
    }
    ```
  - **Errors**:
    - `500`: Failed to add the county.
      ```
      { "message": "Failed to add the county." }
      ```
    - `400`: County already exists.
      ```
      { "message": "County already exists." }
      ```



## Environment Variables
Ensure you set up the following environment variables:
MONGODB_URI=<...>


# Front-End Overview


## Installation
1. cd ./front-end/voting-app

2. npm install

3. npx expo start