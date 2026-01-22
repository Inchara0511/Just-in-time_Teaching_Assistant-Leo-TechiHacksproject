import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Sparkles, Send, Clock } from 'lucide-react';
import { getAIResponse } from '@/data/mockData';
import { storage } from '@/utils/storage';

export function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [history, setHistory] = useState(storage.getAIHistory());

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const answer = getAIResponse(question);
      const timestamp = new Date().toISOString();
      
      const newItem = { question, answer, timestamp };
      
      // Save to storage and update state
      storage.addAIHistory(newItem);
      setCurrentAnswer(answer);
      setHistory(storage.getAIHistory());
      setIsLoading(false);
      setQuestion('');
    }, 1000);
  };

  const quickQuestions = [
    'How can I explain quadrilaterals to 8th graders?',
    'What activities work well for teaching light and shadows?',
    'How do I engage students who seem distracted?',
    'Tips for teaching linear equations effectively',
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            AI Teaching Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Ask anything... e.g., 'How can I make my math lesson more engaging?' or 'Quick activities for science class'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAskQuestion();
                }
              }}
              rows={3}
              className="resize-none"
            />
            <Button 
              onClick={handleAskQuestion} 
              disabled={!question.trim() || isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Thinking...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Ask Question
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Quick questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickQuestions.map((q, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuestion(q)}
                  className="text-left justify-start h-auto py-2 px-3 whitespace-normal"
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>

          {currentAnswer && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="text-sm whitespace-pre-wrap">{currentAnswer}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-4 h-4" />
              Recent Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-2 pb-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-sm text-indigo-600">Q: {item.question}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTime(item.timestamp)}</p>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
