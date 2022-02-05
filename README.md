# Storefront Backend Project

## Table of Contents

* [Description](#Description)
* [Prerequisites](#Prerequisites)
* [Instructions](#Instructions)

## Description

This is a boilerplate Project for Typescript.
It features the use of **Typescript**, **Sequelize**, **PostgreSQL**, **Jasmine**, **Winston & Morgan**, **Joi**, and **Eslint**.

## Prerequisites
Your machine must have the following installed on it:
- [Node/NPM](https://nodejs.org/en/download/) (v16 or higher)

## Instructions

### 1. Install Dependencies
After Cloning the project, head inside the project folder and run
```
npm install
```

### 2.  DB Creation and Migrations
```
cp .env.example .env
```
Now, replace .env with your credentials and then run

``` 
npm run migrate:up
```

### 3. Starting the project
```
npm start
```

### 4. Running the tests
```
npm test
```

Any by now you should be able to go to `localhost:3000` to test that everything is working as expected.