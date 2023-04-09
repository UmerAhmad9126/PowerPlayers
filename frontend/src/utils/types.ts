import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface AllRoutesProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
