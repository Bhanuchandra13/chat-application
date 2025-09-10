import React from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { useChat } from './hooks/useChat';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const {
    chats,
    activeChat,
    userProfile,
    loading,
    error,
    selectChat,
    sendNewMessage,
    selectedChat,
    chatMessages
  } = useChat();

  if (loading && chats.length === 0) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading chats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-screen">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="app">
        <ChatList 
          chats={chats} 
          activeChat={activeChat} 
          userProfile={userProfile}
          onChatSelect={selectChat}
          loading={loading}
        />
        <ChatWindow 
          chat={selectedChat} 
          messages={chatMessages} 
          onSendMessage={sendNewMessage}
          loading={loading}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
