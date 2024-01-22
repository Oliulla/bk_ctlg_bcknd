import { Document, ObjectId } from "mongoose"

export type Review = {
  user_email: string
  comment: string
}

export type IBook = {
  title: string
  author: string
  genre: string
  publication_date: Date
  reviews?: Review[]
  user_email: string
} & Document

export default IBook

export type IBookFilters = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
  publication_date?: Date
}
