import React, { useState, useCallback, useEffect } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";

type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: any;
};

interface IButtonProps {
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = React.memo(({ onClick }) => (
  <button type="button" onClick={onClick}>
    get random user
  </button>
));

interface IUserInfoProps {
  user: User;
}

const UserInfo: React.FC<IUserInfoProps> = React.memo(({ user }) => (
  <table>
    <thead>
      <tr>
        <th>Username</th>
        <th>Phone number</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{user.username}</td>
        <td>{user.phone}</td>
      </tr>
    </tbody>
  </table>
));

function useThrottle(callback: () => void, delay: number) {
  const [timeoutId, setTimeoutId] = useState<number| null>(null);

  return useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(callback, delay) as unknown as number;
    setTimeoutId(newTimeoutId);
  }, [callback, delay, timeoutId]);
}

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [usersCache, setUsersCache] = useState<Record<number, User>>({});

  useEffect(() => {
    if (!user) return;
    setUsersCache((prev) => ({ ...prev, [user.id]: user }));
  }, [user]);

  const receiveRandomUser = useThrottle(async () => {
    const id = Math.floor(Math.random() * (10 - 1)) + 1;
    if (usersCache[id]) {
      setUser(usersCache[id]);
      return;
    }
    const response = await fetch(`${URL}/${id}`);
    const _user = (await response.json()) as User;
    setUser(_user);
  }, 1000);

  return (
    <div>
      <header>Get a random user</header>
      <Button onClick={receiveRandomUser} />
      {user && <UserInfo user={user} />}
    </div>
  );
}

export default App;