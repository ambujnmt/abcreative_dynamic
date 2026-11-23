import { mediaUrl } from '../../utils/abcreativeApi';

// Local paths ("/assets/...") and full URLs are used as-is.
// Anything else is treated as an admin-panel upload and goes through mediaUrl().
// This lets the same component show dummy content now and admin data later.
export const resolveSrc = (path) => {
    if (!path) return null;
    if (path.startsWith('/') || /^https?:\/\//i.test(path)) return path;
    return mediaUrl(path);
};

// Turns a video URL into something the modal can play:
//   YouTube / Vimeo link -> iframe embed
//   anything else (mp4 upload) -> native <video>
export const getVideoEmbed = (url) => {
    if (!url) return null;

    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
    if (yt) return { type: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0` };

    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeo) return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };

    return { type: 'video', src: url };
};

// True when the admin typed HTML (e.g. <strong>, <br>) into a description field.
export const hasHtml = (text) => /<[a-z][\s\S]*>/i.test(text || '');
