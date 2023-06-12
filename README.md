
# LangCollect

## [Live Site](https://lang-collect.onrender.com)

<img width='742' src='https://i.ibb.co/NtL0Ds4/lang.png](https://i.ibb.co/2q1HM4D/lang2.png'>




## Getting started
1. Clone this repository 

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This repo organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development cd into the react directory npm install then run npm start


