
import { hash } from 'bcryptjs';
import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";

// export default async function handler(req, res) {
//     connectMongo().catch(error => res.json({ error: 'Connection failed!'}))
    
//     if(req.method === 'POST') {

//         if(!req.body) return res.status(404).json({error: 'Dont have form data'})
        
//         const { username, email, password } = req.body

        
//         const checkExisting = await Users.findOne({ email })
//         if(checkExisting) return res.status(422).json({ message: 'User already exists'})

       
//         Users.create({username, email, password:await hash(password, 12)}, function(err, data){
//             if(err) return res.status(404).json({ err })
//             res.status(201).json({ status: true, user: data})
//         })
       

//     } else {
//         res.status(500).json({message: 'HTTP method not valid, only POST accepted'})
//     }
// }

export default async function handler(req, res) {
    try {
        await connectMongo();
        if (req.method === 'POST') {
            if (!req.body) {
                return res.status(404).json({ error: 'Dont have form data' });
            }
            const { username, email, password } = req.body;
            const checkExisting = await Users.findOne({ email });
            if (checkExisting) {
                return res.status(422).json({ message: 'User already exists' });
            }
            const newUser = await Users.create({ username, email, password: await hash(password, 12) });
            res.status(201).json({ status: true, user: newUser });
        } else {
            res.status(500).json({ message: 'HTTP method not valid, only POST accepted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
