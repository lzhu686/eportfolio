import enContent from '../locales/en.json';
import zhContent from '../locales/zh.json';

const createPortfolioContext = (language = 'zh') => {
  const content = language === 'zh' ? zhContent : enContent;
  
  return `
作为AI助手，我将基于以下作品集信息回答问题：

1. 作者：${content.home.name}
职位：${content.home.title}
简介：${content.home.bio}

2. 主要技能：
${Object.entries(content.skills.list).map(([key, skills]) => 
  `- ${content.skills.categories[key]}: ${skills.join(', ')}`
).join('\n')}

3. 核心项目：
${content.projects.list.map(project => 
  `- ${project.title}`
).join('\n')}

4. 教育背景：
- ${content.education.school1} (${content.education.year1})
- ${content.education.school2} (${content.education.year2})
- ${content.education.school3} (${content.education.year3})

回答要求：
1. 使用${language === 'zh' ? '中文' : '英文'}回答
2. 保持专业友好的语气
3. 仅基于提供的信息回答
`;
};

const sendMessage = async (message, language = 'zh') => {
  const makeRequest = async () => {
    try {
      const API_ENDPOINT = process.env.REACT_APP_AI_API_ENDPOINT || 'https://api.deepseek.com/chat/completions';
      const API_KEY = process.env.REACT_APP_AI_API_KEY;

      const portfolioContext = createPortfolioContext(language);
      
      const DEBUG = process.env.NODE_ENV === 'development' && process.env.REACT_APP_DEBUG === 'true';
      
      if (!API_KEY) {
        console.error('环境变量检查:', {
          'REACT_APP_AI_API_KEY': process.env.REACT_APP_AI_API_KEY ? '已设置' : '未设置',
          'REACT_APP_AI_API_ENDPOINT': process.env.REACT_APP_AI_API_ENDPOINT || '使用默认值',
          'NODE_ENV': process.env.NODE_ENV
        });
        throw new Error('AI API Key 未配置，请在 .env 文件中设置 REACT_APP_AI_API_KEY');
      }
      
      if (DEBUG) {
        console.log('发送请求到 AI API:', API_ENDPOINT);
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          messages: [{
            role: 'system',
            content: portfolioContext
          }, {
            role: 'user',
            content: message
          }],
          model: process.env.REACT_APP_AI_MODEL || 'deepseek-chat',
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || '请求失败');
      }

      return data.choices[0].message.content.trim();

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('API请求错误:', error.message);
      }
      throw error;
    }
  };

  let retries = 3;
  let lastError;

  while (retries > 0) {
    try {
      return await makeRequest();
    } catch (error) {
      lastError = error;
      retries--;
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError;
};

export const aiService = {
  sendMessage
}; 