import { useState, useRef, useEffect } from 'react';
import { aiMentorAPI } from '../api/axios';
import { HiChat, HiPaperAirplane } from 'react-icons/hi';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * AI Mentor Chat Page
 *
 * Interactive chat interface with the AI career mentor.
 * Supports suggested follow-up questions for easy navigation.
 */
export default function AIMentor() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hi! I'm your AI Career Mentor. I can help you with resumes, interviews, career planning, skills, and more. What would you like to discuss?",
      suggestions: [
        'Help me with my resume',
        'Interview preparation tips',
        'Career change advice',
        'Learning roadmap guidance',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim() || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await aiMentorAPI.chat(userMessage);
      const { text: aiText, suggestions } = res.data;

      // Add AI response
      setMessages((prev) => [...prev, { role: 'ai', text: aiText, suggestions: suggestions || [] }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: "I'm sorry, I encountered an error. Please try again or check your connection.",
          suggestions: ['Try again', 'Ask another question'],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <HiChat className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Mentor</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Your personal career guide</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="animate-slide-up">
            {/* User message */}
            {msg.role === 'user' && (
              <div className="chat-bubble-user">
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            )}

            {/* AI message */}
            {msg.role === 'ai' && (
              <div>
                <div className="chat-bubble-ai">
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Suggested follow-ups */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.suggestions.map((suggestion, sIndex) => (
                      <button
                        key={sIndex}
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={isLoading}
                        className="text-xs px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <HiChat className="text-white" size={14} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your career..."
            disabled={isLoading}
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="btn-primary p-3 rounded-xl"
          >
            <HiPaperAirplane size={18} className={isLoading ? 'animate-pulse' : ''} />
          </button>
        </form>
      </div>
    </div>
  );
}
