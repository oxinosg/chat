import { GetRoomHandler, GetRoomQuery } from './get-room.query'
import {
  GetUserAndRoomMetaHandler,
  GetUserAndRoomMetaQuery,
} from './get-user-room-meta.query'
import {
  GetUsersConnectionsHandler,
  GetUsersConnectionsQuery,
} from './get-user-connections.query'

export { GetRoomQuery, GetUserAndRoomMetaQuery, GetUsersConnectionsQuery }

export const QueryHandlers = [
  GetRoomHandler,
  GetUserAndRoomMetaHandler,
  GetUsersConnectionsHandler,
]
