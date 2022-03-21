import Joi from "joi"

class GiftModel {
  giftId: number 
  targetId: number 
  giftName: string 
  description: string 
  price: number 
  discount: number 

//   targetsName: string

    constructor(gift: GiftModel) {
        this.giftId = gift.giftId
        this.targetId = gift.targetId
        this.giftName = gift.giftName
        this.description = gift.description
        this.price = gift.price
        this.discount = gift.discount
        // this.targetsName = gift.targetsName
    
    }

    private static postValidationSchema = Joi.object({
        giftId: Joi.forbidden(),
        targetId: Joi.number().required().integer().min(1),
        giftName: Joi.string().required().min(0).max(100),
        description: Joi.string().required().min(0).max(100),
        price: Joi.number().required().min(0).max(1000),
        discount: Joi.number().required().min(0).max(100)
    })
    private static putValidationSchema = Joi.object({
        giftId: Joi.number().required(),
        targetId: Joi.number().required(),
        giftName: Joi.string().required().min(0).max(100),
        description: Joi.string().required().min(0).max(100),
        price: Joi.number().required().min(0).max(1000),
        discount: Joi.number().required().min(0).max(100)
    })

    validatePost():string {
        const result = GiftModel.postValidationSchema.validate(this, {abortEarly: false})
        return result.error?.message
    }
    validatePut():string {
        const result = GiftModel.putValidationSchema.validate(this, {abortEarly: false})
        return result.error?.message
    }


}

export default GiftModel