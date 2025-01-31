import { X, Trash2, Star } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const ChatHeader = () => {
    const {
        selectedUser,
        setSelectedUser,
        favoriteUser,
        unfavoriteUser,
        getFavorites,
        favoriteToogle,
    } = useChatStore();

    const { onlineUsers, authUser } = useAuthStore();

    useEffect(() => {
        getFavorites(authUser._id);
    }, [selectedUser._id]);

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img
                                src={selectedUser.profilePic || "/avatar.png"}
                                alt={selectedUser.fullName}
                            />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id)
                                ? "Online"
                                : "Offline"}
                        </p>
                    </div>

                    <div>
                        <button
                            className="btn btn-sm gap-2 transition-colors"
                            onClick={
                                favoriteToogle ? unfavoriteUser : favoriteUser
                            }
                        >
                            <Star
                                color="#ffcc00"
                                fill={favoriteToogle ? "#ffcc00" : "none"}
                                className="text-yellow-400"
                            />
                        </button>
                    </div>
                </div>

                {/* Close button */}
                <div className="flex items-center gap-3">
                    <button
                        className="btn btn-sm gap-2 transition-colors"
                        onClick={() => useChatStore.getState().deleteMessages()}
                    >
                        <Trash2 />
                    </button>
                    <button
                        className="btn btn-sm gap-2 transition-colors"
                        onClick={() => setSelectedUser(null)}
                    >
                        <X />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ChatHeader;
