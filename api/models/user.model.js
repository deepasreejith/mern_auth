import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACUCAMAAAAu5KLjAAAAYFBMVEX///8AAAD4+Ph0dHTd3d319fWnp6d+fn7n5+e4uLjU1NT7+/vj4+NtbW1PT09GRkYyMjKtra3AwMApKSnv7+8gICCgoKA9PT3KysqHh4dhYWEbGxuSkpJXV1cUFBQNDQ3A0gmoAAACm0lEQVR4nO2aCXKDMAxFMWEnbIEAIdv9b9mkmbY02NhJsWWm/53gjUeWJUuOAwAAAAAAAAAAAAAAAOATN9puI5faYp5tkA15UeRDFmypXUQ0cclGlHFDbcSjKtgTRUXtNMEPnyXvhD6112+SI8+SsWNCbTYm2fMtGast8txOwnIUoNZceT8XWzKW2xKfpzlLxk7Ufg88YWA+2HvUhp9wU9GYkNrwjlfKNEsbjjOQWTIWUDveOMs1z9SOt8JNbskYfWHnqWjSB+dORXNHbelUKpr0FV2rotlSW6rkIxsy0kpicyU33VfRtKCWmy02H+TUjo5SRqLPR7fgrGWWNX1oOmupNx1P0Px+cbTiMNfSC62ls3S8TmzZWdOnO04i1rTo10OclezIRT9EG57lJqL2esatJgdaV/Q90BS/6kb/H/vOSsk7adKGQ951+RC2SUptM0fa3CcZjdWOAIB/QNp4SR9XQVDFfeLZmZSa3Sk8j97L+hyedpZNLd3dUF6mlcelHGJrzjRNDldxvXk92PFs9qGsZQt7akcnymZO8vtEM9q60205Ecnj0hI2bh63ZOeTkbUbsSQof3OMSSRdpX/iMS1FOX941ZKxg3nL7HXLW4AaluRvoMgxvKMi+d0SY/TfS2kYxMfgiKh/35IxYy9npDAVEJObejhfeHt4bMxYKs3V5jAyc3NndqPUKEy8Rm/noh8MZKXoz4d5O079t+jlgoOH9sF1qlCsy7nqbo/+fM0f6L7swzKag15L+aaZGpr30ZT2ZFTQOrtO3ywzp4Q6L9ESSfOB1tSptH+ihs7gjJfT1NkOv9FNitDZZS6UNe/ozJzLWTIGzXVoKi2aqaLvY8EfNouRafz/cBdEnyUAAAAAAAAAAAAAAOB/8AGHtR5o82OuvwAAAABJRU5ErkJggg=='
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:false
    }
    

},{timeStamp:true});

const User = mongoose.model('User',userSchema);

export default User;