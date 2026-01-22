import { useState } from 'react';
import { User } from '@/types';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { LogOut, Sparkles, Users, BookOpen, Lightbulb, MessageSquare } from 'lucide-react';
import { AIAssistant } from './AIAssistant';
import { ClassManager } from './ClassManager';
import { LessonQuickView } from './LessonQuickView';
import { ActivitySuggestions } from './ActivitySuggestions';
import { storage } from '@/utils/storage';
import { mockFeedback } from '@/data/mockData';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

export function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('ai');
  
  // Get feedback for this teacher
  const teacherFeedback = [...mockFeedback, ...storage.getFeedback()].filter(
    f => f.teacherId === user.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">JIT Teaching Assistant</h1>
              <p className="text-sm text-gray-600">
                Welcome, {user.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <Badge variant="outline" className="mb-1">
                  {user.subject} Teacher
                </Badge>
                <p className="text-sm text-gray-600">Grade {user.grade}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Feedback Notifications */}
        {teacherFeedback.length > 0 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Recent Feedback from Admin
                <Badge className="ml-auto">{teacherFeedback.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teacherFeedback.slice(0, 3).map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-3 bg-white rounded border border-blue-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-gray-700 flex-1">{feedback.text}</p>
                    <Badge 
                      variant={
                        feedback.type === 'praise' ? 'default' : 
                        feedback.type === 'suggestion' ? 'outline' : 
                        'destructive'
                      }
                      className="flex-shrink-0"
                    >
                      {feedback.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {feedback.adminName} - {feedback.date}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-6">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">My Students</span>
              <span className="sm:hidden">Students</span>
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Lessons</span>
              <span className="sm:hidden">Lessons</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Activities</span>
              <span className="sm:hidden">Ideas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="students">
            <ClassManager user={user} />
          </TabsContent>

          <TabsContent value="lessons">
            <LessonQuickView user={user} />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitySuggestions user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
