import express, { NextFunction, Request, Response } from 'express'
import GiftModel from '../03-models/gift-model'
import logic from '../05-logic/logic'

const router = express.Router()

router.get('/targets', async (request: Request, response: Response, next: NextFunction) => {
  try {
      const targets = await logic.getAllTargets()
      response.json(targets)
  } catch (err: any) {
      next(err)
  }
})

router.get('/gifts-by-targetId/:targetId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const targetId = +request.params.targetId
    const gifts = await logic.getGiftsByTargetId(targetId)
    response.json(gifts)
  } catch(err: any) {
    next(err)
  }
})

router.post('/gifts', async(request: Request, response: Response, next: NextFunction) => {
  try {
    const gift = new GiftModel(request.body)
    const addedGift = await logic.addGift(gift)
    response.status(201).json(addedGift)  //has id now
  } catch (err:any) {
    next(err)
  }
})

router.put('/gifts/:giftId', async(request: Request, response: Response, next: NextFunction) => {
  try {

    const giftId = +request.params.giftId
    request.body.giftId = giftId
    const gift = new GiftModel(request.body)
    const updatedGift = await logic.updateGift(gift)
    response.json(updatedGift)
  } catch (err:any) {
    next(err)
  }
})

// router.patch('/gifts/:giftId', async(request: Request, response: Response, next: NextFunction) => {
//   try {

//    const giftId = +request.params.giftId 
//    request.body.giftId = giftId 
//    const gift = new GiftModel(request.body)
//    const updatedGift = await logic.updatePartialGift(gift)
//    response.json(updatedGift)


//   } catch (err:any) {
//     next(err)
//   }
// })

router.delete('/gifts/:giftId', async(request: Request, response: Response, next: NextFunction) => {
  try {

    const giftId = +request.params.giftId 
    await logic.deleteGift(giftId)
    response.sendStatus(204)
  } catch (err:any) {
    next(err)
  }
})


export default router 