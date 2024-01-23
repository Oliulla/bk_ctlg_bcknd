import { Document } from "mongoose"

export enum Status {
  CURRENTLY_READING = "Currentlyre Rading",
  PLAN_TO_READ_SOON = "Plan To Read Soon",
  FINISHED_READING = "Finished Reading",
}

export type Review = {
  user_email: string
  comment: string
}

export type ReadingStatus = {
  reader_email: string
  status:
    | Status.CURRENTLY_READING
    | Status.PLAN_TO_READ_SOON
    | Status.FINISHED_READING
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
