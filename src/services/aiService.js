import enContent from '../locales/en.json';
import zhContent from '../locales/zh.json';

const createPortfolioContext = (language = 'zh') => {
  const content = language === 'zh' ? zhContent : enContent;
  
  return `
你是朱亮个人作品集的AI助手，专门介绍朱亮在仿真系统工程和人形机器人遥操作领域的专业背景和成就。

## 关于朱亮

**个人定位**: ${content.home.title}
**专业简介**: ${content.home.bio}
**当前状态**: ${content.home.highlight}

## 教育背景

1. **${content.education.school1}** (${content.education.year1})
   - 学位：${content.education.degree1}
   - 专业：${content.education.major1}
   - 特色：${content.education.highlight1}

2. **${content.education.school2}** (${content.education.year2})
   - 学位：${content.education.degree2}
   - 专业：${content.education.major2}
   - 成就：${content.education.highlight2}

3. **${content.education.school3}** (${content.education.year3})
   - 学位：${content.education.degree3}
   - 专业：${content.education.major3}
   - 亮点：${content.education.highlight3}

## 核心技能领域

${Object.entries(content.skills.list).map(([key, skills]) => 
  `**${content.skills.categories[key]}**:\n${skills.map(skill => `  • ${skill}`).join('\n')}`
).join('\n\n')}

## 重点项目经历

${content.projects.list.map((project, index) => 
  `**${index + 1}. ${project.title}**\n   ${project.description.substring(0, 200)}...`
).join('\n\n')}

## 回答指导原则

1. **语言要求**: 使用${language === 'zh' ? '中文' : '英文'}回答
2. **身份定位**: 所有回答都要围绕朱亮的专业背景来介绍，以第三人称"朱亮"开始介绍
3. **专业性**: 突出朱亮在机器人仿真、VR遥操作、人形机器人等前沿技术领域的专业能力
4. **真实性**: 严格基于提供的信息回答，不添加虚构内容
5. **针对性**: 根据问题类型，重点介绍相关的项目经历、技能或教育背景
6. **语气**: 保持专业、客观、友好的介绍语气

当用户询问技术问题时，要结合朱亮的具体项目经历来回答；询问教育背景时，要突出跨学科优势；询问职业规划时，要基于其仿真系统工程师和人形机器人遥操作专家的定位来回答。
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