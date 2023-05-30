import Api from '@/services/Api'

export default{
    addTrip (tripDetails) {
        return Api().post('/addtrip', tripDetails)
    },
    getAllTrips () {
        return Api().get('/gettrips')
    }
}
