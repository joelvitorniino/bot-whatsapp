const showAll = `*Ver tudo?*
Manda um _!help_`;

function help() {
	return `
*=== Menu do BOT! ===*

Opa! Eu faço muitas coisas.
escolha uma das categorias:

*# Áudios do bot* 🔈
Manda _!help audios_

*# Figurinhas* 📄
Manda _!help figurinhas_

*# Bater-papo* 🧑🏾‍🤝‍🧑🏽
Manda _!help papo_

*# Outros comandos* 📚
Manda _!help outros_

*# Para grupos* 📚
Manda _!help grupos_

*# Consultas* 👨‍💻
Manda _!help consultas_
----------------------
╿
╿
╰╼ Sou Bruce, o bot do Kauã! `;
}

const helpers = {
	help: help(),
	helpAudios: helpAudios(),
	helpFigurinhas: helpFigurinhas(),
	helpPapo: helpPapo(),
	helpOutros: helpOutros(),
	helpGrupos: helpGrupos(),
	helpConsultas: helpConsultas(),
	readme: readme()
}

function helpAudios() {
	return `
*=== Áudios do BOT! ===*

▫️ toca o berrante
▫️ trem bala
▫️ bom dia
▫️ acorda
▫️ acorda corno
▫️ vamos acordar

${showAll}`;
}

function helpFigurinhas() {
	return `
*=== Figurinhas do BOT! ===*

▫️ Figurinha comum:
  Mande uma foto e digite _!s_ na legenda
▫️ Figurinha animada:
  Mande um gif e digite _!sg_ na legenda

${showAll}`;
}

function helpPapo() {
	return `
*=== Bater-papo do BOT! ===*

▫️ sextou
▫️ bom dia bot
▫️ boa tarde bot
▫️ boa noite bot
▫️ fala bot
▫️ que dia é hoje

${showAll}`;
}

function helpOutros() {
	return `
*=== Outros comandos do BOT! ===*

▫️ !concursos .seu estado
▫️ !cep cep
▫️ !horoscopo seu signo
▫️ !clima .sua cidade
▫️ !buscameme
▫️ !escrevememe .texto1 .texto2 .id da imagem
▫️ !tts isso converte texto em audio
▫️ !meunumero
▫️ !aniversário DD/MM/AAAA (o ano deve ser o do próximo aniversário)
▫️ !converter .BTCxUSD

${showAll}`;
}

function helpGrupos() {
const unused = `▫️ !adicionar 55219********`;
	return `
*=== Comandos para grupos ===*

▫️ !adminlista
▫️ !donodogrupo
▫️ !mencionartodos
▫️ !ban @usuário
▫️ !promover
▫️ !rebaixar
▫️ !linkdogrupo
▫️ !limpeza

${showAll}`;
}

function helpConsultas() {
	return `
*=== Consultas do BOT! ===*

▫️ !cpf 12312312312
▫️ !nome .nome
▫️ !telefone 11999887744

Você pode mencionar alguém para consultar seu telefone

${showAll}`;
}

function readme() {
	return `
*=== README do BOT! ===*
Sou o Bruce um bot para whatsapp de código aberto.
Criado pelo Jhon e aprimorado pelo Kauã.

Quer ver como fui feito ou ter-me em seu número?
Acessa o repo ai. Aproveita e dá aquela estrela!
https://github.com/kaualandi/bot-whatsapp.
`;
}
exports.helpers = helpers;
