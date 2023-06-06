import Api from '@/services/Api'

export default{
    addJoinedTrip (tripDetails) {
        return Api().post('/addjoinedtrip', tripDetails)
    },
    getAllJoinedTrips (tripDetails) {
        return Api().post('/getjoinedtrips', tripDetails)
    },
    checkIsJoinedTrips (tripDetails) {
        return Api().post('/checkisjoinedtrips',tripDetails)
    }
}
