import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Badge } from '@/app/components/ui/badge';
import { Users, MessageSquare, Plus } from 'lucide-react';
import { mockClasses, mockRemarks } from '@/data/mockData';
import { Student, Remark, User } from '@/types';
import { storage } from '@/utils/storage';

interface ClassManagerProps {
  user: User;
}

export function ClassManager({ user }: ClassManagerProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [remarkText, setRemarkText] = useState('');
  const [remarks, setRemarks] = useState<Remark[]>([...mockRemarks, ...storage.getRemarks()]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get classes for this teacher
  const teacherClasses = mockClasses.filter(
    c => c.subject === user.subject && c.grade === user.grade
  );

  const handleAddRemark = () => {
    if (!selectedStudent || !remarkText.trim()) return;

    const newRemark: Remark = {
      id: `r${Date.now()}`,
      studentId: selectedStudent.id,
      teacherId: user.id,
      teacherName: user.name,
      text: remarkText,
      date: new Date().toISOString().split('T')[0],
      subject: user.subject,
    };

    storage.addRemark(newRemark);
    setRemarks([...remarks, newRemark]);
    setRemarkText('');
    setIsDialogOpen(false);
  };

  const getStudentRemarks = (studentId: string) => {
    return remarks.filter(r => r.studentId === studentId);
  };

  return (
    <div className="space-y-4">
      {teacherClasses.map((classItem) => (
        <Card key={classItem.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Grade {classItem.grade} - Section {classItem.section}
              <Badge variant="outline" className="ml-auto">
                {classItem.students.length} Students
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {classItem.students.map((student) => {
                  const studentRemarks = getStudentRemarks(student.id);
                  return (
                    <div
                      key={student.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="font-medium text-indigo-600">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-600">
                                Roll No: {student.rollNumber}
                              </p>
                            </div>
                          </div>

                          {studentRemarks.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {studentRemarks.map((remark) => (
                                <div
                                  key={remark.id}
                                  className="bg-blue-50 p-3 rounded text-sm border border-blue-100"
                                >
                                  <p className="text-gray-700">{remark.text}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {remark.date} - {remark.teacherName}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <Dialog open={isDialogOpen && selectedStudent?.id === student.id} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Add Remark
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Remark for {student.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <Textarea
                                placeholder="Enter your remark or observation..."
                                value={remarkText}
                                onChange={(e) => setRemarkText(e.target.value)}
                                rows={4}
                              />
                              <div className="flex gap-2">
                                <Button onClick={handleAddRemark} disabled={!remarkText.trim()}>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Remark
                                </Button>
                                <Button variant="outline" onClick={() => {
                                  setIsDialogOpen(false);
                                  setRemarkText('');
                                }}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ))}

      {teacherClasses.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No classes assigned yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
