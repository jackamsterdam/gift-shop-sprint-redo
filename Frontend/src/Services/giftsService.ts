import TargetModel from "../Models/TargetModel"
import axios from 'axios'
import config from "../Utils/Config"
import GiftModel from "../Models/GiftModel"
// we have 3 routes 
class GiftsService {
 
    async getAllTargets():Promise<TargetModel[]> {
       const response =  await axios.get<TargetModel[]>(config.targetsUrl)
       const targets = response.data
       return targets
    }

    async getGiftsByTargetId(targetId: number): Promise<GiftModel[]> {
        const response = await axios.get<GiftModel[]>(config.giftByTargetIdUrl + targetId)
        const gifts = response.data 
        return gifts
    }

    async addGift(gift: GiftModel):Promise<GiftModel> {
        const response = await axios.post<GiftModel>(config.giftsUrl, gift)
        const addedGift = response.data
        return addedGift
    }

    async updateGift(gift: GiftModel): Promise<GiftModel> {
        const response = await axios.put<GiftModel>(config.giftsUrl + gift.giftId, gift)
        const updatedGift = response.data 
        return updatedGift
    }

    async updatePartialGift(gift: GiftModel):Promise<GiftModel> {
        const response = await axios.patch<GiftModel>(config.giftsUrl + gift.giftId, gift) 
        const updatedGift = response.data 
        return updatedGift
    }

    async deleteGift(giftId:number): Promise<void> {
       await axios.delete(config.giftsUrl + giftId)
    }
}



// make an instance object 
const giftsService = new GiftsService()

export default giftsService