import { Drawer, DrawerContent, DrawerOverlay, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { MessagesSidebar } from "./messages-sidebar";

interface BlankChatProps {
  onTopicSelect: (id: string) => void;
  resetChat: () => void;
}

function BlankChat({ onTopicSelect, resetChat }: BlankChatProps) {
  return (
    <div className="flex-1 flex flex-col h-full justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h5 className="text-lg font-medium">
          Please select a topic to start chatting
        </h5>
        {/* Mobile drawer trigger - only visible on mobile */}
        <div className="md:hidden">
          <Drawer direction="bottom">
            <DrawerTrigger asChild>
              <button
                type="button"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Select a Topic
              </button>
            </DrawerTrigger>
            <DrawerOverlay />
            <DrawerContent className="h-full w-full p-0">
              <DrawerTitle />
              <MessagesSidebar
                resetChat={resetChat}
                selectedTopicId={null}
                onTopicSelect={onTopicSelect}
              />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default BlankChat;