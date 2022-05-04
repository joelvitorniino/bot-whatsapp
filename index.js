const { create, Client, decryptMedia, ev, SimpleListener, smartUserAgent, NotificationLanguage } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHndlr')
const options = require('./options')
const { help } = require('./lib/help')

//const WEBHOOK_ADDRESS = 'https://en6p3ti7f72f9jz.m.pipedream.net'

const start = async (client = new Client()) => {

        console.log('[SERVER] Servidor iniciado!')

        client.onStateChanged((state) => {
            console.log('[Status do cliente]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
        })

        // listening on message
        client.onMessage((async (message) => {

            client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    client.cutMsgCache()
                }
            })

            msgHandler(client, message)

        }))
        
        client.onButton((async (chat ) => {
        
            switch (chat?.body) {
                case 'Menu do bot':
                        await client.sendText(chat?.chatId, help)
                    break;
            
                case 'Quem sou eu?':
            	        await client.sendText(chat?.chatId, `Eu sou um bot, me chamo Bruce, foi desenvolvido pelo Jhon, meu codigo está disponível pra download em https://github.com/jhowbhz/bot-whatsapp`)
                    break;
            }

        }))

}

create(options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))
