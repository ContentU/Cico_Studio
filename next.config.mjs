/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Vecchio URL della pagina Hotel (prima versione) → nuova pagina di servizio
      { source: "/hotel", destination: "/fotografia-hotel", permanent: true },
    ];
  },
};

export default nextConfig;
