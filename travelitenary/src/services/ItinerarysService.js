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
    }
}
