import Api from '@/services/Api'

export default{
    addItinerary (tripItineraryDetails) {
        return Api().post('/addItinerary', tripItineraryDetails)
    },
    getItinerarys (tripItineraryDetails) {
        return Api().post('/getItinerarys', tripItineraryDetails)
    },
    deleteItinerarys (tripItineraryDetails) {
        return Api().post('/deleteItinerarys', tripItineraryDetails)
    },
    addLocation (locationDetails){
        return Api().post('/addLocation', locationDetails)
    },
    addHotel (hotelDetails){
        return Api().post('/addHotel', hotelDetails)
    },
    getLocation (locationDetails){
        return Api().get('/getlocations', locationDetails)
    },
    getHotels (hotelDetails){
        return Api().get('/getHotels', hotelDetails)
    }
}
