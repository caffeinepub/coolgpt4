import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Message, Sender } from '../backend';
import { toast } from 'sonner';

export function useChatMessages() {
  const { actor, isFetching: isActorFetching } = useActor();
  const queryClient = useQueryClient();

  const messagesQuery = useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: async () => {
      if (!actor) return [];
      const messages = await actor.getAll();
      return messages;
    },
    enabled: !!actor && !isActorFetching,
  });

  const sendMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.send(text, Sender.user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to send message', {
        description: error.message || 'Please try again',
      });
    },
  });

  return {
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    sendMessage: sendMutation.mutate,
    isSending: sendMutation.isPending,
  };
}
