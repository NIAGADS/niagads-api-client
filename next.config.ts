import type { NextConfig } from "next";


const nextConfig: NextConfig = {

        /*async rewrites() {
            return [
                {
                    source: '/service/**',
                    destination: 'https://www.niagads.org/genomics',
                    changeOrigin: true,
                    secure: false
                },
                {
                    source: "/files/**",
                    target: "https://www.niagads.org/genomics",
                    changeOrigin: true,
                    secure: false,
                },
            ]
        }*/
    
};

export default nextConfig;
