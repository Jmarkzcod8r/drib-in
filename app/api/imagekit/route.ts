// import jwt from 'jsonwebtoken';

// // Assuming this code is inside an async function or using Express middleware
// async function generateToken(req: { body: any; }, res: { set: (arg0: { "Access-Control-Allow-Origin": string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { token?: any; error?: string; }): void; new(): any; }; }; }) {
//     try {
//         const payload = req.body;
//         const token = jwt.sign(payload.uploadPayload, "your_private_key", {
//             expiresIn: payload.expire,
//             header: {
//                 alg: "HS256",
//                 typ: "JWT",
//                 kid: payload.publicKey,
//             },
//         });
//         res.set({
//             "Access-Control-Allow-Origin": "*"
//         });
//         res.status(200).send({ token });
//     } catch (error) {
//         console.error("Error generating token:", error);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// }

// // Call the function
// generateToken(req, res);
