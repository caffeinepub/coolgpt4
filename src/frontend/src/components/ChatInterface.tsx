import { useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChatMessages } from '../hooks/useChatMessages';
import { Loader2 } from 'lucide-react';

export default function ChatInterface() {
  const { messages, isLoading, sendMessage, isSending } = useChatMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full flex flex-col container mx-auto max-w-4xl">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading messages...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3 max-w-md">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-semibold text-foreground">Start a conversation</h2>
              <p className="text-muted-foreground">
                Send a message below to begin chatting with CoolGPT4
              </p>
            </div>
          </div>
        ) : (
          <>
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <div className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="px-4 py-4">
          <MessageInput onSend={sendMessage} isSending={isSending} />
        </div>
      </div>
    </div>
  );
}
