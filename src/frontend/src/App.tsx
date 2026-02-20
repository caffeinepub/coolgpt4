import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatInterface from './components/ChatInterface';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-foreground">CoolGPT4</h1>
            <p className="text-sm text-muted-foreground">Your AI conversation partner</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>
        
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} · Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'coolgpt4'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </div>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
