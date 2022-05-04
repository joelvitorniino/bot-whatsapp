const { create, Client, decryptMedia, ev, SimpleListener, smartUserAgent, NotificationLanguage } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHndlr')
const options = require('./options')
const { help } = require('./lib/help')
import { Boom } from '@hapi/boom';
import MAIN_LOGGER from './src/Utils/logger';

//const WEBHOOK_ADDRESS = 'https://en6p3ti7f72f9jz.m.pipedream.net'

import makeWASocket, { DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, useSingleFileAuthState } from '@adiwajshing/baileys';

const logger = MAIN_LOGGER.child({ })

logger.level = 'trace'

const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')

const store = useStore ? makeInMemoryStore({ logger }) : undefined

// save every 10s
setInterval(() => {
	store?.writeToFile('./baileys_store_multi.json')
}, 10_000)

const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json')

const startSock = async () => {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const sock = makeWASocket({
        version,
        logger,
        printQRInTerminal: true,
        auth: state,
        // implement to handle retries
        getMessage: async key => {
            return {
                conversation: 'hello'
            }
        }
    });

    store?.bind(sock.ev)

    sock.ev.on('chats.set', item => console.log(`recv ${item.chats.length} chats (is latest: ${item.isLatest})`))
	sock.ev.on('messages.set', item => console.log(`recv ${item.messages.length} messages (is latest: ${item.isLatest})`))
	sock.ev.on('contacts.set', item => console.log(`recv ${item.contacts.length} contacts`))

	sock.ev.on('messages.upsert', async m => {
        if(m.messages[0].message.conversation === 'eae') {
            await sock.sendMessage(m.messages[0].key.remoteJid, { text: 'Eae!' });
        }
	})

	sock.ev.on('messages.update', m => console.log(m))
	sock.ev.on('message-receipt.update', m => console.log(m))
	sock.ev.on('presence.update', m => console.log(m))
	sock.ev.on('chats.update', m => console.log(m))
	sock.ev.on('contacts.upsert', m => console.log(m))

	sock.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if(connection === 'close') {
			// reconnect if not logged out
			if((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
				startSock()
			} else {
				console.log('Connection closed. You are logged out.')
			}
		}

		console.log('connection update', update)
	})
	// listen for when the auth credentials is updated
	sock.ev.on('creds.update', saveState)

	return sock
};

startSock();

// const start = async (client = new Client()) => {

//         console.log('[SERVER] Servidor iniciado!')

//         client.onStateChanged((state) => {
//             console.log('[Status do cliente]', state)
//             if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
//         })

//         // listening on message
//         client.onMessage((async (message) => {

//             client.getAmountOfLoadedMessages()
//             .then((msg) => {
//                 if (msg >= 3000) {
//                     client.cutMsgCache()
//                 }
//             })

//             msgHandler(client, message)

//         }))
        
//         client.onButton((async (chat ) => {
        
//             switch (chat?.body) {
//                 case 'Menu do bot':
//                         await client.sendText(chat?.chatId, help)
//                     break;
            
//                 case 'Quem sou eu?':
//             	        await client.sendText(chat?.chatId, `Eu sou um bot, me chamo Bruce, foi desenvolvido pelo Jhon, meu codigo está disponível pra download em https://github.com/jhowbhz/bot-whatsapp`)
//                     break;
//             }

//         }))

// }

// create(options(true, start))
//     .then(client => start(client))
//     .catch((error) => console.log(error))
