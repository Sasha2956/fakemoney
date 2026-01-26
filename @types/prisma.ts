import { Card, Store, Transaction, User } from "@prisma/client"

export interface CardWithRelations extends Card {
    sentTransactions: Transaction[]
    receiveTransactions: Transaction[]
    user: User
}

export interface StoreWithRelations extends Store {
    transactions: Transaction[]
}
