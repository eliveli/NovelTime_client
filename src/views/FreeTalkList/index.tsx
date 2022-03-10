import React from "react";
import { FreeTalks } from "./FreeTalkList.components";

export default function FreeTalkList() {
  return (
    <FreeTalks>
      {[0, 0, 0].map(() => (
        <FreeTalks.Talk />
      ))}
    </FreeTalks>
  );
}
