/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        webpackBuildWorker: true,
        },
    images: {
        domains: ['ik.imagekit.io','https://cdn.pixabay.com/photo/2020/04/23/18/41/light-5083606_1280.jpg',
        'https://lh3.googleusercontent.com', 'https://cdn.pixabay.com',"firebasestorage.googleapis.com"],
        },
};

export default nextConfig;
