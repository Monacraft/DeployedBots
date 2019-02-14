// Welcome to the code, remember to keep a seperate copy for public and dev build
// For any queries, contact Monacraft

const Discord = require("discord.js");
const medBot = new Discord.Client();
var fs = require('fs');

// Build in ID's
var myID = '397363815861452801';
var devID = '130568487679688704';
var guildID = '285213646244806656';
var lastMessageID = '';
var oldMessage = '';
var shutdown = false;
var accept = '✅';
var fail = '❌';
var stored = {};
var roles = [];
var roleMedicine = '';
var roleMedButNotUnsw = '';
var roleJustJoined = '';
var roleUnswElder = '';
var collegeA = '';
var collegeB = '';
var collegeC = '';
var collegeD = '';
var role_1 = '';
var role_2 = '';
var role_3 = '';
var fun_GameNights = '';
var fun_Minecraft = '';

var welcomeID = '400133865487990804';

var numbers = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];

var plus = '➕';
var hospital = '🏥';
var ok = '👌';
var dice = '🎲';

var welcome = [`
__**\`Welcome To UNSW Medicine Discord\`**__
Play games, ask questions or get a little study done ;)


Before that, why don't you fill me in on who you are:

   ${numbers[1]}  - 1st Year UNSW Med Student
   ${numbers[2]}  - 2nd Year UNSW Med Student
   ${numbers[3]}  - 3rd Year UNSW Med Student
   ${plus}  - Phase 3 UNSW Med Student
   ${hospital}  - Medicine but not at UNSW
   ${ok}  - I don't do medicine, but thanks for asking

Select one please (Step 1 of 3):
 `, `
We have removed support for colleges in the discord now.
Please contact Monacraft if you get this message
`, `
Ok!
Finally, would you like to be tagged for game nights?
These are occasional online events we hold like poker, .io games, minecraft and more

React ${dice} if you would like to notified for them.
Otherwise react ${fail} (Step 2 of 3)
`, `
Hope you enjoy your stay!
Here are my commands:
\`\`\` - m!help                     These Commands :P
 - m!avatar [username]        Send's that persons profile pic
 - m!dates                    Academic Calendar for UNSW Med

Bot made by Jash. These commands were implemented by Preetham.
\`\`\`
FINISHED!
If you ever have to change your roles, just message an admin.
`, `
__**We hope you enjoy your stay:**__

To get access to the other channels, please react appropriately to me in your private messages.
If you have blocked private messages, change that setting, and re-join the discord.

Here is a permanent invite link: https://discord.gg/Uf3v2wG
Feel free to ask any questions in #general or pm an Admin.
`];


medBot.on('error', console.error);

medBot.on('ready', () => {
    medBot.user.setGame("Welcome to UNSW Medicine");
    console.log(`Logged in as ${medBot.user.tag}!`);

    welcomeChannel = medBot.guilds.get(guildID).channels.get(welcomeID);
    medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessages({ limit: 10 }).then(
        messages => {
            messages.map(function (obj) {
                if (obj.content.substring(0, 9) === welcome[4].substring(1, 10) && obj.author.id === myID) {
                    medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessage(obj.id).then(
                        msg => {
                            // msg.delete();
                        }
                    ).catch(console.error)
                }
            });
        }
    ).catch(console.error);

    roleMedicine = medBot.guilds.get(guildID).roles.find('name', 'Medicine').id;
    roleMedButNotUnsw = medBot.guilds.get(guildID).roles.find('name', 'MedbutnotUNSW').id;
    roleNotMed = medBot.guilds.get(guildID).roles.find('name', 'Normies').id;
    roleUnswElder = medBot.guilds.get(guildID).roles.find('name', 'Phase 3').id;
    role_1 = medBot.guilds.get(guildID).roles.find('name', '1st Year').id;
    role_2 = medBot.guilds.get(guildID).roles.find('name', '2nd Year').id;
    role_3 = medBot.guilds.get(guildID).roles.find('name', '3rd Year').id;

    fun_GameNights = medBot.guilds.get(guildID).roles.find('name', 'gamenights').id;
    //medBot.guilds.get(guildID).channels.get(welcomeID).send(welcome[4]);
});

var pongCount = 0;
medBot.on('message', msg => {
    if (msg.author.id === devID) {
        // This ID is set to Monacraft's ID
        // Dev Commands
        if (msg.content === 'm!ping') {
            pongCount = 0;
        }
    }
    if (msg.content === "m!avatar") {
        if (msg.author.avatarURL === null || undefined) {
            msg.reply("You do not have an avatar!");
        }
        else {
            msg.reply(msg.author.avatarURL);
        }
    }
    if (msg.content === 'm!ping') {
        pongCount++;
        if (pongCount < 3) {
            msg.reply('Pong!');
        }
    }
    if (msg.content === "m!dates") {
        msg.reply("Key Dates: https://cdn.discordapp.com/attachments/399907273310208001/400135192062459905/unknown.png");
    }
    if (msg.content.toLowerCase() === "uwu") {
     msg.channel.send(" ", { file: "https://cdn.discordapp.com/attachments/285215702774972427/485404754382553098/40591901_10155708527450869_8535339261245784064_n.jpg" });
   }
    if (msg.author.id === myID) {
        if (shutdown) {
            process.exit();
        }
    }
    if (msg.content.substr(0, 3).toLowerCase() === ".e ") {
        var s1 = msg.content.split(':');
        try {
            var s2 = s1[2].split('>');

            var emoji = client.emojis.get(s2[0]);
            msg.channel.send({
                files: [
                    {
                        attachment: emoji.url,
                        name: emoji.name + '.png'
                    }
                ]
            });
            msg.delete();
        } catch (err) {
            console.log("Error: " + msg.content);
        }
    }
    if (msg.content === "m!test") {
        medBot.channels.get("400133865487990804").send("⭐ Hello " + msg.author + " and Welcome to the UNSW Medicine Discord!");
        msg.author.send("For the following messages, react options will appear one-by-one and possibly out of order: ").then(
            msg.author.send(welcome[0]).then(message => {
                message.react(numbers[1]);
                message.react(numbers[2]);
                message.react(numbers[3]);
                message.react(plus);
                message.react(hospital);
                message.react(ok);
            })
        );
    }
    if (msg.channel.type === "dm") {
        if (msg.author.id !== myID) {
            console.log(msg.content);
        }
    }
});

medBot.on('messageReactionAdd', (react, user) => {
    //console.log(user.id + ":" + myID + ":" + react.emoji.name);
    if (user.id !== myID) {
        if (react.message.content.substring(0, 19) === welcome[0].substring(1, 20)) {
            var med = false;
            if (react.emoji.name === numbers[1]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_1);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[2]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_2);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === numbers[3]) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(role_3);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === hospital) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedButNotUnsw);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleNotMed);
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });                
            }
            if (react.emoji.name === plus) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleUnswElder);
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleMedicine);
                med = true;
            }
            if (react.emoji.name === ok) {
                react.message.delete();
                medBot.guilds.get(guildID).members.get(user.id).addRole(roleNotMed);
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });
            }
            if (med) {
                react.message.delete();
                // Used to handle college roles here
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });
            }
        }
        //console.log(react.message.content.substring(0, 19) + ":" + welcome[1].substring(1, 20));
        /*if (react.message.content.substring(0, 19) === welcome[1].substring(1, 20)) {
            //console.log("Yes");
            var college = false;
            if (react.emoji.name === reactA) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(collegeA);
                college = true;
            }
            if (react.emoji.name === reactB) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(collegeB);
                college = true;
            }
            if (react.emoji.name === reactC) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(collegeC);
                college = true;
            }
            if (react.emoji.name === reactD) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(collegeD);
                college = true;
            }
            if (college) {
                react.message.delete();
                react.message.channel.send(welcome[2]).then(sentMessage => {
                    sentMessage.react(dice);
                    sentMessage.react(fail);
                });
            }
        }*/
        if (react.message.content.substring(0, 19) === welcome[2].substring(1, 20)) {
            var done = false;
            if (react.emoji.name === dice) {
                medBot.guilds.get(guildID).members.get(user.id).addRole(fun_GameNights);
                done = true;
            }
            if (react.emoji.name === fail) {
                done = true;
            }
            if (done) {
                react.message.delete();
                react.message.channel.send(welcome[3]);
            }
        }
    }
});

medBot.on('guildMemberAdd', member => {
    if (member.guild.id === guildID) {
        medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessages({ limit: 4 }).then(
            messages => {
                messages.map(function (obj) {
                    if (obj.content.substring(0, 9) === welcome[4].substring(1, 10) && obj.author.id === myID) {
                        medBot.guilds.get(guildID).channels.get(welcomeID).fetchMessage(obj.id).then(
                            msg => {
                                msg.delete();
                            }
                        ).catch(console.error)
                    }
                });
            });
        medBot.channels.get(welcomeID).send("⭐ Hello " + member.user + " and Welcome to the UNSW Medicine Discord!").then(message => {
            medBot.channels.get(welcomeID).send(welcome[4]);
        });
        member.user.send("For the following messages, react options will appear one-by-one and possibly out of order: ").then(
            member.user.send(welcome[0]).then(message => {
                message.react(numbers[1]);
                message.react(numbers[2]);
                message.react(numbers[3]);
                message.react(plus);
                message.react(hospital);
                message.react(ok);
            })
        );
    }
});

medBot.login(process.env.MED_TOKEN);

// Welcome to the code, remember to keep a seperate copy for public and dev build
// Yours Truly, Monacraft

const Discord2 = require("discord.js");
const mkaBot = new Discord2.Client();
var mk_myID = '396672130479161354';
var devID = '130568487679688704';
var fs = require('fs');

var mk_welcomeChannel = ''; // actual = '389198025530015754'; // devtest ='396668459053744131';
var mk_guildID = ''; // actual = '237582214525616129'; // devtest = '396668459053744128';
var mk_lastMessageID = '';
var mk_started = 0;
var mk_oldMessage = '';
var mk_shutdown = false;
var mk_devUser;
var mk_rolePending = '';
var mk_rolePendingName = 'Membership Pending';
var mk_roleAccept = '';
var mk_roleAcceptName = 'MKA Member';
var accept = '✅';
var fail = '❌';
var mk_notAccepted = [];
var kickedCount = 0;
var acceptedCount = 0;

var acceptText = "I will not ask or offer medical advice";
var acceptMsg = accept + " Congrats! You're now a member of the discord"
var failMsg = fail + ' Error... Please type letter for letter: `' + acceptText + '`';
var welcomeText = `
__** Important Information: **__

You have 10 minutes before you can interact with the members.
Please take this time to read through the #rules_faq and fill out this little form that will help us in assigning you a role as well as help us find an appropriate time for all to hold the discussions.
http://goo.gl/forms/uLAYS1UfKPUSEwxY2

Summary of rules:
1. Asking for **medical advice**, whether through DMs or by asking them over here, is **strictly prohibited** and will **not** be tolerated. Any user who does so will be **immediately banned**.
2. Any member who does **not** fill the form will be kicked within **24 hours** of joining.
3. Please be **respectful of others**, and do not use foul language.

IF YOU ARE EXPERIENCING A SERIOUS, RAPIDLY WORSENING, OR POTENTIALLY LIFE THREATENING SYMPTOMS, PLEASE CALL *911* OR VISIT THE ER.

By entering this server, you accept that this agreement represents the entire understanding between you and the lead moderators concerning the use of this server.
`
var dmText = `
\`\`\`md
Hello again :)
This message is to stress the importance of not <asking> or <giving> medical advice on our discord.
<Note: giving medical consultation over the internet is highly irresponsible and unethical practice, ultimately placing patients in danger>

IF YOU <UNDERSTAND> and <ACCEPT> THIS, please type /* "${acceptText}" * (without the quotes)
IF you do not receive the confirmation response, you will be autokicked in /* 24 hours. *
\`\`\`
`


mkaBot.on('error', console.error);

mkaBot.on('ready', () => {
    mkaBot.user.setActivity("Welcome to the MKA");
    console.log(`Logged in as ${mkaBot.user.tag}!`);


    mk_devUser = mkaBot.users.get(devID);
    mk_guildID = '237582214525616129'
    storedGuild = mkaBot.guilds.get(mk_guildID);
    mk_welcomeChannel = mkaBot.guilds.get(mk_guildID).channels.get('389198025530015754');
    mkaBot.guilds.get('237582214525616129').channels.get('389198025530015754').fetchMessages({ limit: 10 }).then(
        messages => {
            messages.map(function (obj) {
                if (obj.content.substring(0, 9) === welcomeText.substring(1, 10) && obj.author.id === mk_myID) {
                    mkaBot.guilds.get('237582214525616129').channels.get('389198025530015754').fetchMessage(obj.id).then(
                        msg => {
                            msg.delete();
                        }
                    ).catch(console.error)
                }
            })
        }
    ).catch(console.error);
    // message.guild.channels.find("name", "channel-name");
    console.log(mk_devUser.username);
    roles = storedGuild.roles.array();
    //console.log(roles);
    for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === mk_rolePendingName) {
            mk_rolePending = roles[i].id;
            console.log(roles[i].name + ": " + mk_rolePending)
        }
        if (roles[i].name === mk_roleAcceptName) {
            mk_roleAccept = roles[i].id;
            console.log(roles[i].name + ": " + mk_roleAccept)
        }
    }
    mk_welcomeChannel.send("Starting Welcome Log");

});

function autoKick(memberID) {
    for (var i = 0; i < mk_notAccepted.length; i++) {
        if (mk_notAccepted[i] === memberID) {
            var mem = mkaBot.guilds.get(mk_guildID).members.get(memberID);
            if (mkaBot.guilds.get(mk_guildID).members.get(memberID) !== undefined) {
                if (mkaBot.guilds.get(mk_guildID).members.get(memberID).roles.get(mk_rolePending) !== undefined) {
                    console.log("Autokicking: " + mem.user.username + " - " + mem.id);
                    mem.kick("You did not accept the terms and condition (please react tick next time)");
                    kickedCount += 1;
                    console.log("Kicked Count: " + kickedCount);
                } else {
                    console.log(mem.id + ", role manuanly removed");
                }
                mk_notAccepted.splice(i, 1);
            }
        }
    }
    console.log("Not Accepted Count: " + mk_notAccepted.length);
}


var storedGuild;
mkaBot.on('message', msg => {
    if (msg.content === "!stats") {
        msg.reply(
            `Bot Stat's (Reset every 24 hours): 
\`\`\`ml
 - Number Autokicked:   ${kickedCount}
 - Number Accepted:     ${acceptedCount}
 - Number Length:       ${leftCount}
 - Number Pending:      [Autokicking is disabled]
\`\`\``);
        msg.delete();
    }
    if(msg.content.substr(0, 5) === '!warn') {
        if(msg.channel.id === '351663304978071552') {
            var target = msg.content.substr(6);
        }
    }
    if (msg.author.id === devID) {
        // This ID is set to Monacraft's ID
        // Dev Commands
        if (msg.content === '!mk_shutdown') {
            if (msg.author.id === devID) {
                mk_shutdown = true;
                msg.reply("Goodbye :')");
            }
        }
        if (msg.content === '!start' && mk_started === 0) {
        }
        if (msg.content === '!ping') {
            msg.reply('Pong!')
        }
        if (msg.content === "!checkrole") {
            console.log(mkaBot.guilds.get(mk_guildID).members.get(devID).roles.get(mk_rolePending) !== undefined);
            console.log(mkaBot.guilds.get(mk_guildID).members.get(devID).roles.get('21231313'));
            console.log(mkaBot.guilds.get(mk_guildID).members.get(devID).roles.get(mk_roleAccept));
        }
        if (msg.content === "!test") {
            console.log('Test Welcome... ' + mk_devUser.username + " with ID: " + mk_devUser.id);

            var guild = mkaBot.guilds.get(mk_guildID);

            msg.guild.fetchMember(msg.author.id).then(member => {
                member.addRole(mk_rolePending);
                //mk_notAccepted.push(member.user.id);
                //console.log("Not Accepted Count: " + mk_notAccepted.length);
                console.log("Would autokick");
            });
            //setTimeout(autoKick, 60000 * 2, member.user.id);
            mk_welcomeChannel.send(`⭐ Hello ${msg.author.username} and welcome to the Medical Knowledge Association!`);
            mk_welcomeChannel.send("Welcome Log");
            msg.author.send(dmText);
            msg.delete();
        }
    }
    if (msg.author.id === mk_myID) {
        if (mk_shutdown) {
            process.exit();
        }
        if (msg.content === "Starting Welcome Log") {
            mk_started = 1;
            msg.edit(welcomeText + '\nAwaiting New Members...');
            mk_lastMessageID = msg.id;
        }
        if (msg.content === "Welcome Log") {
            msg.channel.fetchMessage(mk_lastMessageID).then(message => {
                message.delete();
            }).catch(err => {
                console.log(err);
            })
            msg.edit(welcomeText);
            mk_lastMessageID = msg.id;
        }
    }
    if (mk_started === 1 && msg.channel.type === "dm") {
        var exec = false;
        if (msg.author.id !== mk_myID) {
            if (msg.content === acceptText) {
                exec = true;
                mkaBot.guilds.get(mk_guildID).fetchMember(msg.author.id).then(member => {
                    member.removeRole(mk_rolePending);
                    console.log(member.user.username + " accepted conditions");
                    member.addRole(mk_roleAccept);
                    acceptedCount++;
                    msg.author.send(acceptMsg);
                });
            } else {
                if (!exec) {
                    msg.author.send(failMsg);
                }
            }
        }
    }
});
mkaBot.on('guildMemberAdd', member => {
    if (member.guild.id === mk_guildID) {
        if (mk_started === 1) {
            console.log('Welcoming... ' + member.user.username + " with ID: " + member.user.id);

            member.addRole(mk_rolePending);
            // mk_notAccepted.push(member.user.id);
            //console.log("Not Accepted Count: " + mk_notAccepted.length);

            //setTimeout(autoKick, 60000 * 60, member.user.id);

            mk_welcomeChannel.send(`⭐ Hello ${member.user} and welcome to the Medical Knowledge Association!`);
            mk_welcomeChannel.send("Welcome Log");

            member.user.send(dmText);

        } else {
            console.log('Someone joined but I was not mk_started: ' + member.user.username + " : " + member.user.id);
        }
    }
});

var leftCount = 0;
mkaBot.on('guildMemberRemove', member => {
    if (mk_started === 1) {

        var guild = mkaBot.guilds.get(mk_guildID);
        var removeAt = -1;
        /*for (var i = 0; i < mk_notAccepted.length; i++) {
            if(mk_notAccepted[i] === member.user.id) {
                leftCount ++;
                removeAt = i;
            }
        }
        if(removeAt > 0) {
            mk_notAccepted.splice(removeAt, 1);
            leftCount++;*/
        console.log("Someone left");
        leftCount++;
        // }
        //console.log("Not Accepted Count: " + mk_notAccepted.length);

    } else {
        console.log('Someone left but I was not mk_started: ' + member.user.username + " : " + member.user.id);
    }
});

/*
mkaBot.on('messageReactionAdd', react => {
    if (react.message.channel.id === mk_welcomeChannel) {
        if (react.emoji.name === accept) {
            react.users.map(function (r) {
                for (var a = 0; a < mk_notAccepted.length; a++) {
                    //console.log(r.id + " : " + mk_notAccepted[a]);
                    if (r.id === mk_notAccepted[a]) {
                        //var m = react.message.guild.members.get(r[u].id);
                        react.message.guild.fetchMember(r.id).then(member => {
                            member.removeRole(mk_rolePending);
                            console.log(member.user.username + " accepted conditions");
                            member.addRole(mk_roleAccept);
                        });
                        mk_notAccepted.splice(a, 1);
                    }
                }
            });
            console.log("Not Accepted Count: " + mk_notAccepted.length);
        }
    }
});
*/

/*
fs.readFile('..\\MKABot.token', 'utf8', function (err, data) {
    if (err) throw err;
    token = data;
    mkaBot.login(token);
});
*/

mkaBot.login(process.env.MKA_TOKEN);
