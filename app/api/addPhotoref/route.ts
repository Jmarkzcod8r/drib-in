export default async function handler (req, res) {
    if (req) {
        return res.json(
            { message: 'User has been created' },
            {
              status: 201,
            }
          )

    }



}