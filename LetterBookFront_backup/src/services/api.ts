import axios from "axios";
import type { User } from "@/lib/types";

export const api = axios.create({
  baseURL: "/api/v1/*", // This can be a placeholder
});

// This is a mock implementation.
// In a real application, this would make a network request to your backend.
export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string; user: User }> => {
  console.log("Logging in with", email, password);

  // Mock a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dummy validation
  if (email === "demo@example.com" && password === "password") {
    const user: User = {
      id: "1",
      name: "Demo User",
      username: "demouser",
      email: "demo@example.com",
      avatarUrl: "https://picsum.photos/seed/user1/100/100",
    };
    return { token: "fake-jwt-token", user };
  }

  // In a real app, you would check credentials against a database.
  // We'll throw an error for any other credentials.
  throw new Error("Invalid email or password");
};

// This is a mock implementation.
// In a real application, this would make a network request to create a new user.
export const registerUser = async (
  name: string,
  username: string,
  email: string,
  password: string,
): Promise<User> => {
  console.log("Registering user", name, username, email, password);

  // Mock a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For this mock, we'll just return a new user object.
  // In a real app, you'd save this to a database and handle potential errors (e.g., username taken).
  const newUser: User = {
    id: String(Math.random()),
    name,
    username,
    email,
    avatarUrl: `https://picsum.photos/seed/${username}/100/100`,
  };

  return newUser;
};
