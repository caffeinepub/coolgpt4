import { Message, Sender } from '../backend';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => {
        const isUser = message.sender === Sender.user;
        
        return (
          <div
            key={`${message.timestamp}-${index}`}
            className={cn(
              'flex gap-3 animate-in fade-in-50 slide-in-from-bottom-2',
              isUser ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <Avatar className={cn(
              'h-9 w-9 border-2',
              isUser ? 'border-emerald-500/20' : 'border-primary/20'
            )}>
              <AvatarFallback className={cn(
                isUser 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-primary/10 text-primary'
              )}>
                {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            
            <div className={cn(
              'flex flex-col gap-1 max-w-[75%]',
              isUser ? 'items-end' : 'items-start'
            )}>
              <div className={cn(
                'rounded-2xl px-4 py-3 shadow-sm',
                isUser 
                  ? 'bg-emerald-500 text-white rounded-tr-sm' 
                  : 'bg-card border border-border rounded-tl-sm'
              )}>
                <p className={cn(
                  'text-[15px] leading-relaxed whitespace-pre-wrap break-words',
                  isUser ? 'text-white' : 'text-foreground'
                )}>
                  {message.text}
                </p>
              </div>
              
              <span className="text-xs text-muted-foreground px-1">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
