import { Document } from "mongoose"

type Review = {
  comment: string
}

export type IBook = {
  title: string
  author: string
  genre: string
  publication_date: Date
  reviews?: Review[]
} & Document

export default IBook

export type IBookFilters = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
  publication_date?: Date
}
