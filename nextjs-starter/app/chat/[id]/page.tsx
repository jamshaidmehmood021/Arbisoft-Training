'use client';
import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { Avatar, Typography, TextField, Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import { io } from 'socket.io-client';
//import { supabase } from '@/app/supabase/supabase';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { AuthContext } from '@/app/context/authContext';
import { sendMessage, fetchMessages, fetchConversation, addNewMessage } from '@/app/redux/slice/messageSlice';
import { selectGigById } from '@/app/redux/slice/gigSlice';
import { User } from '@/app/redux/slice/messageSlice';

interface Gig {
    id: number;
    title: string;
}

interface Conversation {
    id: number;
    gig: Gig;
    buyer: User;
    seller: User;
}

interface Sender {
    $issender: boolean;
}

const ChatPageContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  background-color: #f0f0f5;
  margin-top: 15px;
  border-radius: 10px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #ffffff;
  padding: 16px;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
`;

const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f5;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 16px;
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 16px;
  background-color: #f5f5f5;
`;

const MessageInputArea = styled.div`
  display: flex;
  padding: 12px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

const MessageBubble = styled.div<Sender>`
  max-width: 60%;
  padding: 12px;
  border-radius: 20px;
  margin: ${({ $issender }) => ($issender ? '0 0 10px auto' : '0 auto 10px 0')};
  background-color: ${({ $issender }) => ($issender ? '#228B22' : '#ffffff')};
  color: ${({ $issender }) => ($issender ? 'white' : '#000000')};
  display: flex;
  flex-direction: column;
`;

const Timestamp = styled.span<Sender>`
  font-size: 0.75rem;
  color: ${({ $issender }) => ($issender ? 'white' : '#000000')};
  margin-top: 4px;
`;

const ChatPage = ({ params }: { params: { id: string } }) => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext is not available');
    }

    const { role, userID } = authContext;
    const dispatch = useAppDispatch();
    const { id } = params;

    const gig = useAppSelector((state) => selectGigById(state, Number(id)));
    const { messages, loading, error, conversation } = useAppSelector((state) => state.messages);

    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [receiverId, setReceiverId] = useState<string>('');
    const [showChatPannel, setShowChatPannel] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<any>(null);
    const [firstConversation, setFirstConversation] = useState<boolean>(false);

    const memoizedConversation = useMemo(() => {
        if (id) {
            dispatch(fetchConversation(id));
        }
        return conversation;
    }, [id, dispatch, firstConversation]);

    useEffect(() => {
        if (role === 'Buyer' && conversation.length === 0 && gig) {
            setReceiverId(gig.userId.toString());
            setShowChatPannel(true);
        } else if (role === 'Buyer' && conversation.length > 0) {
            const buyerConversation = conversation.find((conv: Conversation) => conv.buyer.id.toString() === userID?.toString());
            if (buyerConversation) {
                setSelectedConversation(buyerConversation.id);
                setReceiverId(buyerConversation.seller.id.toString());
                setShowChatPannel(true);
            }
        }
    }, [memoizedConversation, gig, role, userID]);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    const handleConversationClick = useCallback((conversation: Conversation) => {
        setSelectedConversation(conversation.id);
        setReceiverId(role === 'Seller' ? conversation.buyer?.id.toString() : conversation.seller?.id.toString());
        setShowChatPannel(true);
        dispatch(fetchMessages(conversation.id.toString()));

        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        newSocket.emit('joinRoom', conversation.id);

        newSocket.on('receiveMessage', (newMessage: any) => {
            dispatch(addNewMessage(newMessage));
        });
    }, [dispatch, role]);
    
    //     useEffect(() => {
    //        if (selectedConversation) {
    //            const channel = supabase
    //                .channel('Messages')
    //                .on(
    //                    'postgres_changes',
    //                    {
    //                        event: 'INSERT',
    //                        schema: 'public',
    //                        table: 'Messages',
    //                        filter: `conversationId=eq.${selectedConversation}`,
    //                    },
    //                    (payload: any) => {
    //                        dispatch(addNewMessage(payload.new));
    //                    }
    //                )
    //                .subscribe();


    //            return () => channel.unsubscribe();
    //        }
    //    }, [selectedConversation, dispatch]);

    const handleSendMessage = useCallback(async () => {
        if (message.trim() && receiverId) {
            const resultAction = await dispatch(sendMessage({ receiverId, content: message, gigId: id, userID }));
            if (sendMessage.fulfilled.match(resultAction)) {
                setMessage('');
                const { isNewConversation } = resultAction.payload;
                if (isNewConversation) {
                    setFirstConversation(true);
                    dispatch(fetchConversation(id));
                }
            }
        }
    }, [dispatch, message, receiverId, id, userID]);



    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const filteredConversations = useMemo(() => {
        return conversation.filter((conv: Conversation) => (role === 'Seller' || conv.buyer?.id?.toString() === userID?.toString()));
    }, [conversation, role, userID]);

    return (
        <ChatPageContainer>
            <Sidebar>
                <Typography variant="h6" gutterBottom>{role === 'Seller' ? 'Conversations' : 'Messages'}</Typography>
                {Array.isArray(filteredConversations) &&
                    filteredConversations.map((conv: Conversation) => (
                        <ConversationItem key={conv.id} onClick={() => handleConversationClick(conv)}>
                            <Avatar src={role === 'Seller' ? conv.buyer?.profilePicture : conv.seller?.profilePicture} />
                            <div style={{ marginLeft: '10px' }}>
                                <Typography variant="subtitle1">{role === 'Seller' ? conv.buyer?.name : conv.seller?.name}</Typography>
                            </div>
                        </ConversationItem>
                    ))}
            </Sidebar>
            {((conversation.length > 0 && showChatPannel) ||
                (role === 'Buyer' && conversation.length === 0 && gig)) && (
                    <ChatContainer>
                        <MessageArea>
                            {loading ? (
                                <p>Loading messages...</p>
                            ) : error && conversation.length > 0 ? (
                                <p>Error: {error}</p>
                            ) : (
                                messages?.map((msg) => (
                                    <MessageBubble
                                        key={msg.id}
                                        $issender={msg.senderId?.toString() === userID?.toString()}
                                    >
                                        {msg.content}
                                        <Timestamp $issender={msg.senderId?.toString() === userID?.toString()}>
                                            {formatTimestamp(msg.createdAt)}
                                        </Timestamp>
                                    </MessageBubble>
                                ))
                            )}
                        </MessageArea>
                        <MessageInputArea>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}>
                                <Send />
                            </Button>
                        </MessageInputArea>
                    </ChatContainer>
                )}
        </ChatPageContainer>
    );
};

export default ChatPage;
