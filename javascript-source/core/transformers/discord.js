/*
 * Copyright (C) 2016-2022 phantombot.github.io/PhantomBot
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function () {
    /*
     * @transformer cleardiscordactivity
     * @formula (cleardiscordactivity) removes the bots current activity in Discord, setting it to just plain Online
     * @labels twitch discord noevent presence
     * @example Caster: !addcom !cleardiscord (cleardiscordactivity)
     */
    function cleardiscordactivity() {
        $.discordAPI.resetPresence();

        return {
            result: ''
        };
    }

    /* @disabled until D4J fix is implemented
     * @//transformer setdiscordactivity
     * @//formula (setdiscordactivity str:str) sets the bots current activity in Discord to a custom string
     * @//labels twitch discord noevent presence
     * @//example Caster: !addcom !sleeping (setdiscordactivity :zzz: sleeping...)
     */
    /*function setdiscordactivity(args) {
        args.args = args.args === undefined || args.args === null ? '' : args.args.trim();
        if (args.args.length === 0) {
            return {
                result: '(setdiscordactivity an input is missing)'
            };
        }
        $.discordAPI.setCustomActivity(args.args);

        return {
            result: ''
        };
    }*/

    /*
     * @transformer setdiscordcompeting
     * @formula (setdiscordcompeting str:str) sets the bots current activity in Discord to: Competing in (str)
     * @labels twitch discord noevent presence
     * @example Caster: !addcom !lcs (setdiscordcompeting LCS)
     */
    function setdiscordcompeting(args) {
        args.args = args.args === undefined || args.args === null ? '' : args.args.trim();
        if (args.args.length === 0) {
            return {
                result: '(setdiscordcompeting an input is missing)'
            };
        }
        $.discordAPI.setCompeting(args.args);

        return {
            result: ''
        };
    }

    /*
     * @transformer setdiscordlistening
     * @formula (setdiscordlistening str:str) sets the bots current activity in Discord to: Listening to (str)
     * @labels twitch discord noevent presence
     * @example Caster: !addcom !heavymetal (setdiscordlistening Heavy Metal)
     */
    function setdiscordlistening(args) {
        args.args = args.args === undefined || args.args === null ? '' : args.args.trim();
        if (args.args.length === 0) {
            return {
                result: '(setdiscordlistening an input is missing)'
            };
        }
        $.discordAPI.setListening(args.args);

        return {
            result: ''
        };
    }

    /*
     * @transformer setdiscordwatching
     * @formula (setdiscordwatching str:str) sets the bots current activity in Discord to: Watching (str)
     * @labels twitch discord noevent presence
     * @example Caster: !addcom !movienight (setdiscordwatching Movie Night)
     */
    function setdiscordwatching(args) {
        args.args = args.args === undefined || args.args === null ? '' : args.args.trim();
        if (args.args.length === 0) {
            return {
                result: '(setdiscordwatching an input is missing)'
            };
        }
        $.discordAPI.setWatching(args.args);

        return {
            result: ''
        };
    }

    /*
     * @transformer setdiscordplaying
     * @formula (setdiscordplaying str:str) sets the bots current activity in Discord to: Playing (str)
     * @labels twitch discord noevent presence
     * @example Caster: !addcom !rocketleague (setdiscordplaying Rocket League)
     */
    function setdiscordplaying(args) {
        args.args = args.args === undefined || args.args === null ? '' : args.args.trim();
        if (args.args.length === 0) {
            return {
                result: '(setdiscordplaying an input is missing)'
            };
        }
        $.discordAPI.setPlaying(args.args);

        return {
            result: ''
        };
    }

    /*
     * @transformer setdiscordstreaming
     * @formula (setdiscordstreaming url:str str:str) sets the bots current activity in Discord to: &lt;a href="(url)"&gt;Streaming (str)&lt;/a&gt;
     * @labels twitch discord noevent presence
     * @example Caster: !addcom !dontstarve (setdiscordstreaming https://twitch.tv/CoolStreamer Don't Starve)
     * @notes Only urls starting with `https://twitch.tv/` and `https://youtube.com/` will work
     */
    function setdiscordstreaming(args) {
        var pargs = $.parseArgs(args.args, ' ', 2, true);
        if (pargs.length !== 2) {
            return {
                result: '(setdiscordstreaming an input is missing)'
            };
        }
        $.discordAPI.setStreaming(pargs[1], pargs[0]);

        return {
            result: ''
        };
    }

    /*
     * @transformer setrole
     * @formula (setrole username:str, role:str) adds the specified user to the specified Discord role
     * @labels discord noevent roles
     * @example Caster: !addcom !coolrole (setrole (sender), Cool Kids)
     */
    function setrole(args) {
        var pargs = $.parseArgs(args.args, ',', 2, true);
        if (pargs.length !== 2) {
            return {
                result: '(setrole an input is missing)'
            };
        }
        $.discord.setRole(pargs[1], pargs[0]);

        return {
            result: ''
        };
    }

    var transformers = [
        new $.transformers.transformer('cleardiscordactivity', ['twitch', 'discord', 'noevent', 'presence'], cleardiscordactivity),
        //new $.transformers.transformer('setdiscordactivity', ['twitch', 'discord', 'noevent', 'presence'], setdiscordactivity),
        new $.transformers.transformer('setdiscordcompeting', ['twitch', 'discord', 'noevent', 'presence'], setdiscordcompeting),
        new $.transformers.transformer('setdiscordlistening', ['twitch', 'discord', 'noevent', 'presence'], setdiscordlistening),
        new $.transformers.transformer('setdiscordwatching', ['twitch', 'discord', 'noevent', 'presence'], setdiscordwatching),
        new $.transformers.transformer('setdiscordplaying', ['twitch', 'discord', 'noevent', 'presence'], setdiscordplaying),
        new $.transformers.transformer('setdiscordstreaming', ['twitch', 'discord', 'noevent', 'presence'], setdiscordstreaming),
        new $.transformers.transformer('setrole', ['discord', 'noevent', 'presence'], setrole)
    ];

    $.transformers.addTransformers(transformers);
})();