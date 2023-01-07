![Logo](https://cdn.discordapp.com/attachments/1050946434498830448/1061113828441587802/githubLogo.png)
[![Discord](https://img.shields.io/discord/1034695813026283580?color=%235865F2&label=Discord&logo=Discord)](https://discord.gg/DuMJjretE2)
![Version](https://img.shields.io/badge/version-1.0.0-ff69b4)

- [About](#about)
- [Issues and Excuses](#issues-and-excuses)
- [Features](#current-features)
- [Planned Features](#upcoming-features)
- [License](#license)
- [Authors](#authors)

# About

Hi, Hello.
https://www.macaquariums.com was a commission an IRL coworker asked of me in order for him to take his business online. He had no coding experience and wanted to learn 
little to none. In order to accomidate his request I programmed an entire backend/user interface that he could use to control his website as if he was controlling something 
similar that he might have used online, such as Facebook or Instagram. The website layout he wanted to be heavily focused on photos, so I designed the layout to look similar 
to websites like Pinterest.

Also, he wanted the website to be free. (Except for my commission costs)

Initially, I thought he was asking for a bit much, but also, I had been meaning to learn Firebase, and I figured if I am going to spend time learning something, might 
be worthwhile to apply it towards and actual project.

After about a month of work, the website is live and is ready for him to use. How the front end looks is entirely dependant on how many posts the client creates.

Below are a few screenshots.

Ok, bye.

### Backend Screenshot

![image](https://user-images.githubusercontent.com/58434823/211128583-889d9f6c-d48a-43bf-baa7-26522f061425.png)

# Issues and Excuses

-   Issue # 1 - LarryBot and the no good very bad code.
      Larry, the sentient hygiene god of the server, has taken life in the form of a real-time response every time someone types "//larry".
      Sounds cool I'm sure, the issue?
      As you could probably tell "//larry" is not a "conventional" slash command that you might see on Discord.
      Instead, so Larry could be interactive and responsive, ChaosBot constantly looks through each message for "//larry"
      This causes optimization issues.
      
      This means an event inside of ChaosBot fires everytime a message is sent in the Discord.
      
      This is not good code, and there is better ways to do this, we know.
      But this was a joint decision between Phwee and I.
      The magic of Larry is his responsiveness and making him a slash command would have taken away some of the magic.

## Current Features

-   Role Creation and Filtering based on other roles.
-   Coin Flip Feature.
-   Larry.
-   8-Ball Feature.
-   Christmas command that counts down the days until Christmas.
-   Internal slash command control features.
-   Context Menu "Hello" command.

## Upcoming Features

-   Embed for listing commands

### License

-   [MIT](https://choosealicense.com/licenses/mit/)

### Authors

-   [BearTheCoder](https://www.youtube.com/channel/UCWg8LAQk6NLQfj4Wr3zImKA)
-   [PhweedomStudios](https://phwee.carrd.co/)

