// Mock API functions - Replace these with real API calls when integrating backend

// Mock chat data
const mockChats = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Hey, how are you doing?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
    isOnline: true,
    lastSeen: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Thanks for the help yesterday!',
    lastMessageTime: '9:15 AM',
    unreadCount: 0,
    isOnline: false,
    lastSeen: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Can we meet tomorrow?',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    isOnline: true,
    lastSeen: '2024-01-14T16:45:00Z'
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'The project looks great!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    lastSeen: '2024-01-14T14:20:00Z'
  },
  {
    id: 5,
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Let me know when you are free',
    lastMessageTime: 'Monday',
    unreadCount: 3,
    isOnline: true,
    lastSeen: '2024-01-13T11:30:00Z'
  }
];

// Mock messages data
const mockMessages = {
  1: [
    { id: 1, text: 'Hey there!', sender: 'user', time: '10:25 AM', timestamp: '2024-01-15T10:25:00Z' },
    { id: 2, text: 'Hi! How are you?', sender: 'other', time: '10:26 AM', timestamp: '2024-01-15T10:26:00Z' },
    { id: 3, text: 'I am doing great, thanks for asking!', sender: 'user', time: '10:27 AM', timestamp: '2024-01-15T10:27:00Z' },
    { id: 4, text: 'Hey, how are you doing?', sender: 'other', time: '10:30 AM', timestamp: '2024-01-15T10:30:00Z' }
  ],
  2: [
    { id: 1, text: 'Hi Sarah!', sender: 'user', time: '9:10 AM', timestamp: '2024-01-15T09:10:00Z' },
    { id: 2, text: 'Hello! I need some help with the project', sender: 'other', time: '9:12 AM', timestamp: '2024-01-15T09:12:00Z' },
    { id: 3, text: 'Sure, what do you need help with?', sender: 'user', time: '9:13 AM', timestamp: '2024-01-15T09:13:00Z' },
    { id: 4, text: 'Thanks for the help yesterday!', sender: 'other', time: '9:15 AM', timestamp: '2024-01-15T09:15:00Z' }
  ],
  3: [
    { id: 1, text: 'Hey Mike!', sender: 'user', time: 'Yesterday', timestamp: '2024-01-14T16:30:00Z' },
    { id: 2, text: 'Hi! Are you free tomorrow?', sender: 'other', time: 'Yesterday', timestamp: '2024-01-14T16:32:00Z' },
    { id: 3, text: 'Yes, I should be available', sender: 'user', time: 'Yesterday', timestamp: '2024-01-14T16:35:00Z' },
    { id: 4, text: 'Can we meet tomorrow?', sender: 'other', time: 'Yesterday', timestamp: '2024-01-14T16:45:00Z' }
  ],
  4: [
    { id: 1, text: 'Hi Emily!', sender: 'user', time: 'Yesterday', timestamp: '2024-01-14T14:10:00Z' },
    { id: 2, text: 'Hello! I reviewed your project', sender: 'other', time: 'Yesterday', timestamp: '2024-01-14T14:15:00Z' },
    { id: 3, text: 'What do you think?', sender: 'user', time: 'Yesterday', timestamp: '2024-01-14T14:18:00Z' },
    { id: 4, text: 'The project looks great!', sender: 'other', time: 'Yesterday', timestamp: '2024-01-14T14:20:00Z' }
  ],
  5: [
    { id: 1, text: 'Hey Alex!', sender: 'user', time: 'Monday', timestamp: '2024-01-13T11:25:00Z' },
    { id: 2, text: 'Hi! When are you free this week?', sender: 'other', time: 'Monday', timestamp: '2024-01-13T11:28:00Z' },
    { id: 3, text: 'I should be free on Wednesday', sender: 'user', time: 'Monday', timestamp: '2024-01-13T11:30:00Z' },
    { id: 4, text: 'Let me know when you are free', sender: 'other', time: 'Monday', timestamp: '2024-01-13T11:30:00Z' }
  ]
};

// Mock user profile
const mockUserProfile = {
  id: 'current-user',
  name: 'Your Name',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
  status: 'Online',
  lastSeen: '2024-01-15T10:30:00Z'
};

// Mock API functions
export const mockApi = {
  // Get list of chats
  async listChats() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      data: mockChats,
      message: 'Chats retrieved successfully'
    };
  },

  // Get messages for a specific chat
  async getMessages(chatId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      success: true,
      data: mockMessages[chatId] || [],
      message: 'Messages retrieved successfully'
    };
  },

  // Send a message
  async sendMessage(chatId, messageText) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString()
    };

    return {
      success: true,
      data: newMessage,
      message: 'Message sent successfully'
    };
  },

  // Get user profile
  async getUserProfile() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      success: true,
      data: mockUserProfile,
      message: 'Profile retrieved successfully'
    };
  },

  // Update user profile
  async updateUserProfile(profileData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: { ...mockUserProfile, ...profileData },
      message: 'Profile updated successfully'
    };
  },

  // Mark messages as read
  async markMessagesAsRead(chatId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      success: true,
      data: { chatId, unreadCount: 0 },
      message: 'Messages marked as read'
    };
  },

  // Search chats
  async searchChats(query) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const filteredChats = mockChats.filter(chat => 
      chat.name.toLowerCase().includes(query.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
    return {
      success: true,
      data: filteredChats,
      message: 'Search completed successfully'
    };
  },

  // Get online status
  async getOnlineStatus(userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    const user = mockChats.find(chat => chat.id === userId);
    return {
      success: true,
      data: { userId, isOnline: user?.isOnline || false },
      message: 'Status retrieved successfully'
    };
  }
};

// Export individual functions for easier use
export const {
  listChats,
  getMessages,
  sendMessage,
  getUserProfile,
  updateUserProfile,
  markMessagesAsRead,
  searchChats,
  getOnlineStatus
} = mockApi;
