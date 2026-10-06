export type LunaIntent =
  | "greeting"
  | "booking"
  | "recommend"
  | "services"
  | "prices"
  | "hours_location"
  | "human"
  | "fallback";

export type LunaAction =
  | { type: "open_booking"; serviceSlug?: string }
  | { type: "open_whatsapp"; message?: string }
  | { type: "scroll_to"; target: string }
  | { type: "start_quiz" };

export type LunaReply = {
  intent: LunaIntent;
  reply: string;
  suggestions?: string[];
  action?: LunaAction;
  serviceSlug?: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
