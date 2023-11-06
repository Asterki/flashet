
![Logo](https://i.imgur.com/GDtORON.png)


# Flashet

App created to help you study for your exams using the flashcard technique. Made in Next.js and heavily inspired in Anki



## Current And Planned Features

- Google Authentication
- Syncing across devices
- PWA support
- Cross platform
- Statistics and track of study sessions
- Built-in pomodoro


## Run Locally

Before you run you must have the following:
- A MongoDB 4.4 server running
- A Redis 7.2 server running
- Have set the necessary environment variables

Once you're done with that, you can proceed to run the project locally

Clone the project

```bash
  git clone https://github.com/Asterki/flashet
```

Go to the project directory

```bash
  cd flashset
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`SESSION_SECRET`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`MONGODB_URI`

There is also an .env.example file that you can base yourself off
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@Asterki](https://www.github.com/Asterki)


## License

[MIT](https://choosealicense.com/licenses/mit/)

