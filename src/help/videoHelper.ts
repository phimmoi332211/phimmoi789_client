/**
 * Helper functions for video URL processing
 */

interface VideoData {
  vid: string;
  url: string;
  pic: string;
  resumeKey: string;
}

/**
 * Parse embed URL to extract video data
 * @param embedUrl - The embed URL containing video data
 * @returns Promise<VideoData | null> - Parsed video data or null if failed
 */
export const parseVideoEmbedUrl = async (embedUrl: string): Promise<VideoData | null> => {
  try {
    // Sử dụng API route để tránh lỗi CORS
    const response = await fetch(`/api/video-embed?url=${encodeURIComponent(embedUrl)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch embed URL: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return {
      vid: data.vid,
      url: data.url,
      pic: data.pic,
      resumeKey: data.resumeKey
    };
  } catch (error) {
    console.error('Error parsing video embed URL:', error);
    return null;
  }
};

/**
 * Get complete m3u8 URL from embed URL
 * @param embedUrl - The embed URL
 * @param domain - The domain to prepend to the m3u8 path
 * @returns Promise<string | null> - Complete m3u8 URL or null if failed
 */
export const getM3u8Url = async (embedUrl: string, domain: string = ''): Promise<string | null> => {
  try {
    if (domain === '') {
      return null;
    }
    const videoData = await parseVideoEmbedUrl(embedUrl);

    if (!videoData) {
      return null;
    }

    // Remove leading slash if present and combine with domain
    const m3u8Path = videoData.url.startsWith('/') ? videoData.url.slice(1) : videoData.url;
    const completeUrl = `${domain}/${m3u8Path}`;

    return completeUrl;
  } catch (error) {
    console.error('Error getting m3u8 URL:', error);
    return null;
  }
};

/**
 * Get video thumbnail URL from embed URL
 * @param embedUrl - The embed URL
 * @param domain - The domain to prepend to the thumbnail path
 * @returns Promise<string | null> - Complete thumbnail URL or null if failed
 */
export const getVideoThumbnailUrl = async (embedUrl: string, domain: string = ''): Promise<string | null> => {
  try {
    if (domain === '') {
      return null;
    }
    const videoData = await parseVideoEmbedUrl(embedUrl);

    if (!videoData) {
      return null;
    }

    // Remove leading slash if present and combine with domain
    const thumbnailPath = videoData.pic.startsWith('/') ? videoData.pic.slice(1) : videoData.pic;
    const completeUrl = `${domain}/${thumbnailPath}`;

    return completeUrl;
  } catch (error) {
    console.error('Error getting video thumbnail URL:', error);
    return null;
  }
};

/**
 * Get all video data from embed URL
 * @param embedUrl - The embed URL
 * @param domain - The domain to prepend to URLs
 * @returns Promise<VideoData & { m3u8Url: string; thumbnailUrl: string } | null>
 */
export const getCompleteVideoData = async (
  embedUrl: string,
  domain: string = ''
): Promise<(VideoData & { m3u8Url: string; thumbnailUrl: string }) | null> => {
  try {
    if (domain === '') {
      return null;
    }
    const videoData = await parseVideoEmbedUrl(embedUrl);

    if (!videoData) {
      return null;
    }

    const m3u8Path = videoData.url.startsWith('/') ? videoData.url.slice(1) : videoData.url;
    const thumbnailPath = videoData.pic.startsWith('/') ? videoData.pic.slice(1) : videoData.pic;

    return {
      ...videoData,
      m3u8Url: `${domain}/${m3u8Path}`,
      thumbnailUrl: `${domain}/${thumbnailPath}`
    };
  } catch (error) {
    console.error('Error getting complete video data:', error);
    return null;
  }
};

/**
 * Convert percent (0-100) to seconds based on duration
 */
export const percentToSeconds = (percent: number, duration: number): number => {
  if (percent <= 0 || duration <= 0) return 0;
  return (duration * percent) / 100;
}; 