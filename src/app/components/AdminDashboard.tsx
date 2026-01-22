import { useState } from 'react';
import { User, Feedback } from '@/types';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Label } from '@/app/components/ui/label';
import { LogOut, Users, MessageSquare, BookOpen, Send } from 'lucide-react';
import { mockUsers, mockClasses, mockRemarks, mockFeedback } from '@/data/mockData';
import { storage } from '@/utils/storage';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('teachers');
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<'praise' | 'suggestion' | 'concern'>('praise');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allFeedback, setAllFeedback] = useState<Feedback[]>([...mockFeedback, ...storage.getFeedback()]);

  const teachers = mockUsers.filter(u => u.role === 'teacher');
  const allRemarks = [...mockRemarks, ...storage.getRemarks()];

  const handleSendFeedback = () => {
    if (!selectedTeacher || !feedbackText.trim()) return;

    const newFeedback: Feedback = {
      id: `f${Date.now()}`,
      teacherId: selectedTeacher.id,
      adminId: user.id,
      adminName: user.name,
      text: feedbackText,
      date: new Date().toISOString().split('T')[0],
      type: feedbackType,
    };

    storage.addFeedback(newFeedback);
    setAllFeedback([...allFeedback, newFeedback]);
    setFeedbackText('');
    setIsDialogOpen(false);
  };

  const getTeacherRemarks = (teacherId: string) => {
    return allRemarks.filter(r => r.teacherId === teacherId);
  };

  const getTeacherFeedback = (teacherId: string) => {
    return allFeedback.filter(f => f.teacherId === teacherId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">Administrator</Badge>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-semibold mt-1">{teachers.length}</p>
                </div>
                <Users className="w-10 h-10 text-indigo-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Classes</p>
                  <p className="text-2xl font-semibold mt-1">{mockClasses.length}</p>
                </div>
                <BookOpen className="w-10 h-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Remarks This Week</p>
                  <p className="text-2xl font-semibold mt-1">{allRemarks.length}</p>
                </div>
                <MessageSquare className="w-10 h-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Feedback Sent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Overview & Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {teachers.map((teacher) => {
                      const remarks = getTeacherRemarks(teacher.id);
                      const feedback = getTeacherFeedback(teacher.id);
                      const teacherClasses = mockClasses.filter(
                        c => c.subject === teacher.subject && c.grade === teacher.grade
                      );

                      return (
                        <div
                          key={teacher.id}
                          className="p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="font-medium text-indigo-600">
                                  {teacher.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{teacher.name}</p>
                                <p className="text-sm text-gray-600">{teacher.email}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline">{teacher.subject}</Badge>
                                  <Badge variant="outline">Grade {teacher.grade}</Badge>
                                </div>
                              </div>
                            </div>

                            <Dialog open={isDialogOpen && selectedTeacher?.id === teacher.id} onOpenChange={setIsDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => setSelectedTeacher(teacher)}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Give Feedback
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Send Feedback to {teacher.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                  <div className="space-y-2">
                                    <Label>Feedback Type</Label>
                                    <Select value={feedbackType} onValueChange={(v: any) => setFeedbackType(v)}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="praise">Praise</SelectItem>
                                        <SelectItem value="suggestion">Suggestion</SelectItem>
                                        <SelectItem value="concern">Concern</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Message</Label>
                                    <Textarea
                                      placeholder="Enter your feedback..."
                                      value={feedbackText}
                                      onChange={(e) => setFeedbackText(e.target.value)}
                                      rows={4}
                                    />
                                  </div>

                                  <div className="flex gap-2">
                                    <Button onClick={handleSendFeedback} disabled={!feedbackText.trim()}>
                                      <Send className="w-4 h-4 mr-2" />
                                      Send Feedback
                                    </Button>
                                    <Button variant="outline" onClick={() => {
                                      setIsDialogOpen(false);
                                      setFeedbackText('');
                                    }}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                            <div className="p-3 bg-blue-50 rounded border border-blue-100">
                              <p className="text-gray-600">Classes</p>
                              <p className="font-medium">{teacherClasses.length}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded border border-green-100">
                              <p className="text-gray-600">Remarks Given</p>
                              <p className="font-medium">{remarks.length}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded border border-purple-100">
                              <p className="text-gray-600">Feedback Received</p>
                              <p className="font-medium">{feedback.length}</p>
                            </div>
                          </div>

                          {remarks.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium mb-2">Recent Remarks:</p>
                              <div className="space-y-2">
                                {remarks.slice(0, 2).map((remark) => (
                                  <div
                                    key={remark.id}
                                    className="text-sm p-2 bg-gray-100 rounded"
                                  >
                                    <p className="text-gray-700">{remark.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {remark.date}
                                    </p>
                                  </div>
                                ))}
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
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback History</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {allFeedback.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No feedback sent yet</p>
                      </div>
                    ) : (
                      allFeedback.map((feedback) => {
                        const teacher = teachers.find(t => t.id === feedback.teacherId);
                        return (
                          <div
                            key={feedback.id}
                            className="p-4 border rounded-lg"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="font-medium">To: {teacher?.name}</p>
                                <p className="text-sm text-gray-600">
                                  {teacher?.subject} - Grade {teacher?.grade}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  feedback.type === 'praise' ? 'default' :
                                  feedback.type === 'suggestion' ? 'outline' :
                                  'destructive'
                                }
                              >
                                {feedback.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                              {feedback.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{feedback.date}</p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
