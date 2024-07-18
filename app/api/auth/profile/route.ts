// import { auth } from '@/lib/auth'
// import dbConnect from '@/lib/dbConnect'
// import UserModel from '@/lib/models/UserModel'
// import bcrypt from 'bcryptjs'

// export const PUT = auth(async (req) => {
//   if (!req.auth) {
//     return Response.json({ message: 'Not authenticated' }, { status: 401 })
//   }
//   const { user } = req.auth
//   const { name, email, password } = await req.json()
//   await dbConnect()
//   try {
//     const dbUser = await UserModel.findById(user._id)
//     if (!dbUser) {
//       console.log('user mising')
//       return Response.json(
//         { message: 'User not found' },
//         {
//           status: 404,
//         }
//       )
//     }
//     dbUser.name = name
//     dbUser.email = email
//     dbUser.password = password
//       ? await bcrypt.hash(password, 5)
//       : dbUser.password
//     await dbUser.save()
//     return Response.json({ message: 'User has been updated' })
//   } catch (err: any) {
//     return Response.json(
//       { message: err.message },
//       {
//         status: 500,
//       }
//     )
//   }
// }) as any

// import { auth } from '@/lib/auth';
// import dbConnect from '@/lib/dbConnect';
// import UserModel from '@/lib/models/UserModel';
// import bcrypt from 'bcryptjs';

// export const PUT = auth(async (req) => {
//   if (!req.auth) {
//     return Response.json({ message: 'Not authenticated' }, { status: 401 });
//   }

//   const { user } = req.auth;
//   const { name, email, password } = await req.json();

//   await dbConnect();

//   try {
//     const dbUser = await UserModel.findById(user._id);
//     if (!dbUser) {
//       console.log('user missing');
//       return Response.json(
//         { message: 'User not found' },
//         {
//           status: 404,
//         }
//       );
//     }

//     dbUser.name = name;
//     dbUser.email = email;
//     dbUser.password = password
//       ? await bcrypt.hash(password, 5)
//       : dbUser.password;
//     await dbUser.save();

//     return Response.json({ message: 'User has been updated' });
//   } catch (err: any) {
//     return Response.json(
//       { message: err.message },
//       {
//         status: 500,
//       }
//     );
//   }
// }) as any;


import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  const { name, email, password } = await req.json();

  await dbConnect();

  try {
    const dbUser = await UserModel.findById(user._id);
    if (!dbUser) {
      console.log('user missing');
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      );
    }

    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password;
    await dbUser.save();

    return Response.json({ message: 'User has been updated' });
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;

export const DELETE = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  const { password } = await req.json();

  if (!password) {
    return Response.json({ message: 'Password is required' }, { status: 400 });
  }

  await dbConnect();

  try {
    const dbUser = await UserModel.findById(user._id);
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordCorrect) {
      return Response.json(
        { message: 'Incorrect password' },
        { status: 401 }
      );
    }

    await dbUser.deleteOne();

    return Response.json({ message: 'User has been deleted' });
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
}) as any;