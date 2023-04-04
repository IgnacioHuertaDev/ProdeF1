import { User } from './user'
import { Predictions } from './userPredictions'

export interface UserProfile {
  user: User
  predictions: Predictions[]
}
