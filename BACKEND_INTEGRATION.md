# Backend Integration Guide

This chat application is designed to be easily integrated with your backend API. The current implementation uses mock data and API functions that you can replace with real API calls.

## File Structure

```
src/
├── data/
│   └── mockApi.js          # Mock API functions (replace with real API calls)
├── hooks/
│   └── useChat.js          # Custom hook for chat state management
├── components/
│   ├── ChatList.js         # Chat list component
│   ├── ChatWindow.js       # Chat window component
│   └── Avatar.js           # Avatar component
└── App.js                  # Main application component
```

## API Functions to Replace

### 1. Chat Management

Replace these functions in `src/data/mockApi.js`:

```javascript
// Get list of chats
async listChats() {
  // Replace with: return await fetch('/api/chats').then(res => res.json());
}

// Get messages for a specific chat
async getMessages(chatId) {
  // Replace with: return await fetch(`/api/chats/${chatId}/messages`).then(res => res.json());
}

// Send a message
async sendMessage(chatId, messageText) {
  // Replace with: return await fetch(`/api/chats/${chatId}/messages`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ text: messageText })
  // }).then(res => res.json());
}
```

### 2. User Management

```javascript
// Get user profile
async getUserProfile() {
  // Replace with: return await fetch('/api/user/profile').then(res => res.json());
}

// Update user profile
async updateUserProfile(profileData) {
  // Replace with: return await fetch('/api/user/profile', {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(profileData)
  // }).then(res => res.json());
}
```

### 3. Additional Features

```javascript
// Mark messages as read
async markMessagesAsRead(chatId) {
  // Replace with: return await fetch(`/api/chats/${chatId}/read`, { method: 'POST' }).then(res => res.json());
}

// Search chats
async searchChats(query) {
  // Replace with: return await fetch(`/api/chats/search?q=${query}`).then(res => res.json());
}

// Get online status
async getOnlineStatus(userId) {
  // Replace with: return await fetch(`/api/users/${userId}/status`).then(res => res.json());
}
```

## Expected API Response Format

### Chat List Response
```javascript
{
  success: true,
  data: [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
      lastMessage: "Hey, how are you?",
      lastMessageTime: "10:30 AM",
      unreadCount: 2,
      isOnline: true,
      lastSeen: "2024-01-15T10:30:00Z"
    }
  ],
  message: "Chats retrieved successfully"
}
```

### Messages Response
```javascript
{
  success: true,
  data: [
    {
      id: 1,
      text: "Hello!",
      sender: "user", // or "other"
      time: "10:30 AM",
      timestamp: "2024-01-15T10:30:00Z"
    }
  ],
  message: "Messages retrieved successfully"
}
```

### Send Message Response
```javascript
{
  success: true,
  data: {
    id: 123,
    text: "Hello!",
    sender: "user",
    time: "10:30 AM",
    timestamp: "2024-01-15T10:30:00Z"
  },
  message: "Message sent successfully"
}
```

## Integration Steps

1. **Replace Mock API**: Update `src/data/mockApi.js` with your real API calls
2. **Update Base URL**: Add your API base URL configuration
3. **Add Authentication**: Include authentication headers/tokens in API calls
4. **Handle Errors**: Implement proper error handling for network issues
5. **Real-time Updates**: Integrate WebSocket or Server-Sent Events for real-time messaging

## Example Integration

```javascript
// src/config/api.js
export const API_BASE_URL = 'https://your-api.com/api';

// src/data/api.js (replace mockApi.js)
import { API_BASE_URL } from '../config/api';

export const api = {
  async listChats() {
    const response = await fetch(`${API_BASE_URL}/chats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }
    
    return await response.json();
  },
  
  // ... other API functions
};
```

## Real-time Messaging

For real-time messaging, consider integrating:

1. **WebSocket**: For bidirectional communication
2. **Server-Sent Events**: For receiving new messages
3. **Polling**: Simple but less efficient approach

Example WebSocket integration:

```javascript
// src/hooks/useWebSocket.js
import { useEffect, useRef } from 'react';

export const useWebSocket = (url, onMessage) => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    return () => {
      ws.current?.close();
    };
  }, [url, onMessage]);

  const sendMessage = (message) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};
```

## State Management

The `useChat` hook manages all chat-related state. You can extend it to include:

- Message status (sending, sent, delivered, read)
- Typing indicators
- Message reactions
- File attachments
- Message search

## Testing

The current implementation includes:
- Loading states
- Error handling
- Responsive design
- Professional UI/UX

Test your integration with:
- Network failures
- Slow connections
- Large message lists
- Real-time updates
- Mobile devices

## Deployment

1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Configure your API endpoints
4. Set up WebSocket connections for real-time features

The application is ready for production use once you replace the mock API with your real backend integration!
