import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import TargetModel from "../03-models/target-model";
import GiftModel from "../03-models/gift-model";





async function getAllTargets():Promise<TargetModel[]>{
   const sql = `SELECT *
                FROM targets`

  const targets = await dal.execute(sql)
  return targets
}

async function getGiftsByTargetId(targetId: number):Promise<GiftModel[]>{
    //Simple select:
//   const sql = `SELECT *
//                FROM gifts
//                WHERE targetId = ?`
 //Select with sorting: 
//   const sql = `SELECT *
//                FROM gifts
//                WHERE targetId = ? ORDER BY Price, discount`
// אם יש לי שני מחירים אותו דבר אז בינם לבין עצמם ממין לי לפי דיסקאונט

//Select with join and sorting:   //all this means that in front there is name as well!! 

const sql = `SELECT gifts.*, targets.name AS targetName
            FROM gifts
            INNER JOIN targets
            ON gifts.targetId = targets.targetId
            WHERE targets.targetId = ? 
            ORDER BY Price, discount`

// must put gifts.targetId otherwise ambiguos!! 

  const gifts = await dal.execute(sql, [targetId])


  //what about if not found???
  if (gifts.length === 0) throw new ErrorModel(404, `Resource with id ${targetId} not found.`)
  return gifts
}

async function addGift(gift: GiftModel):Promise<GiftModel> {

    //validation 
    const errors = gift.validatePost() 
    if (errors) throw new ErrorModel(400, errors)
    

    //if we put all its enough to put values.
    const sql = `INSERT INTO gifts VALUES
                 (DEFAULT, ?,?,?,?,?)`

    const info: OkPacket = await dal.execute(sql, [gift.targetId, gift.giftName, gift.description, gift.price, gift.discount])

    gift.giftId = info.insertId

    return gift

}

async function updateGift(gift: GiftModel): Promise<GiftModel> {
    const errors = gift.validatePut()
    if (errors) throw new ErrorModel(400, errors)

    const sql = `UPDATE gifts 
                 SET targetId=?, giftName= ? , description= ?, price=?, discount=?
                 WHERE giftId = ?`

    const info: OkPacket = await dal.execute(sql, [gift.targetId, gift.giftName, gift.description, gift.price, gift.discount, gift.giftId])

    if (info.affectedRows === 0) throw new ErrorModel(404,`Resource with id ${gift.giftId} not found.`)

    return gift

}

// async function updatePartialGift(gift: GiftModel): Promise<GiftModel> {
// //    const errors = gift.validatePatch()
// //    if (errors) throw new ErrorModel(400, errors)
//    //! we dont have this route i am just practicing 
//     const dbGift = await getOneGift(gift.giftId)

//     for (const prop in gift) {
//         if (gift[prop]) {
//             dbGift[prop] = gift[prop]
//         }
//     }

//     const updatedGift = await updateGift(new GiftModel(dbGift))
//     return updatedGift








// } 

                                                     //void not null
async function deleteGift(giftId: number): Promise<void> {
    const sql = `DELETE FROM gifts 
                 WHERE giftId = ?`

      const info: OkPacket =  await dal.execute(sql, [giftId])
      if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${giftId} not found.`)
}

export default {
    getAllTargets,
    getGiftsByTargetId,
    addGift,
    updateGift,
    // updatePartialGift,
    deleteGift
}