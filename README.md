# JohnCenaBot
## Description
A basic discord bot written in TypeScript that will randomly join active voice calls and play a really loud John Cena audio file before leaving the call and taking one of the calls members along with it.

## Creating your own Cena Bot
### Software Requirements
* Node.js
* FFmpeg
* TypeScript

### Installing npm modules
Run the command `npm install` in the bot directory to install all the required npm modules.

### Creating a config file
For the bot to work you need to add a config.json file inside of the src directory before compiling. 
The config.json file needs to be fomatted like this:

```json
{
    "DISCORD_TOKEN": "",
    "MIN_MEMBERS": 2,
    "ODDS_OUT_OF_HUNDRED": 2,
    "FREQUENCY_MS": 180000,
    "MIN_COOLDOWN": 600000,
    "MAX_COOLDOWN": 2400000
}
```

`DISCORD_TOKEN` requires a discord bot token which you can generate on the discord developer dashboard, `MIN_MEMBERS` is how many members need to be in a voice call for the bot to do it's thing, `ODDS_OUT_OF_HUNDRED` is the odds out of one hundred that the bot will do it's thing. `FREQUENCY_MS` is how often in milliseconds the bot will run the odds to decide whether or not it will do it's thing and finally `MIN_COOLDOWN` and `MAX_COOLDOWN` are the times in milliseconds used to generate a random cooldown in milliseconds it will wait after it's done it's thing before it can do it again.

### Compiling the code
With typescript installed you should be able to run the `npm run build` command in the bot directory to compile the typescript into javascript.

### Running the code
Once the code is compiled you can run `node ./dist/index.js` or start it up using your process manager of choice.

If you intend on developing the code further, I highly recommend using npm to download the ts-node and nodemon modules. ts-node will allow you to run the typescript code without using the typescript compiler every time. nodemon will restart the program for you when you make changes to the code. With ts-node and nodemon installed you can use `npm run dev` to start the program in a developer friendly mode.
