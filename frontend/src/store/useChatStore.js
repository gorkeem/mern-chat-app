import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    favoriteUsers: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    favoriteToogle: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    toggleButton: () => {
        const { selectedUser, favoriteUsers } = get();
        try {
            const check = favoriteUsers.some(
                (user) => user._id === selectedUser._id
            );
            set({ favoriteToogle: check });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    favoriteUser: async () => {
        const { selectedUser, favoriteUsers, getFavorites } = get();

        const check = favoriteUsers.some(
            (user) => user._id === selectedUser._id
        );

        if (!selectedUser) {
            toast.error("No user selected for adding to favorites");
            return;
        }
        if (check) {
            toast.error("User is already in favorites");
            return;
        }
        try {
            await axiosInstance.put(`/messages/favorite/${selectedUser._id}`);
            toast.success("User added favorites successfully");
            getFavorites();
            set({ favoriteToogle: true });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    unfavoriteUser: async () => {
        const { selectedUser, favoriteUsers, getFavorites } = get();

        const check = favoriteUsers.some(
            (user) => user._id === selectedUser._id
        );

        if (!selectedUser) {
            toast.error("No user selected for removing from favorites");
            return;
        }
        if (!check) {
            toast.error("User is already not in the favorites");
            return;
        }

        try {
            await axiosInstance.put(`/messages/unfavorite/${selectedUser._id}`);
            toast.success("User removed from favorites successfully");
            getFavorites();
            // set({ favoriteToogle: false });
        } catch (error) {}
    },

    getFavorites: async (userId) => {
        const { toggleButton } = get();
        try {
            const res = await axiosInstance.get(
                `/messages/get-favorites/${userId}`
            );
            set({ favoriteUsers: res.data });
            toggleButton();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                messageData
            );
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    deleteMessages: async () => {
        const { selectedUser } = get();

        if (!selectedUser) {
            toast.error("No user selected for deleting messages.");
            return;
        }
        try {
            await axiosInstance.delete(`/messages/delete/${selectedUser._id}`);
            toast.success("Chat deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    },

    subscribeToMessages: () => {
        const { selectedUser, messages } = get();

        if (!selectedUser) {
            return;
        }

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser =
                newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
}));
