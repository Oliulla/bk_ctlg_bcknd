import { Document } from "mongoose"

export enum Status {
  CURRENTLY_READING = "currently_reading",
  PLAN_TO_READ_SOON = "plan_to_read_soon",
  FINISHED_READING = "finished_reading",
}

export type Review = {
  user_email: string
  comment: string
}

export type ReadingStatus = {
  reader_email: string
  status: Status
}

export type WishlistReader = {
  reader_email: string
}

export type IBook = {
  title: string
  author: string
  genre: string
  publication_date: Date
  reviews: Review[]
  wishlist?: WishlistReader[]
  reading_status?: ReadingStatus[]
} & Document

export default IBook

export type IBookFilters = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
  publication_date?: Date
}
