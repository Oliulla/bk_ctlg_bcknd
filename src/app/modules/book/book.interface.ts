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
