
const useMiddleware = {
    
    

    redirectLogin : (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/login')
        } else {
            next()
        }
    },

    redirectHome : (req, res, next) => {
        if (req.session.user) {
            res.redirect('/')
        } else {
            next()
        }
    },




/// ça marche plus



    

} 

module.exports = useMiddleware;