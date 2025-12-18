
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSpaceInfo(subject: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `请详细介绍深空探测对象：${subject}。内容包括：1. 概述 2. 主要科学发现 3. 正在进行或已完成的任务 4. 对人类的意义。请使用专业且富有科技感的语气，并分段落。`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "暂时无法获取该深空探测对象的详细实时数据。请检查网络或稍后重试。";
  }
}
