(function(Scratch) {
    'use strict';

    class CookieDataStorage {
        getInfo() {
            return {
                id: 'cookieDataStorage',
                name: 'Cookies',
                description: 'Store Cookies!',
                blocks: [
                    {
                        opcode: 'setCookie',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set cookie [NAME] to [VALUE] for [DAYS] days',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'username'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'value'
                            },
                            DAYS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 365 * 20
                            }
                        }
                    },
                    {
                        opcode: 'getCookie',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get cookie [NAME]',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'username'
                            }
                        }
                    },
                    {
                        opcode: 'deleteCookie',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete cookie [NAME]',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'username'
                            }
                        }
                    }
                ]
            };
        }

        setCookie(args) {
            const name = args.NAME;
            const value = args.VALUE;
            const days = args.DAYS || (365 * 20);

            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }

            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        getCookie(args) {
            const name = args.NAME + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        deleteCookie(args) {
            const name = args.NAME;
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }

    Scratch.extensions.register(new CookieDataStorage());
})(Scratch);
