
class GiftModel {
  giftId!: number 
  targetId!: number 
  giftName!: string 
  description!: string 
  price!: number 
  discount!: number
// for join all above came from the table of gifts but beow comes join from targets the name that we did AS to targetName in sql query.
  targetName!: string

}

export default GiftModel