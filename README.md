# Vykas
 Vykas is reverse engineered Twitch Lost Ark Armory Extension that fetches informations about user. It shows everything that Lost Ark Armory displays on the widget. Example resposne can be found [here](https://pastebin.com/1d9Qy0Rp)
 
 ![](https://i.imgur.com/TMMVFjx.jpg)
 
 
<a href='https://ko-fi.com/santoryo' target='_blank'><img height='35' style='border:0px;height:46px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' />

##

You don't need any API keys for Twitch, all it uses is [Twitch GraphQL API](https://github.com/mauricew/twitch-graphql-api) to query extensions and if user has Armory Extension then it gets it JWT tokens and gets the data itself.

For assets such as gear, skills or tripods images you can use `https://cdn.lostark.games.aws.dev/` endpoint like:
<br>
<img src="https://cdn.lostark.games.aws.dev/EFUI_IconAtlas/HK_Skill/HK_Skill_01_19.png" height=20> `https://cdn.lostark.games.aws.dev/EFUI_IconAtlas/HK_Skill/HK_Skill_01_19.png` (Alithanes's Light)


## Development

1. Clone the project `git clone https://github.com/Santoryo/Vykas`
2. Run `npm install`
3. Create .env file with following keys
```env
PORT=8000
DB_USERNAME=root
DB_HOST=localhost
DB_PASSWORD=
DB_DATABASE=database
```
3. Run `npm run dev`


## Database
You could use any database you want although this project uses MySQL
```mysql
CREATE TABLE players (ID int UNIQUE AUTO_INCREMENT, twitchName VARCHAR(30), data JSON);
```
