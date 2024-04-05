import {Resend} from 'resend';


export const sendMail = async({email, emailType})=> {
    const resend = new Resend(process.env.API_KEY);
       const response = await resend.emails.send({
        from:'riteshkumar411552@gmail.com',
        to:email,
        subject:emailType === 'VERIFY'?"Registration Confirmation":"Course Enrollment",
        html:emailType === 'VERIFY'?"Congrats, You are successfully registered":"Congrats, You are successfully enrolled in course"
    })

    return response;

    

}