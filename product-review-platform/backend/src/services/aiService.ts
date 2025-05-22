import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';

dotenv.config();

export interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}


const simpleSentimentAnalysis = (text: string): SentimentResult => {
  console.log('\x1b[33m%s\x1b[0m', '⚠️ USING RULE-BASED FALLBACK for sentiment analysis (no Mistral API call)');
  
  const lowercaseText = text.toLowerCase();
  
 
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'awesome', 'fantastic',
    'wonderful', 'love', 'best', 'happy', 'satisfied', 'recommend',
    'perfect', 'convenient', 'impressed', 'well', 'reliable', 'quality'
  ];
  
  const negativeWords = [
    'bad', 'poor', 'terrible', 'horrible', 'awful', 'worst',
    'disappointed', 'disappointing', 'waste', 'avoid', 'problem',
    'hate', 'dislike', 'difficult', 'complaint', 'cheap', 'broken', 'useless'
  ];
  
 
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowercaseText.match(regex);
    if (matches) positiveCount += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowercaseText.match(regex);
    if (matches) negativeCount += matches.length;
  });
  
 
  const total = positiveCount + negativeCount;
  let score = 0;
  
  if (total > 0) {
    score = (positiveCount - negativeCount) / total;
  }
  
 
  let sentiment: 'positive' | 'negative' | 'neutral';
  if (score > 0.2) {
    sentiment = 'positive';
  } else if (score < -0.2) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
 
  console.log('\x1b[33m%s\x1b[0m', `📊 RULE-BASED SENTIMENT RESULT: ${sentiment.toUpperCase()} (Score: ${parseFloat(score.toFixed(2))})`);
  console.log(`   Found ${positiveCount} positive words and ${negativeCount} negative words`);
  
  return {
    sentiment,
    score: parseFloat(score.toFixed(2))
  };
};

export const analyzeSentiment = async (reviewText: string): Promise<SentimentResult> => {
  try {
   
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey || apiKey === 'your_mistral_api_key_here') {
      console.log('No Mistral API key provided, using simple sentiment analysis fallback');
      return simpleSentimentAnalysis(reviewText);
    }
    
   
    const mistral = new Mistral({
      apiKey: apiKey
    });
    
   
    const prompt = `
    Analyze the sentiment of the following product review and respond with ONLY a JSON object with these fields:
    - sentiment: (must be exactly one of: "positive", "negative", or "neutral")
    - score: (a number between -1 and 1, where -1 is extremely negative, 0 is neutral, and 1 is extremely positive)
    
    Review to analyze: "${reviewText}"
    
    Your response must be valid JSON like:
    {"sentiment": "positive", "score": 0.8}
    `;
    
    try {
     
      console.log('\x1b[36m%s\x1b[0m', '🔄 CALLING MISTRAL AI API for sentiment analysis...');
      console.log('Review text (truncated):', reviewText.length > 50 ? `${reviewText.substring(0, 50)}...` : reviewText);
      
      const startTime = Date.now();
      
     
      const response = await mistral.chat.complete({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        maxTokens: 100
      });
      
      const duration = Date.now() - startTime;
      
     
      console.log('\x1b[32m%s\x1b[0m', `✅ MISTRAL AI API RESPONSE RECEIVED (${duration}ms)`);
      
     
      if (!response.choices || response.choices.length === 0) {
        console.log('Empty response from Mistral API, using fallback');
        return simpleSentimentAnalysis(reviewText);
      }
      
      const responseText = response.choices[0].message.content;
      
      if (!responseText || typeof responseText !== 'string') {
        console.log('Invalid response format from Mistral API, using fallback');
        return simpleSentimentAnalysis(reviewText);
      }
      
     
      const jsonMatch = responseText.match(/\{[^{}]*\}/);
      if (!jsonMatch) {
        console.log('Failed to parse sentiment from Mistral response, using fallback');
        return simpleSentimentAnalysis(reviewText);
      }
      
      try {
       
        const parsedJson = JSON.parse(jsonMatch[0]);
        
       
        if (
          !parsedJson.sentiment || 
          !['positive', 'negative', 'neutral'].includes(parsedJson.sentiment) ||
          typeof parsedJson.score !== 'number'
        ) {
          console.log('Invalid response format from Mistral API, using fallback');
          return simpleSentimentAnalysis(reviewText);
        }
        
       
        console.log('\x1b[32m%s\x1b[0m', `🎯 SENTIMENT RESULT FROM MISTRAL AI: ${parsedJson.sentiment.toUpperCase()} (Score: ${parsedJson.score})`);
        
        return {
          sentiment: parsedJson.sentiment,
          score: parsedJson.score
        };
      } catch (parseError) {
        console.error('Error parsing JSON from Mistral response:', parseError);
        return simpleSentimentAnalysis(reviewText);
      }
    } catch (apiError) {
      console.error('\x1b[31m%s\x1b[0m', '❌ ERROR CALLING MISTRAL AI API:');
      console.error(apiError);
      return simpleSentimentAnalysis(reviewText);
    }
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    console.log('Falling back to simple sentiment analysis');
   
    return simpleSentimentAnalysis(reviewText);
  }
}; 