import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { BookOpen, Lightbulb, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { mockChapters } from '@/data/mockData';
import { User } from '@/types';

interface LessonQuickViewProps {
  user: User;
}

export function LessonQuickView({ user }: LessonQuickViewProps) {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  // Get chapters for this teacher's subject and grade
  const relevantChapters = mockChapters.filter(
    c => c.subject === user.subject && c.grade === user.grade
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Quick Lesson Reference
            <Badge variant="outline" className="ml-auto">
              {relevantChapters.length} Chapters
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {relevantChapters.map((chapter) => {
                const isExpanded = expandedChapter === chapter.id;
                return (
                  <div
                    key={chapter.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 h-auto hover:bg-gray-50"
                      onClick={() => toggleChapter(chapter.id)}
                    >
                      <div className="text-left">
                        <p className="font-medium">{chapter.title}</p>
                        <p className="text-sm text-gray-600">
                          {chapter.subject} - Grade {chapter.grade}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </Button>

                    {isExpanded && (
                      <div className="p-4 bg-gray-50 border-t space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            Summary
                          </h4>
                          <p className="text-sm text-gray-700">{chapter.summary}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            Key Points to Cover
                          </h4>
                          <ul className="space-y-1">
                            {chapter.keyPoints.map((point, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-green-600 mt-0.5">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-600" />
                            Suggested Activities
                          </h4>
                          <ul className="space-y-1">
                            {chapter.activities.map((activity, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-amber-600 mt-0.5">•</span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {relevantChapters.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No chapters available for {user.subject} Grade {user.grade}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
