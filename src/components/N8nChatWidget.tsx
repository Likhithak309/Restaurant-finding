import React, { useEffect, useState } from 'react';
import { MessageSquare, Bot, Sparkles, X, Send, AlertCircle, RefreshCw, ChevronDown, ChevronUp, Wrench } from 'lucide-react';
import { generateConciergeResponse } from '../services/conciergeService';

const WEBHOOK_URL = 'https://likhitha30.app.n8n.cloud/webhook/8e87d4cd-529e-4e7d-b200-2520507b7f95/chat';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isFallback?: boolean;
}

// Helper to render markdown text with bolding and lists
function formatMessageContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    // Check if line is horizontal rule
    if (line.trim() === '***' || line.trim() === '---') {
      return <hr key={idx} className="my-2 border-slate-200" />;
    }

    // Replace **bold** with <strong>
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const formattedLine = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
    const isNumbered = /^\s*\d+\.\s/.test(line);

    return (
      <div
        key={idx}
        className={`${isBullet ? 'pl-2 text-slate-700' : ''} ${isNumbered ? 'font-medium mt-1 text-slate-900' : ''} min-h-[1.2em]`}
      >
        {formattedLine}
      </div>
    );
  });
}

export const N8nChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFixGuide, setShowFixGuide] = useState(false);
  const [workflowErrorDetected, setWorkflowErrorDetected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am your AI Dining Concierge connected to your n8n workflow. Ask me about nearby high-rated restaurants, cuisine recommendations, menus, or pricing!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to user's n8n webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: query,
          sessionId: sessionId
        })
      });

      const data = await response.json().catch(() => null);
      let replyText = '';
      let isErrorInN8n = false;

      if (!response.ok || (data && data.message === 'Error in workflow')) {
        isErrorInN8n = true;
      } else if (data) {
        if (typeof data.output === 'string') {
          replyText = data.output;
        } else if (typeof data.text === 'string') {
          replyText = data.text;
        } else if (typeof data.message === 'string' && data.message !== 'Error in workflow') {
          replyText = data.message;
        } else if (typeof data.response === 'string') {
          replyText = data.response;
        } else if (typeof data === 'string') {
          replyText = data;
        }
      }

      // If n8n workflow threw an error, flag it and answer with local dining knowledge
      if (isErrorInN8n || !replyText.trim()) {
        setWorkflowErrorDetected(true);
        const fallbackAnswer = generateConciergeResponse(query);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: fallbackAnswer,
            timestamp: new Date(),
            isFallback: true
          }
        ]);
      } else {
        setWorkflowErrorDetected(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: replyText,
            timestamp: new Date(),
            isFallback: false
          }
        ]);
      }
    } catch (err) {
      console.warn('Network issue or n8n workflow unreachable, using dining knowledge base:', err);
      setWorkflowErrorDetected(true);
      const fallbackAnswer = generateConciergeResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: fallbackAnswer,
          timestamp: new Date(),
          isFallback: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Open AI Dining Concierge"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold tracking-wide">AI Concierge</span>
        </button>
      ) : (
        <div className="w-[360px] sm:w-[420px] h-[560px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold flex items-center gap-1.5">
                  <span>AI Dining Concierge</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </h2>
                <p className="text-[11px] text-slate-400">Connected to n8n Cloud Webhook</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Workflow Error Helper Notice */}
          {workflowErrorDetected && (
            <div className="bg-amber-50 border-b border-amber-200 px-3.5 py-2 text-xs text-amber-900 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>n8n Workflow Returned Error (HTTP 500)</span>
                </div>
                <button
                  onClick={() => setShowFixGuide((prev) => !prev)}
                  className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-0.5 underline cursor-pointer"
                >
                  <span>{showFixGuide ? 'Hide Fix' : 'How to fix'}</span>
                  {showFixGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {showFixGuide && (
                <div className="mt-2 pt-2 border-t border-amber-200/80 text-[11px] text-amber-950 space-y-1.5 leading-relaxed">
                  <p className="font-semibold text-amber-900">
                    Why is n8n giving "Error in workflow"?
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-800">
                    <li>
                      <strong>Check LLM API Credentials:</strong> Open your n8n workflow at{' '}
                      <span className="font-mono text-[10px]">likhitha30.app.n8n.cloud</span>. In the AI Agent / Chat Model node, verify your OpenAI or Gemini API key is valid and has active balance.
                    </li>
                    <li>
                      <strong>Check Executions tab:</strong> Click <em>Executions</em> on the left menu in n8n. Open the red execution to see the exact node that failed.
                    </li>
                    <li>
                      <strong>Response Mode:</strong> In your <em>Chat Trigger</em> node, set <em>Response Mode</em> to <code>When Last Node Finishes</code>.
                    </li>
                  </ol>
                  <p className="text-[10px] text-amber-700 italic pt-0.5">
                    * The concierge below automatically provides answers from your website's database so users are never interrupted!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none whitespace-pre-line'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm space-y-1'
                  }`}
                >
                  {msg.sender === 'user' ? msg.text : formatMessageContent(msg.text)}
                </div>

                {msg.isFallback && (
                  <span className="text-[10px] text-amber-700 mt-1 flex items-center gap-1 font-medium">
                    <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                    Verified from website database
                  </span>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-500 flex items-center gap-2 shadow-sm">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  <span>Consulting dining database...</span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-600 shrink-0">
            <button
              onClick={() => handleSendMessage('Suggest top 3 Italian spots with high ratings')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50 whitespace-nowrap cursor-pointer"
            >
              Top Italian spots
            </button>
            <button
              onClick={() => handleSendMessage('Which restaurants are open now under $30?')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50 whitespace-nowrap cursor-pointer"
            >
              Open now under $30
            </button>
            <button
              onClick={() => handleSendMessage('Best French bistro with tasting menu')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50 whitespace-nowrap cursor-pointer"
            >
              French bistro
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask about restaurants, cuisines, dishes..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
