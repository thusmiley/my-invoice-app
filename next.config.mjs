/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/login",
          permanent: true,
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
