'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type UserRole = 'teacher' | 'student';

type QuickstartPreCallCardProps = {
  isLoading: boolean;
  error: string | null;
  onStartConversation: () => void;
  classroomChannel: string;
  onClassroomChannelChange: (channel: string) => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
};

export function QuickstartPreCallCard({
  isLoading,
  error,
  onStartConversation,
  classroomChannel,
  onClassroomChannelChange,
  role,
  onRoleChange,
}: QuickstartPreCallCardProps) {
  const isCreating = !classroomChannel.trim();

  return (
    <div className="mx-auto flex w-[min(92vw,28rem)] animate-fade-up flex-col items-center rounded-[20px] border border-[#2b2b2b] px-8 py-10 text-center shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
      <h1 className="text-[28px] font-medium leading-[1.2] text-white">
        TeachSync AI
      </h1>

      <p className="mt-[14px] text-sm font-medium leading-6 text-muted-foreground">
        Your AI co-teacher for live digital classrooms.
      </p>

      {/* Role */}
      <div className="mt-8 w-full text-left">
        <label className="mb-2 block text-xs font-medium text-muted-foreground">
          Your Role
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onRoleChange('teacher')}
            disabled={isLoading}
            className={`h-11 rounded-lg border text-sm font-medium transition ${
              role === 'teacher'
                ? 'border-primary bg-primary text-black'
                : 'border-[#2b2b2b] bg-black text-white hover:border-primary'
            }`}
          >
            👨‍🏫 Teacher
          </button>

          <button
            type="button"
            onClick={() => onRoleChange('student')}
            disabled={isLoading}
            className={`h-11 rounded-lg border text-sm font-medium transition ${
              role === 'student'
                ? 'border-primary bg-primary text-black'
                : 'border-[#2b2b2b] bg-black text-white hover:border-primary'
            }`}
          >
            🎓 Student
          </button>
        </div>
      </div>

      {/* Channel */}
      <div className="mt-6 w-full text-left">
        <label
          htmlFor="classroom-channel"
          className="mb-2 block text-xs font-medium text-muted-foreground"
        >
          Classroom Channel
        </label>

        <input
          id="classroom-channel"
          type="text"
          value={classroomChannel}
          onChange={(e) => onClassroomChannelChange(e.target.value)}
          placeholder={
            role === 'teacher'
              ? 'Leave empty to create'
              : 'Enter classroom channel'
          }
          disabled={isLoading}
          className="h-10 w-full rounded-lg border border-[#2b2b2b] bg-black px-3 text-sm text-white outline-none placeholder:text-muted-foreground focus:border-primary disabled:opacity-50"
        />

        <p className="mt-2 text-xs text-muted-foreground">
          {role === 'teacher'
            ? 'Leave empty to create a new classroom.'
            : 'Enter the channel provided by your teacher.'}
        </p>
      </div>

      <Button
        onClick={onStartConversation}
        disabled={
          isLoading ||
          (role === 'student' && isCreating)
        }
        className="mt-6 h-10 w-full rounded-lg border border-primary bg-primary text-sm font-medium text-black hover:border-white hover:bg-white hover:text-black"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining...
          </>
        ) : role === 'teacher' && isCreating ? (
          'Create Classroom'
        ) : (
          'Join Classroom'
        )}
      </Button>

      {error && (
        <p className="mt-3 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}