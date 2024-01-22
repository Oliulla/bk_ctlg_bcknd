import { Document, ObjectId } from "mongoose"

type Review = {
  user_id: string
  comment: string
}

export type IBook = {
  title: string
  author: string
  genre: string
  publication_date: Date
  reviews?: Review[]
  user_id: string
} & Document

export default IBook

export type IBookFilters = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
  publication_date?: Date
}
