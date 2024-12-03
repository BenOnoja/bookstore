import React, { createContext, useContext, useState, useEffect } from 'react';

const TelegramUserContext = createContext(null);

export const useTelegramUser = () => useContext(TelegramUserContext);

export const TelegramUserProvider = ({ children }) => {
  const [telegramUser, setTelegramUser] = useState(null);
  const [loading, setLoading] = useState(true);
const API=process.env.REACT_APP_API_URL;
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const user = tg.initDataUnsafe?.user || null;
    if (user) {
      setTelegramUser(user);
      const storeTelegramUser = async () => {
        try {
          const response = await fetch(`${API}/api/store-telegram-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              telegram_user_id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
              role: 'Buyer',
              profile_picture_url: user.photo_url || '',
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to store Telegram user');
          }
        } catch (error) {
          console.error('Error storing Telegram user:', error);
        } finally {
          setLoading(false);
        }
      };
      storeTelegramUser();
    } else {
      console.error('No Telegram user data found');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TelegramUserContext.Provider value={telegramUser}>
      {children}
    </TelegramUserContext.Provider>
  );
};