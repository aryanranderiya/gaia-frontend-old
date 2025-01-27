import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import axios from "axios";
import { apiauth } from "@/utils/apiaxios";
import { Link } from "react-router-dom";

export default function Search() {
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await apiauth.get("/search/messages", {
        params: { query: searchQuery },
      });
      console.log(response);

      setFetchedMessages(response.data.messages); // Assuming the response contains messages in 'messages'
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <>
      <Input
        placeholder="Enter a message to search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>

      <div>
        {fetchedMessages.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {fetchedMessages.map((message, index) => (
              <>
                {console.log(message.message.message_id)}
                <Link
                  //   to={{
                  //     pathname: `/try/chat/${message.conversation_id}`,
                  //     // state: { messageId: message.message.message_id }, // Correctly passing the state here
                  //     state: { messageId: "test_message_id" },
                  //   }}
                  to={`/try/chat/${message.conversation_id}`}
                  state={{ messageId: message.message.message_id }}
                  className="bg-white/20 p-3 rounded-lg"
                >
                  {message.message.response || message.response}
                </Link>
              </>
            ))}
          </div>
        ) : (
          <p>No messages found</p>
        )}
      </div>
    </>
  );
}
