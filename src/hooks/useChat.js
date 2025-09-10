import { useState, useEffect, useCallback } from 'react';
import { listChats, getMessages, sendMessage, getUserProfile, markMessagesAsRead } from '../data/mockApi';

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load chats and user profile in parallel
      const [chatsResponse, profileResponse] = await Promise.all([
        listChats(),
        getUserProfile()
      ]);

      if (chatsResponse.success) {
        setChats(chatsResponse.data);
      }

      if (profileResponse.success) {
        setUserProfile(profileResponse.data);
      }
    } catch (err) {
      setError('Failed to load initial data');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load messages for a specific chat
  const loadMessages = useCallback(async (chatId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getMessages(chatId);
      if (response.success) {
        setMessages(prev => ({
          ...prev,
          [chatId]: response.data
        }));
      }
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Select a chat
  const selectChat = useCallback(async (chatId) => {
    setActiveChat(chatId);
    
    // Load messages if not already loaded
    if (!messages[chatId]) {
      await loadMessages(chatId);
    }

    // Mark messages as read
    try {
      await markMessagesAsRead(chatId);
      setChats(prev => 
        prev.map(chat => 
          chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        )
      );
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  }, [messages, loadMessages]);

  // Send a message
  const sendNewMessage = useCallback(async (messageText) => {
    if (!activeChat || !messageText.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await sendMessage(activeChat, messageText);
      if (response.success) {
        const newMessage = response.data;
        
        // Add message to local state
        setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), newMessage]
        }));

        // Update last message in chat list
        setChats(prev => 
          prev.map(chat => 
            chat.id === activeChat 
              ? { 
                  ...chat, 
                  lastMessage: newMessage.text,
                  lastMessageTime: newMessage.time
                } 
              : chat
          )
        );

        // Simulate receiving a response (replace with real-time updates)
        setTimeout(async () => {
          const responses = [
            'That sounds great!',
            'I understand.',
            'Let me think about that.',
            'Sure, no problem!',
            'Thanks for letting me know.',
            'I agree with you.',
            'That makes sense.',
            'I will get back to you soon.'
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          const responseMessage = {
            id: Date.now() + 1,
            text: randomResponse,
            sender: 'other',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: new Date().toISOString()
          };

          setMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), responseMessage]
          }));

          setChats(prev => 
            prev.map(chat => 
              chat.id === activeChat 
                ? { 
                    ...chat, 
                    lastMessage: randomResponse,
                    lastMessageTime: responseMessage.time
                  } 
                : chat
            )
          );
        }, 1000);
      }
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  }, [activeChat]);

  // Refresh chats
  const refreshChats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await listChats();
      if (response.success) {
        setChats(response.data);
      }
    } catch (err) {
      setError('Failed to refresh chats');
      console.error('Error refreshing chats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    chats,
    messages,
    activeChat,
    userProfile,
    loading,
    error,
    
    // Actions
    selectChat,
    sendNewMessage,
    refreshChats,
    loadMessages,
    
    // Computed values
    selectedChat: chats.find(chat => chat.id === activeChat),
    chatMessages: activeChat ? messages[activeChat] || [] : []
  };
};
