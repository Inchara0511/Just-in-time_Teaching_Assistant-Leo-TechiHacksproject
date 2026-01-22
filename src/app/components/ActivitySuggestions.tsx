import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Lightbulb, Sparkles, RefreshCw } from 'lucide-react';
import { generateActivitySuggestions } from '@/data/mockData';
import { User } from '@/types';

interface ActivitySuggestionsProps {
  user: User;
}

export function ActivitySuggestions({ user }: ActivitySuggestionsProps) {
  const [topic, setTopic] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const suggestions = generateActivitySuggestions(
        user.subject || 'General',
        user.grade || '',
        topic
      );
      setActivities(suggestions);
      setIsLoading(false);
    }, 800);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            Activity Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic (Optional)</Label>
            <Input
              id="topic"
              placeholder="e.g., Quadrilaterals, Light and Shadows..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1 sm:flex-none"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Activities
                </>
              )}
            </Button>

            {activities.length > 0 && (
              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Ideas
              </Button>
            )}
          </div>

          {activities.length > 0 && (
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Suggested Activities</h4>
                <Badge variant="outline">
                  {user.subject} - Grade {user.grade}
                </Badge>
              </div>
              <div className="space-y-3">
                {activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{activity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>💡 Tip:</strong> Adapt these activities based on your classroom size, 
                  available resources, and students' learning levels. Mix individual, pair, and 
                  group activities for variety.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
