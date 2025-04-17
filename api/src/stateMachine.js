const states = {
  welcome: async () => ({
    message: "👋 Bem-vindo ao Chatbot do Clima!\nO que você deseja fazer?\n[1] Consultar clima\n[2] Sair",
    nextState: "menu"
  }),
  menu: async (input) => {
    if (input === '1') return { message: "Digite o nome da cidade:", nextState: "weather" };
    if (input === '2') return { message: "👋 Até mais!", nextState: null };
    return { message: "❌ Opção inválida.\n[1] Consultar clima\n[2] Sair", nextState: "menu" };
  },
  weather: async (input) => {
    try {
      const fetch = require('node-fetch');
      const nominatimRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`);
      const geo = await nominatimRes.json();
      if (!geo.length) throw new Error("Cidade não encontrada.");
      const { lat, lon } = geo[0];
  
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const weather = await weatherRes.json();
  
      return {
        message:
          `🌡️ Temperatura atual em ${input}: ${weather.current_weather.temperature}°C\n\n` +
          "O que você deseja fazer?\n[1] Consultar clima\n[2] Sair",
        nextState: "menu"
      };
    } catch (err) {
      return {
        message:
          "Erro ao consultar clima. Tente novamente.\n\n" +
          "O que você deseja fazer?\n[1] Consultar clima\n[2] Sair",
        nextState: "menu"
      };
    }
  }  
};

async function handleMessage(session, message) {
  const currentState = session.state || 'welcome';
  const handler = states[currentState];

  if (!handler) return { message: "Estado inválido", nextState: null };

  const result = await handler(message);
  session.state = result.nextState;
  return { sessionId: session.id, nextMessage: result.message };
}

module.exports = { handleMessage };