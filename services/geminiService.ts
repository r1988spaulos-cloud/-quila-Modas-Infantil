import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Você é a 'Áquila', a assistente virtual de moda da loja 'Áquila Modas Infantil'.
Seu tom de voz é amigável, carinhoso e profissional (como uma vendedora experiente e atenciosa).
Você ajuda pais, tios e avós a escolherem roupas para crianças.
Produtos disponíveis na loja geralmente incluem: Vestidos, Conjuntos, Macacões, Jeans, Camisetas.
Faixas etárias: Bebê (0-24 meses), Infantil (2-12 anos).
Se o usuário perguntar sobre tamanhos, explique:
- Bebê: RN, P, M, G, GG.
- Infantil: 2, 4, 6, 8, 10, 12 (anos).
Dê conselhos de estilo baseados em ocasiões (festas, brincar, escola) ou clima.
Seja concisa e use emojis ocasionalmente para parecer simpática. 🌸✨
`;

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[]): Promise<string> => {
  if (!apiKey) {
    return "Desculpe, meu sistema de inteligência está temporariamente indisponível (Chave de API ausente).";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Desculpe, não consegui entender. Pode repetir de outra forma?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ops! Tive um pequeno problema técnico. Tente novamente em instantes.";
  }
};