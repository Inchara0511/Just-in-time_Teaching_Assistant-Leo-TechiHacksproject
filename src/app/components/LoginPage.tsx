import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import { User } from '@/types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Find user by email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      onLogin(user);
    } else {
      setError('User not found. Please use one of the demo accounts.');
    }
  };

  const quickLogin = (user: User) => {
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl">JIT Teaching Assistant</CardTitle>
          <CardDescription>
            Just-in-Time help for teachers, anytime
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => quickLogin(mockUsers[0])}
              >
                <div className="text-left">
                  <div className="font-medium">{mockUsers[0].name}</div>
                  <div className="text-xs text-gray-500">
                    Teacher - {mockUsers[0].subject} - Grade {mockUsers[0].grade}
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => quickLogin(mockUsers[1])}
              >
                <div className="text-left">
                  <div className="font-medium">{mockUsers[1].name}</div>
                  <div className="text-xs text-gray-500">
                    Teacher - {mockUsers[1].subject} - Grade {mockUsers[1].grade}
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => quickLogin(mockUsers[2])}
              >
                <div className="text-left">
                  <div className="font-medium">{mockUsers[2].name}</div>
                  <div className="text-xs text-gray-500">
                    Admin/Principal
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
