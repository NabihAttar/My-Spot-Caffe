const nextConfig = {
  // Turbopack's persistent filesystem cache makes `.next/` balloon to several
  // gigabytes and breaks `next dev` when disk space is tight. Disabled on
  // purpose — re-enable only if you have plenty of free space.
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
