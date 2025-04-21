import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "./ui/input";

function InputCard({
  placeholder_text,
  input_name,
  input_value,
  handle_change,
  hover_text,
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Input
          placeholder={placeholder_text}
          type="number"
          name={input_name}
          value={input_value}
          onChange={handle_change}
        />
      </HoverCardTrigger>
      <HoverCardContent>{hover_text}</HoverCardContent>
    </HoverCard>
  );
}

export default InputCard;
