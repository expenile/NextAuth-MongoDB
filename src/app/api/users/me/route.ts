import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataFromToken from '@/helpers/getDataFromToken'

// import {sendEmail} from '@/helpers/mailer'
connect()
export async function POST(request: NextRequest){
    //extract data from token
    const userId = await getDataFromToken(request)
    const user = await User.findById({_id:userId}).select("-password")
    //check if ther i sno user
    return NextResponse.json({message:'User found',success:true,data:user})
}