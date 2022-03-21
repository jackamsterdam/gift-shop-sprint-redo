class Config {

}

class DevelopmentConfig extends Config {
    // productsUrl = "http://localhost:3001/api/products/";
    targetsUrl = 'http://localhost:3001/api/targets/'
    giftByTargetIdUrl = 'http://localhost:3001/api/gifts-by-targetId/'
    giftsUrl = 'http://localhost:3001/api/gifts/'
}

class ProductionConfig extends Config {
    targetsUrl = 'http://localhost:3001/api/targets/'
    giftByTargetIdUrl = 'http://localhost:3001/api/gifts-by-targetId/'
    giftsUrl = 'http://localhost:3001/api/gifts/'
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()

export default config