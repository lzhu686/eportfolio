const sendMessage = async (message) => {
  const makeRequest = async () => {
    try {
      const API_ENDPOINT = 'https://api.closeagi.com/v1/chat/completions';
      const API_KEY = 'sk-3Uhd6y5DxAlZ2cRpA3F9Da18A8214f298cEdE16b525eF67b';

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          messages: [{
            role: 'system',
            content: '你是一个专业的助手。'
          }, {
            role: 'user',
            content: message
          }],
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      const responseText = await response.text();
      console.log('API 原始响应:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('JSON 解析错误:', e);
        throw new Error('API 响应格式错误');
      }

      if (!response.ok) {
        console.error('API 错误响应:', data);
        throw new Error(data.error?.message || '请求失败');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('请求详细错误:', error);
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
        console.log(`请求失败，${retries} 次重试机会剩余`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError;
};

export const aiService = {
  sendMessage
}; 