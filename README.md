# JohnCenaBot
A basic discord bot written in TypeScript that will randomly join active voice calls and play a really loud John Cena audio file before leaving the call and taking one of the calls members along with it.

## Creating your own Cena Bot.
For the bot to work you need to add a config.json file inside of the src directory before compiling. The config.json file needs to be fomatted like this:

```json
{
    "DISCORD_TOKEN": "",
    "MINIMUM_MEMBERS": 2,
    "ODDS_OUT_OF_HUNDRED": 2,
    "FREQUENCY_MS": 60000,
    "COOLDOWN": 120000
}
```

`DISCORD_TOKEN` requires a discord bot token which you can generate on the discord developer dashboard, `MINIMUM_MEMBERS` is how many members need to be in a voice call for the bot to do it's thing, `ODDS_OUT_OF_HUNDRED` is the odds out of one hundred that the bot will do it's thing. `FREQUENCY_MS` is how often in milliseconds the bot will run the odds to decide whether or not it will do it's thing and finally `COOLDOWN` is how long in milliseconds it will wait after it's done it's thing before it can do it again.
