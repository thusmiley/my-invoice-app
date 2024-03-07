/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACK_END_URL: process.env.BACK_END_URL,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      // Wildcard path matching
      //   {
      //     source: "/blog/:slug",
      //     destination: "/news/:slug",
      //     permanent: true,
      //   },
    ];
  },
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/",
  //         destination: "/login",
  //       },
  //     ];
  //   },
};

export default nextConfig;
