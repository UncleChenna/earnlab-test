# Project Title

Earnlab test

This project aims to develop a robust RESTful API service for managing blog posts using NestJS, TypeORM/Postgres, and Redis. The primary focus is on creating and reading blog posts, with the added functionality of Redis caching to enhance read performance.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Overview

- Create Blog Posts: Users can easily create new blog posts by submitting relevant information such as title, content, and author details.

- Retrieve All Blog Posts: The API provides endpoints for retrieving a list of all blog posts, complete with pagination support for seamless navigation.

- Retrieve Single Blog Post: Users can fetch individual blog posts by their unique identifier, facilitating easy access to specific content.

- Data Persistence: Blog posts are stored securely in a PostgreSQL database using TypeORM, ensuring data integrity and reliability.

- Caching for Performance: Redis caching is employed to enhance read performance, caching the results of certain endpoints for improved responsiveness.

## Installation

Before starting the installation process, ensure you have the following prerequisites installed:

Node.js and npm: Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install Node.js from the official website: Node.js Downloads.

PostgreSQL: Install PostgreSQL database server on your machine. You can download and install PostgreSQL from the official website: PostgreSQL Downloads.

Redis: Install Redis server on your machine. You can download and install Redis from the official website: Redis Downloads.

Installation Steps
Follow these steps to install and set up the Blog Management RESTful API:

Clone the Repository: Clone the repository containing the source code of the API to your local machine.

git clone (https://github.com/UncleChenna/earnlab-test.git)

make sure you have the enviroment variables, check example-env to find the variables you need

cd earnlab-test

npm/yarn install

npm/yarn run start:dev

## Usage

Instructions for using the application, including environment variables and configuration.

## Project Structure

Explanation of the project structure and the purpose of each directory.

- `src`: Contains the source code of the application.
- `test`: Contains the test files for the application.
- `src/modules`: Contains the the modules for the application, in this case just the [ Blog ] module.
- `src/database`: Contains database setups, migration and seeder

## API Documentation

Link to or embed the Swagger documentation for the API.

Swagger documentation: http://127.0.0.1:8080/api/documentation

## Running Tests

Instructions for running tests, including unit tests, integration tests, or end-to-end tests.

to run tests: use the following command

unit test - npm/yarn run test
e2e test - npm/yarn run test:e2e
