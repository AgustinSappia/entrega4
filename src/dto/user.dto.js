class UserDto{

    quitarPass(user){
        let {password,...rest}= user
        return rest
    }

}

module.exports = new UserDto ()