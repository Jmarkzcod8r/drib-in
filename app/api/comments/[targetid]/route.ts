import dbConnect from '@/lib/dbConnect';
import CommentModel from '@/lib/models/CommentModels';

export async function GET(req, { params }) {
    const { targetid } = params; // Extract targetid from params
    console.log(`Received targetid: ${targetid}`); // Log targetid

    try {
        await dbConnect();
        const comments = await CommentModel.find({ targetid: targetid });

        return new Response(JSON.stringify({ success: true, comments }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req, { params }) {
    const { targetid } = params; // Extract targetid from params
    console.log(`Received targetid for POST: ${targetid}`); // Log targetid

    try {
        await dbConnect();
        const { comment, rating, user, pics } = await req.json();
        const newComment = new CommentModel({ comment, rating, user, target: targetid, pics });
        await newComment.save();

        return new Response(JSON.stringify({ success: true, comment: newComment }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error saving comment:', error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
