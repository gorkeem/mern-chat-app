import { X, Trash2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    // const handleDeleteMessages = async () => {
    //     try {
    //         deleteMessages();
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }
    // };

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
